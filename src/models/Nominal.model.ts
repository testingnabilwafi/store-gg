import mongoose from 'mongoose'

import type { INominal } from '../types/nominal.types'

const nominalSchema = new mongoose.Schema(
  {
    coinQty: {
      type: Number,
      default: 0
    },
    coinName: {
      type: String,
      require: [true, 'Coin name must be fill']
    },
    price: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const NominalModel = mongoose.model<INominal>('Nominal', nominalSchema)

export default NominalModel
