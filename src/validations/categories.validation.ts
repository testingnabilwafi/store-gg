import { check } from 'express-validator'

export const createCategoriesValidation = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('name must be 3 or more')
    .notEmpty()
    .withMessage('name is required')
]

export const updateCategoriesValidation = [
  check('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be 3 or more')
]
