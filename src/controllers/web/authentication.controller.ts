import { getUserByEmail } from '../../services/user.services'
import { verifyPassword } from '../../utils/hashing'
import validationResult from '../../validations/index.validation'
import logger from '../../utils/logger'

import type { Request, Response, RequestHandler } from 'express'
import type { Session, SessionData } from 'express-session'

export const index = (async (req: Request, res: Response) => {
  const alertMessage = req.flash('alertMessage')
  const alertStatus = req.flash('alertStatus')

  const alert = { alertMessage, alertStatus }

  res.render('authentication/content/login', {
    layout: 'authentication/template',
    alert
  })
}) as RequestHandler

export const login = (async (req: Request, res: Response) => {
  const errors = validationResult(req).array()
  if (errors.length > 0) {
    logger.error(`ERR: bank - create = ${errors}`)
    req.flash('alertMessage', `${errors}`)
    req.flash('alertStatus', 'danger')
    return res.redirect('/')
  }

  const { email, password } = req.body

  try {
    const userData = await getUserByEmail(email)
    if (!userData) {
      req.flash('alertMessage', 'user not found')
      req.flash('alertStatus', 'danger')
      return res.redirect('/')
    }

    if (userData.status !== 'Y') {
      req.flash('alertMessage', 'user not active yet')
      req.flash('alertStatus', 'danger')
      return res.redirect('/')
    }

    if (userData.role !== 'admin') {
      req.flash('alertMessage', 'you are not admin')
      req.flash('alertStatus', 'danger')
      return res.redirect('/')
    }

    if (userData.password) {
      const checkPassword = verifyPassword(password, userData.password)
      if (!checkPassword) {
        req.flash('alertMessage', 'password invalid')
        req.flash('alertStatus', 'danger')
        return res.redirect('/')
      }
    }

    const data = {
      id: userData.id,
      name: userData.name,
      role: userData.role
    }

    const session: Session & Partial<SessionData> = req.session

    session.user = data

    res.redirect('/dashboard')
  } catch (error: any) {
    req.flash('alertMessage', `${error.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/')
  }
}) as RequestHandler

export const logout = ((req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      req.flash('alertMessage', 'cannot logout, please try again')
      req.flash('alertStatus', 'danger')
      res.redirect('/dashboard')
    }
  })

  res.redirect('/')
}) as RequestHandler
