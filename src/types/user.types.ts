import type { ObjectId } from 'mongoose'
import type { ICategory } from './category.types'

export interface IUser {
  _id?: ObjectId
  email?: string
  name?: string
  password?: string
  role?: 'admin' | 'user'
  status?: 'Y' | 'N'
  username?: string
  phoneNumber?: string
  avatar?: string
  favorite?: ICategory
}
