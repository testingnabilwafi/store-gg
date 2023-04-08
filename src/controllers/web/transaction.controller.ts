import {
  getTransactions,
  updateTransactionStatus
} from '../../services/transactions.services'

import type { Request, Response, RequestHandler } from 'express'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const transactions = await getTransactions()

  const alert = { alertMessage, alertStatus }

  res.render('web/content/transactions/index', {
    layout: 'web/template',
    title: 'Dashboard - Transaction',
    page: 'transactions',
    name: req.session.user?.name,
    alert,
    transactions
  })
}) as RequestHandler

export const changeStatus = (async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.query

  try {
    await updateTransactionStatus(id, status)

    req.flash('alertMessage', 'Successfully Update Status Transaction')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/transactions')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/transactions')
  }
}) as RequestHandler
