import type { IBank } from './bank.types'
import type { IUser } from './user.types'
import type { IVoucher } from './voucher.types'
import type { ObjectId } from 'mongoose'
import type { INominal } from './nominal.types'
import type { IPayment } from './payment.types'

export interface ITransaction {
  _id?: ObjectId
  historyVoucherTopup: Pick<IVoucher, 'name' | 'thumbnail'> & {
    category?: string
  } & Omit<INominal, '_id'>
  historyPayment: IBank & Pick<IPayment, 'type'>
  name: string
  accountUser: string
  tax: number
  value: number
  status?: 'Pending' | 'Failed' | 'Success'
  player: IUser
  historyUser: Pick<IUser, 'name' & 'phoneNumber'>
  category?: ObjectId
  user?: ObjectId
}
