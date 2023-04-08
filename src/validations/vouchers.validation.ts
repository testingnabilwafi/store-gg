import { check } from 'express-validator'
import upload from '../utils/multer'

export const createVouchersValidation = [
  upload.single('thumbnail'),
  check('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be 3 or more'),
  check('thumbnail').notEmpty().withMessage('thumbnail is required'),
  check('category').notEmpty().withMessage('category is required'),
  check('nominals').notEmpty().withMessage('nominals is required')
]

export const updateVouchersValidation = [
  upload.single('thumbnail'),
  check('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be 3 or more'),
  check('category').notEmpty().withMessage('category is required'),
  check('nominals').notEmpty().withMessage('nominals is required')
]
