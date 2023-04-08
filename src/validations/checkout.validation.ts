import { check } from 'express-validator'

export const checkoutValidation = [
  check('voucher').notEmpty().withMessage('voucher is required'),
  check('nominal').notEmpty().withMessage('nominal is required'),
  check('payment').notEmpty().withMessage('payment is required'),
  check('name').notEmpty().withMessage('name is required'),
  check('accountNumber').notEmpty().withMessage('accountNumber is required')
]
