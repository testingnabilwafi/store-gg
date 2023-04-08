import logger from '../../utils/logger'
import {
  addPayment,
  deletePayment,
  getPayments,
  getPaymentById,
  updatePayment,
  updatePaymentStatus
} from '../../services/payment.services'
import validationResult from '../../validations/index.validation'
import { getBanks } from '../../services/bank.services'

import type { Request, RequestHandler, Response } from 'express'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')
  const payments = await getPayments()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/payments/index', {
    layout: 'web/template',
    title: 'Dashboard - Payments',
    page: 'payments',
    name: req.session.user?.name,
    alert,
    payments
  })
}) as RequestHandler

export const create = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const alert = {
    alertMessage,
    alertStatus
  }

  const banks = await getBanks()

  res.render('web/content/payments/create', {
    layout: 'web/template',
    title: 'Dashboard - Payments',
    page: 'payments',
    name: req.session.user?.name,
    alert,
    banks
  })
}) as RequestHandler

export const store = (async (req: Request, res: Response) => {
  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: payment - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/dashboard/payments')
  }

  try {
    await addPayment(req.body)
    req.flash('alertMessage', 'Successfully Create Payment')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/payments')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/payments/create')
  }
}) as RequestHandler

export const edit = (async (req: Request, res: Response) => {
  const { id } = req.params

  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const payment = await getPaymentById(id)
  const banks = await getBanks()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/payments/edit', {
    layout: 'web/template',
    title: 'Dashboard - Payments',
    page: 'payments',
    name: req.session.user?.name,
    alert,
    payment,
    banks
  })
}) as RequestHandler

export const update = (async (req: Request, res: Response) => {
  const { id } = req.params

  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: payment - update = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect(`/dashboard/payments/${id}/edit`)
  }

  try {
    await updatePayment(id, req.body)

    req.flash('alertMessage', 'Successfully Updated Bank')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/payments')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect(`/dashboard/payments/${id}/edit`)
  }
}) as RequestHandler

export const remove = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deletePayment(id)

    req.flash('alertMessage', 'Successfully Deleted Payment')
    req.flash('alertStatus', 'success')
    res.json({
      status: 200,
      success: 'success',
      data: { message: 'Successfully Deleted Payment' }
    })
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/payments')
  }
}) as RequestHandler

export const changeStatus = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const payment = await getPaymentById(id)

    const status = payment?.status === 'Y' ? 'N' : 'Y'

    await updatePaymentStatus(id, status)

    req.flash('alertMessage', 'Successfully Updated Payment')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/payments')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/payments')
  }
}) as RequestHandler
