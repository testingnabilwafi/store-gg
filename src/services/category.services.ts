import CategoryModel from '../models/Category.model'

import type { ICategory } from '../types/category.types'

export const getCategories = () => {
  const result = CategoryModel.find()

  return result
}

export const getCategoryById = async (_id: string) => {
  const result = await CategoryModel.findOne({ _id })
  return result
}

export const getCategoryByName = async (name: string) => {
  const result = await CategoryModel.findOne({ name })
  return result
}

export const addCategory = async (payload: ICategory) => {
  const result = await CategoryModel.create(payload)
  return result
}

export const updateCategory = async (_id: string, payload: ICategory) => {
  const result = await CategoryModel.findOneAndUpdate(
    { _id },
    { $set: payload }
  )

  return result
}

export const deleteCategory = async (id: string) => {
  const result = await CategoryModel.findByIdAndDelete({ _id: id })

  return result
}
