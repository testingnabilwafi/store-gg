import { Router } from 'express'
import { isLogin, isNotLogin } from '../../middlewares/authentication'
import {
  index,
  login,
  logout
} from '../../controllers/web/authentication.controller'
import { loginValidation } from '../../validations/login.validation'

const authRouter = Router()

authRouter.get('/', isLogin, index)
authRouter.post('/', isLogin, loginValidation, login)
authRouter.get('/logout', isNotLogin, logout)

export default authRouter
