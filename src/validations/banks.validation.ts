import { check } from 'express-validator'

export const createBanksValidation = [
  check('name').notEmpty().withMessage('name is required'),
  check('nameBank').notEmpty().withMessage('nameBank is required'),
  check('accountNumber').notEmpty().withMessage('account Number is required')
]

export const updateBanksValidation = [
  check('name').notEmpty().withMessage('name is required'),
  check('nameBank').notEmpty().withMessage('nameBank is required'),
  check('accountNumber').notEmpty().withMessage('account Number is required')
]
