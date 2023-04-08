import { check } from 'express-validator'
import upload from '../utils/multer'

export const userSignupValidation = [
  upload.single('avatar'),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('use email for login'),
  check('password')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 6 })
    .withMessage('password must be 6 characters or more'),
  check('username').notEmpty().withMessage('username is required'),
  check('name').notEmpty().withMessage('name is required'),
  check('favorite').notEmpty().withMessage('favorite is required')
]

export const userSignInValidation = [
  upload.single('avatar'),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('use email for login'),
  check('password')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 6 })
    .withMessage('password must be 6 characters or more')
]

export const editProfileValidation = [
  upload.single('avatar'),
  check('phoneNumber').isNumeric().withMessage('phoneNumber must number')
]
