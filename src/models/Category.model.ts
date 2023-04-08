import mongoose from 'mongoose'

import type { ICategory } from '../types/category.types'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category required'],
    unique: [true, 'name already exist!']
  }
})

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema)

export default CategoryModel
