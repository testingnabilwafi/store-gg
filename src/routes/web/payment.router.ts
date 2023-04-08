import { Router } from 'express'
import {
  createPaymentsValidation,
  updatePaymentsValidation
} from '../../validations/payments.validation'
import {
  changeStatus,
  create,
  edit,
  index,
  remove,
  store,
  update
} from '../../controllers/web/payment.controller'
import { isNotLogin } from '../../middlewares/authentication'

const paymentRouter = Router()

paymentRouter.use(isNotLogin)
paymentRouter.get('/', index)
paymentRouter.get('/create', create)
paymentRouter.post('/', createPaymentsValidation, store)
paymentRouter.get('/:id/edit', edit)
paymentRouter.put('/:id', updatePaymentsValidation, update)
paymentRouter.delete('/:id', remove)
paymentRouter.put('/:id/update-status', changeStatus)

export default paymentRouter
