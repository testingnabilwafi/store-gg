import type { ObjectId } from 'mongoose'

export interface IBank {
  _id?: ObjectId
  name: string
  nameBank: string
  accountNumber: string
}
