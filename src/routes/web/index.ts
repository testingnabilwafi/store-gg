import type { Application, Router } from 'express'

import homeRouter from './home.router'
import productRouter from './product.router'
import nominalRouter from './nominal.router'
import voucherRouter from './voucher.router'
import bankRouter from './bank.router'
import paymentRouter from './payment.router'
import transactionRouter from './transaction.router'
import authRouter from './authentication.router'

const _routes: Array<[string, Router]> = [
  ['/', authRouter],
  ['/dashboard', homeRouter],
  ['/dashboard/categories', productRouter],
  ['/dashboard/nominals', nominalRouter],
  ['/dashboard/vouchers', voucherRouter],
  ['/dashboard/banks', bankRouter],
  ['/dashboard/payments', paymentRouter],
  ['/dashboard/transactions', transactionRouter]
]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
