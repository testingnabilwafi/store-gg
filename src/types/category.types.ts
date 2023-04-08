import type { ObjectId } from 'mongoose'

export interface ICategory {
  _id?: ObjectId
  name: string
}
