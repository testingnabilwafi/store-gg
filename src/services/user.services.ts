import UserModel from '../models/User.model'

import type { IUser } from '../types/user.types'

export const getUsers = () => {
  const result = UserModel.find()

  return result
}

export const getUserById = async (_id: string) => {
  const result = await UserModel.findOne({ _id })

  return result
}

export const getUserByName = async (name: string) => {
  const result = await UserModel.findOne({ name })

  return result
}

export const getUserByEmail = async (email: string) => {
  const result = await UserModel.findOne({ email })

  return result
}

export const addUser = async (payload: IUser) => {
  const result = await UserModel.create(payload)

  return result
}

export const updateUser = async (_id: string, payload: IUser) => {
  const result = await UserModel.findOneAndUpdate(
    { _id },
    { $set: payload },
    { new: true, runValidators: true }
  )

  return result
}

export const deleteUser = async (_id: string) => {
  const result = await UserModel.findOneAndDelete({ _id })

  return result
}

export const updateUserStatus = async (_id: string, status: 'Y' | 'N') => {
  const result = await UserModel.findOneAndUpdate({ _id }, { status })

  return result
}
