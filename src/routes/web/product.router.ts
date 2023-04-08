import { Router } from 'express'
import {
  createCategoriesValidation,
  updateCategoriesValidation
} from '../../validations/categories.validation'
import {
  create,
  edit,
  index,
  remove,
  store,
  update
} from '../../controllers/web/category.controller'
import { isNotLogin } from '../../middlewares/authentication'

const productRouter = Router()

productRouter.use(isNotLogin)
productRouter.get('/', index)
productRouter.get('/create', create)
productRouter.post('/', createCategoriesValidation, store)
productRouter.get('/:id/edit', edit)
productRouter.put('/:id', updateCategoriesValidation, update)
productRouter.delete('/:id', remove)

export default productRouter
