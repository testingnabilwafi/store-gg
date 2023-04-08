import { Router } from 'express'
import {
  createBanksValidation,
  updateBanksValidation
} from '../../validations/banks.validation'
import {
  create,
  edit,
  index,
  remove,
  store,
  update
} from '../../controllers/web/bank.controller'
import { isNotLogin } from '../../middlewares/authentication'

const bankRouter = Router()

bankRouter.use(isNotLogin)
bankRouter.get('/', index)
bankRouter.get('/create', create)
bankRouter.post('/', createBanksValidation, store)
bankRouter.get('/:id/edit', edit)
bankRouter.put('/:id', updateBanksValidation, update)
bankRouter.delete('/:id', remove)

export default bankRouter
