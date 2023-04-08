import type { ICategory } from './category.types'
import type { INominal } from './nominal.types'
import type { IUser } from './user.types'
import type { ObjectId } from 'mongoose'

export interface IVoucher {
  _id?: ObjectId
  name: string
  status?: 'Y' | 'N'
  thumbnail?: string
  category: ICategory
  nominals: INominal[]
  user?: IUser
  isFeatured?: boolean
}
