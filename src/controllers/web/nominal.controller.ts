import logger from '../../utils/logger'
import {
  getNominals,
  getNominalsById,
  addNominal,
  updateNominal,
  deleteNominal
} from '../../services/nominal.services'
import validationResult from '../../validations/index.validation'

import type { Request, RequestHandler, Response } from 'express'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')
  const nominals = await getNominals()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/nominals/index', {
    layout: 'web/template',
    title: 'Dashboard - Nominals',
    page: 'nominals',
    name: req.session.user?.name,
    alert,
    nominals
  })
}) as RequestHandler

export const create = ((req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/nominals/create', {
    layout: 'web/template',
    title: 'Dashboard - Nominals',
    page: 'nominals',
    name: req.session.user?.name,
    alert
  })
}) as RequestHandler

export const store = (async (req: Request, res: Response) => {
  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: nominal - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/dashboard/nominals/create')
  }

  try {
    await addNominal(req.body)
    req.flash('alertMessage', 'Successfully Create Nominals')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/nominals')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/nominals/create')
  }
}) as RequestHandler

export const edit = (async (req: Request, res: Response) => {
  const { id } = req.params

  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const nominal = await getNominalsById(id)

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/nominals/update', {
    layout: 'web/template',
    title: 'Dashboard - Nominals',
    page: 'nominals',
    name: req.session.user?.name,
    alert,
    nominal
  })
}) as RequestHandler

export const update = (async (req: Request, res: Response) => {
  const { id } = req.params

  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: nominal - update = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect(`/dashboard/nominals/${id}/edit`)
  }

  try {
    await updateNominal(id, req.body)

    req.flash('alertMessage', 'Successfully Updated Nominal')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/nominals')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect(`/dashboard/nominals/${id}/edit`)
  }
}) as RequestHandler

export const remove = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteNominal(id)

    req.flash('alertMessage', 'Successfully Deleted Nominal')
    req.flash('alertStatus', 'success')
    res.json({
      status: 200,
      success: 'success',
      data: { message: 'Successfully Deleted Nominal' }
    })
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/nominals')
  }
}) as RequestHandler
