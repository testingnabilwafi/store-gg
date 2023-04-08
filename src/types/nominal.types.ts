import type { ObjectId } from 'mongoose'

export interface INominal {
  _id?: ObjectId
  coinQty: number
  coinName: string
  price: number
}
