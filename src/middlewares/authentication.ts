import type { NextFunction, Request, Response } from 'express'

export const isNotLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash('alertMessage', 'Session Expired')
    req.flash('alertStatus', 'danger')
    return res.redirect('/')
  }

  next()
}

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user && req.session.user?.role === 'admin') {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

export const isLoginPlayer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user
  if (!user) {
    return res.status(403).json({
      error: 'Not Authorized to access this resource'
    })
  }

  next()
}
