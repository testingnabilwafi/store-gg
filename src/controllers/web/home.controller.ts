import type { Request, Response } from 'express'

export const index = (req: Request, res: Response) => {
  res.render('web/content/index', {
    layout: 'web/template',
    page: 'dashboard',
    title: 'Dashboard - Home',
    name: req.session.user?.name
  })
}
