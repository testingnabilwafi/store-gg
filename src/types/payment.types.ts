import type { IBank } from './bank.types'
import type { ObjectId } from 'mongoose'

export interface IPayment {
  _id?: ObjectId
  type: string
  status: 'Y' | 'N'
  banks: IBank
}
