import { Router } from 'express'
import {
  userSignupValidation,
  userSignInValidation,
  editProfileValidation
} from '../../validations/user.validation'
import { checkoutValidation } from '../../validations/checkout.validation'
import {
  checkout,
  history,
  signIn,
  signUp,
  historyDetail,
  dashboard,
  getProfile,
  editProfile
} from '../../controllers/api/authentication.controller'
import { isLoginPlayer } from '../../middlewares/authentication'

const authRouter = Router()

authRouter.post('/sign-up', userSignupValidation, signUp)
authRouter.post('/sign-in', userSignInValidation, signIn)
authRouter.post('/checkout', isLoginPlayer, checkoutValidation, checkout)
authRouter.get('/history', isLoginPlayer, history)
authRouter.get('/history/:id/detail', isLoginPlayer, historyDetail)
authRouter.get('/dashboard', isLoginPlayer, dashboard)
authRouter.get('/profile', isLoginPlayer, getProfile)
authRouter.put('/profile', isLoginPlayer, editProfileValidation, editProfile)

export default authRouter
