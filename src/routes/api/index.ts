import type { Application, Router } from 'express'

import voucherRouter from './voucher.router'
import categoryRouter from './category.router'
import authRouter from './authentication.router'

const _routes: Array<[string, Router]> = [
  ['/api/v1/vouchers', voucherRouter],
  ['/api/v1/categories', categoryRouter],
  ['/api/v1/auth', authRouter]
]

const routesAPI = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routesAPI
