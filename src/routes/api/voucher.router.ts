import { Router } from 'express'
import { index, show } from '../../controllers/api/voucher.controller'

const voucherRouter = Router()

voucherRouter.get('/', index)
voucherRouter.get('/:id', show)

export default voucherRouter
