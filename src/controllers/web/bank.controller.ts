import logger from '../../utils/logger'
import {
  addBank,
  deleteBank,
  getBanks,
  getBankById,
  updateBank
} from '../../services/bank.services'
import validationResult from '../../validations/index.validation'

import type { Request, RequestHandler, Response } from 'express'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')
  const banks = await getBanks()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/banks/index', {
    layout: 'web/template',
    title: 'Dashboard - Banks',
    page: 'banks',
    name: req.session.user?.name,
    alert,
    banks
  })
}) as RequestHandler

export const create = ((req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/banks/create', {
    layout: 'web/template',
    title: 'Dashboard - Banks',
    page: 'banks',
    name: req.session.user?.name,
    alert
  })
}) as RequestHandler

export const store = (async (req: Request, res: Response) => {
  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: bank - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/dashboard/banks/create')
  }

  try {
    await addBank(req.body)
    req.flash('alertMessage', 'Successfully Create Bank')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/banks')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/banks/create')
  }
}) as RequestHandler

export const edit = (async (req: Request, res: Response) => {
  const { id } = req.params

  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const bank = await getBankById(id)

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/banks/edit', {
    layout: 'web/template',
    title: 'Dashboard - Banks',
    page: 'banks',
    name: req.session.user?.name,
    alert,
    bank
  })
}) as RequestHandler

export const update = (async (req: Request, res: Response) => {
  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: bank - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/dashboard/banks/create')
  }

  const { id } = req.params

  try {
    await updateBank(id, req.body)

    req.flash('alertMessage', 'Successfully Updated Bank')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/banks')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/banks/edit')
  }
}) as RequestHandler

export const remove = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteBank(id)

    req.flash('alertMessage', 'Successfully Deleted Bank')
    req.flash('alertStatus', 'success')
    res.json({
      status: 200,
      success: 'success',
      data: { message: 'Successfully Deleted Bank' }
    })
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/banks')
  }
}) as RequestHandler
