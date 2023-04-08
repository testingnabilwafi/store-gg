import { check } from 'express-validator'

export const createNominalsValidation = [
  check('coinName')
    .isLength({ min: 3 })
    .withMessage('coinName must be 3 or more')
    .notEmpty()
    .withMessage('coinName is required'),
  check('coinQty')
    .isNumeric()
    .withMessage('coinQty must be number')
    .notEmpty()
    .withMessage('coinQty is required'),
  check('price')
    .isNumeric()
    .withMessage('price must be number')
    .notEmpty()
    .withMessage('price is required')
]

export const updateNominalsValidation = [
  check('coinName')
    .notEmpty()
    .withMessage('coinName is required')
    .isLength({ min: 3 })
    .withMessage('coinName must be 3 or more'),
  check('coinQty')
    .isNumeric()
    .withMessage('coinQty must be number')
    .notEmpty()
    .withMessage('coinQty is required'),
  check('price')
    .isNumeric()
    .withMessage('price must be number')
    .notEmpty()
    .withMessage('price is required')
]
