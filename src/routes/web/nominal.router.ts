import { Router } from 'express'
import {
  createNominalsValidation,
  updateNominalsValidation
} from '../../validations/nominals.validation'
import {
  create,
  edit,
  index,
  remove,
  store,
  update
} from '../../controllers/web/nominal.controller'
import { isNotLogin } from '../../middlewares/authentication'

const nominalRouter = Router()

nominalRouter.use(isNotLogin)
nominalRouter.get('/', index)
nominalRouter.get('/create', create)
nominalRouter.post('/', createNominalsValidation, store)
nominalRouter.get('/:id/edit', edit)
nominalRouter.put('/:id', updateNominalsValidation, update)
nominalRouter.delete('/:id', remove)

export default nominalRouter
