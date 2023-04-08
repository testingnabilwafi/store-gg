import { Router } from 'express'
import { index } from '../../controllers/api/category.controller'

const categoryRouter = Router()

categoryRouter.get('/', index)

export default categoryRouter
