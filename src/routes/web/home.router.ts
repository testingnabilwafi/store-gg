import { Router } from 'express'
import { index } from '../../controllers/web/home.controller'
import { isNotLogin } from '../../middlewares/authentication'

const homeRouter = Router()

homeRouter.use(isNotLogin)
homeRouter.get('/', index)

export default homeRouter
