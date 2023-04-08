import logger from '../../utils/logger'
import {
  getVouchers,
  getVoucherById,
  addVoucher,
  updateVoucher,
  deleteVoucher,
  updateVoucherStatus
} from '../../services/voucher.services'
import { getCategories } from '../../services/category.services'
import { getNominals } from '../../services/nominal.services'
import validationResult from '../../validations/index.validation'
import CONFIG from '../../config/env.conf'
import fs from 'fs'
import { saveImage } from '../../utils/imageSaver'

import type { Request, RequestHandler, Response } from 'express'
import type { IVoucher } from '../../types/voucher.types'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')
  const vouchers = await getVouchers()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/vouchers/index', {
    layout: 'web/template',
    title: 'Dashboard - Vouchers',
    page: 'vouchers',
    name: req.session.user?.name,
    alert,
    vouchers
  })
}) as RequestHandler

export const create = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const categories = await getCategories()
  const nominals = await getNominals()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/vouchers/create', {
    layout: 'web/template',
    title: 'Dashboard - Vouchers',
    page: 'vouchers',
    name: req.session.user?.name,
    alert,
    categories,
    nominals
  })
}) as RequestHandler

export const store = (async (req: Request, res: Response) => {
  const errors = validationResult(req.body).array()
  if (errors.length > 0) {
    logger.error(`ERR: vouchers - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/dashboard/vouchers/create')
  }

  const { name, category, nominals } = req.body

  const data: Omit<IVoucher, 'user'> & Record<'user', string> = {
    name,
    category,
    nominals,
    user: req.session.user?.id,
    isFeatured: true
  }

  try {
    if (req.file) {
      const filename = saveImage(
        req.file.path,
        req.file.originalname,
        req.file.filename
      )

      data.thumbnail = filename
    }

    await addVoucher(data)
    req.flash('alertMessage', 'Successfully Create Voucher')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/vouchers')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/vouchers/create')
  }
}) as RequestHandler

export const edit = (async (req: Request, res: Response) => {
  const { id } = req.params

  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const voucher = await getVoucherById(id)
  const categories = await getCategories()
  const nominals = await getNominals()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/vouchers/edit', {
    layout: 'web/template',
    title: 'Dashboard - Vouchers',
    page: 'vouchers',
    name: req.session.user?.name,
    alert,
    voucher,
    categories,
    nominals
  })
}) as RequestHandler

export const update = (async (req: Request, res: Response) => {
  const { id } = req.params

  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: nominal - update = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect(`/dashboard/vouchers/${id}/edit`)
  }

  const { name, category, nominals } = req.body

  const data: IVoucher = {
    name,
    category,
    nominals
  }

  try {
    if (req.file) {
      const filename = saveImage(
        req.file.path,
        req.file.originalname,
        req.file.filename
      )

      const voucher = await getVoucherById(id)
      const currentImage = `${CONFIG.ROOTPATH}/public/uploads/${voucher?.thumbnail}`

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage)
      }
      data.thumbnail = filename
    }

    await updateVoucher(id, data)

    req.flash('alertMessage', 'Successfully Updated Voucher')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/vouchers')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect(`/dashboard/vouchers/${id}/edit`)
  }
}) as RequestHandler

export const remove = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const voucher = await getVoucherById(id)
    const currentImage = `${CONFIG.ROOTPATH}/public/uploads/${voucher?.thumbnail}`

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage)
    }

    await deleteVoucher(id)

    req.flash('alertMessage', 'Successfully Deleted Voucher')
    req.flash('alertStatus', 'success')
    res.json({
      status: 200,
      success: 'success',
      data: { message: 'Successfully Deleted Voucher' }
    })
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/vouchers')
  }
}) as RequestHandler

export const changeStatus = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const voucher = await getVoucherById(id)

    const status = voucher?.status === 'Y' ? 'N' : 'Y'

    await updateVoucherStatus(id, status)

    req.flash('alertMessage', 'Successfully Updated Voucher')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/vouchers')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/vouchers')
  }
}) as RequestHandler
