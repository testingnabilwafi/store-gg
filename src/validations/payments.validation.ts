import { check } from 'express-validator'

export const createPaymentsValidation = [
  check('type').notEmpty().withMessage('type is required'),
  check('banks').notEmpty().withMessage('banks is required')
]

export const updatePaymentsValidation = [
  check('type').notEmpty().withMessage('type is required'),
  check('banks').notEmpty().withMessage('banks is required')
]
