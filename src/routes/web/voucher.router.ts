import { Router } from 'express'
import {
  createVouchersValidation,
  updateVouchersValidation
} from '../../validations/vouchers.validation'
import {
  create,
  edit,
  index,
  remove,
  store,
  update,
  changeStatus
} from '../../controllers/web/voucher.controller'
import { isNotLogin } from '../../middlewares/authentication'

const voucherRouter = Router()

voucherRouter.use(isNotLogin)
voucherRouter.get('/', index)
voucherRouter.get('/create', create)
voucherRouter.post('/', createVouchersValidation, store)
voucherRouter.get('/:id/edit', edit)
voucherRouter.put('/:id', updateVouchersValidation, update)
voucherRouter.delete('/:id', remove)
voucherRouter.put('/:id/update-status', changeStatus)

export default voucherRouter
