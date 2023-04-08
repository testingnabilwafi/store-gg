import logger from '../../utils/logger'
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from '../../services/category.services'
import validationResult from '../../validations/index.validation'

import type { Request, RequestHandler, Response } from 'express'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')
  const categories = await getCategories()

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/categories/index', {
    layout: 'web/template',
    title: 'Dashboard - Categories',
    page: 'categories',
    name: req.session.user?.name,
    alert,
    categories
  })
}) as RequestHandler

export const create = ((req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/categories/create', {
    layout: 'web/template',
    title: 'Dashboard - Categories',
    page: 'categories',
    name: req.session.user?.name,
    alert
  })
}) as RequestHandler

export const store = (async (req: Request, res: Response) => {
  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: category - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/dashboard/categories/create')
  }

  try {
    await addCategory(req.body)
    req.flash('alertMessage', 'Successfully Create Category')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/categories')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/categories/create')
  }
}) as RequestHandler

export const edit = (async (req: Request, res: Response) => {
  const { id } = req.params

  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const category = await getCategoryById(id)

  const alert = {
    alertMessage,
    alertStatus
  }

  res.render('web/content/categories/update', {
    layout: 'web/template',
    title: 'Dashboard - Categories',
    page: 'categories',
    name: req.session.user?.name,
    alert,
    category
  })
}) as RequestHandler

export const update = (async (req: Request, res: Response) => {
  const { id } = req.params

  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: category - update = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect(`/dashboard/categories/${id}/edit`)
  }

  try {
    await updateCategory(id, req.body)

    req.flash('alertMessage', 'Successfully Updated Category')
    req.flash('alertStatus', 'success')
    res.redirect('/dashboard/categories')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/categories/edit')
  }
}) as RequestHandler

export const remove = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteCategory(id)

    req.flash('alertMessage', 'Successfully Deleted Category')
    req.flash('alertStatus', 'success')
    res.json({
      status: 200,
      success: 'success',
      data: { message: 'Successfully Deleted Category' }
    })
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/dashboard/categories')
  }
}) as RequestHandler
