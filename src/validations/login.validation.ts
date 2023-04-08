import { check } from 'express-validator'

export const loginValidation = [
  check('email')
    .notEmpty()
    .withMessage('name is required')
    .isEmail()
    .withMessage('use email for login'),
  check('password').notEmpty().withMessage('name is required')
]
