import {
  addUser,
  getUserByEmail,
  updateUser
} from '../../services/user.services'
import logger from '../../utils/logger'
import validationResult from '../../validations/index.validation'
import { hashingPassword, verifyPassword } from '../../utils/hashing'
import { saveImage } from '../../utils/imageSaver'
import { signJWT } from '../../utils/jwt'
import { getVouherByIdPopulateCatAndUser } from '../../services/voucher.services'
import { getNominalsById } from '../../services/nominal.services'
import { getPaymentById } from '../../services/payment.services'
import { getBankById } from '../../services/bank.services'
import {
  addTransaction,
  getTransactionsByCriteria,
  getTotalTransaction,
  getTransactionById,
  getTotalTransactionCategoryByPlayer,
  getTransactionByPlayer
} from '../../services/transactions.services'

import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { IUser } from '../../types/user.types'
import type { ITransaction } from '../../types/transaction.types'
import mongoose from 'mongoose'
import { getCategories } from '../../services/category.services'

export const signUp = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req.body).array()
  if (errors.length > 0) {
    logger.error(`ERR: signup - create = ${errors}`)
    return res.status(403).json({ message: errors })
  }

  const data: IUser = req.body

  try {
    if (req.file) {
      const filename = saveImage(
        req.file.path,
        req.file.originalname,
        req.file.filename
      )

      data.avatar = filename
    }

    if (data.password) {
      data.password = hashingPassword(data.password)
    }

    const user = await addUser(data)

    user.password = undefined

    res.status(201).json({ data: user })
  } catch (error: any) {
    if (error && error.name === 'ValidationError') {
      res
        .status(422)
        .json({ error: 1, message: error.message, field: error.errors })
    }

    next(error)
  }
}) as RequestHandler

export const signIn = (async (req: Request, res: Response) => {
  const errors = validationResult(req.body).array()
  if (errors.length > 0) {
    logger.error(`ERR: signup - create = ${errors}`)
    return res.status(403).json({ message: errors })
  }

  try {
    const user = await getUserByEmail(req.body.email)
    if (!user) {
      return res
        .status(403)
        .json({ message: 'Email yang anda masukan belum terdaftar' })
    }

    if (user.password) {
      const checkPassword = verifyPassword(req.body.password, user.password)
      if (!checkPassword) {
        return res
          .status(403)
          .json({ message: 'Password yang anda masukan salah' })
      }

      user.password = undefined
    }

    const accessToken = signJWT({ ...user })

    res.status(200).json({
      data: { accessToken }
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}) as RequestHandler

export const checkout = (async (req: Request, res: Response) => {
  const errors = validationResult(req.body).array()
  if (errors.length > 0) {
    logger.error(`ERR: signup - create = ${errors}`)
    return res.status(403).json({ message: errors })
  }

  try {
    const { accountUser, name, voucherId, nominalId, paymentId, bankId } =
      req.body

    const voucher = await getVouherByIdPopulateCatAndUser(voucherId)
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher tidak ditemukan!' })
    }

    const nominal = await getNominalsById(nominalId)
    if (!nominal) {
      return res.status(404).json({ message: 'Nominal tidak ditemukan!' })
    }

    const payment = await getPaymentById(paymentId)
    if (!payment) {
      return res.status(404).json({ message: 'Payment tidak ditemukan!' })
    }

    const bank = await getBankById(bankId)
    if (!bank) return res.status(404).json({ message: 'Bank tidak ditemukan!' })

    const tax = (10 / 100) * nominal.price
    const value = nominal.price - tax

    const payload: ITransaction = {
      historyVoucherTopup: {
        name: voucher.name,
        category: voucher.category?.name,
        thumbnail: voucher?.thumbnail,
        coinName: nominal.coinName,
        coinQty: nominal.coinQty,
        price: nominal.price
      },
      historyPayment: {
        name: bank.name,
        type: payment.type,
        nameBank: bank.nameBank,
        accountNumber: bank.accountNumber
      },
      name,
      accountUser,
      tax,
      value,
      player: res.locals.user._doc._id,
      historyUser: {
        name: voucher.user?.name,
        phoneNumber: voucher.user?.phoneNumber
      },
      category: voucher.category?._id,
      user: voucher.user?._id
    }

    await addTransaction(payload)
    res.status(201).json({ data: payload })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}) as RequestHandler

export const history = (async (req: Request, res: Response) => {
  const { status } = req.query

  let criteria = {}

  if (status?.length) {
    criteria = {
      ...criteria,
      status: { $regex: `${String(status)}`, $options: 'i' }
    }
  }
  if (res.locals.user._doc._id) {
    criteria = {
      ...criteria,
      player: new mongoose.Types.ObjectId(res.locals.user._doc._id)
    }
  }

  try {
    const history = await getTransactionsByCriteria(criteria)
    const total = await getTotalTransaction(criteria)

    res.status(200).json({
      data: history,
      total: total.length ? total[0].value : 0
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}) as RequestHandler

export const historyDetail = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const history = await getTransactionById(id)

    if (!history) {
      return res.status(404).json({ message: 'history tidak ditemukan' })
    }

    res.status(200).json({
      data: history
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Intenal Server Error' })
  }
}) as RequestHandler

export const dashboard = (async (req: Request, res: Response) => {
  try {
    const count = await getTotalTransactionCategoryByPlayer(
      res.locals.user._doc._id
    )

    const categories = await getCategories()
    categories.forEach((cat) => {
      count.forEach((data) => {
        if (data._id.toString() === cat._id.toString()) {
          data.name = cat.name
        }
      })
    })

    const history = await getTransactionByPlayer(res.locals.user._doc._id)

    res.status(200).json({ data: history, count })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Intenal Server Error' })
  }
}) as RequestHandler

export const getProfile = (async (req: Request, res: Response) => {
  try {
    const player = {
      id: res.locals.user._doc._id,
      username: res.locals.user._doc.username,
      email: res.locals.user._doc.email,
      name: res.locals.user._doc.name,
      avatar: res.locals.user._doc.avatar,
      phoneNumber: res.locals.user._doc.phoneNumber
    }

    res.status(200).json({ data: player })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Intenal Server Error' })
  }
}) as RequestHandler

export const editProfile = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req.body).array()
  if (errors.length > 0) {
    logger.error(`ERR: signup - create = ${errors}`)
    return res.status(403).json({ message: errors })
  }

  const { name = '', phoneNumber = '' } = req.body

  try {
    const payload: IUser = {}

    if (name.length) payload.name = name

    if (phoneNumber.length) payload.phoneNumber = phoneNumber

    if (req.file) {
      const filename = saveImage(
        req.file.path,
        req.file.originalname,
        req.file.filename
      )

      payload.avatar = filename
    }

    const player = await updateUser(res.locals.user._doc._id, payload)

    const data = {
      id: player?.id,
      name: player?.name,
      phoneNumber: player?.phoneNumber,
      avatar: player?.avatar
    }

    res.status(201).json({ data })
  } catch (error: any) {
    if (error && error.name === 'ValidationError') {
      res
        .status(422)
        .json({ error: 1, message: error.message, field: error.errors })
    }

    next(error)
  }
}) as RequestHandler
