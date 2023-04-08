import { Router } from 'express'
import {
  changeStatus,
  index
} from '../../controllers/web/transaction.controller'
import { isNotLogin } from '../../middlewares/authentication'

const transactionRouter = Router()

transactionRouter.use(isNotLogin)
transactionRouter.get('/', index)
transactionRouter.put('/status/:id', changeStatus)

export default transactionRouter
