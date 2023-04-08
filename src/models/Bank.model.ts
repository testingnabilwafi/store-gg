import mongoose from 'mongoose'

import type { IBank } from '../types/bank.types'

const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be fill with your name']
    },
    nameBank: {
      type: String,
      required: [true, 'Name bank must be fill']
    },
    accountNumber: {
      type: Number,
      required: [true, 'Number of rekening must be fill with numbers']
    }
  },
  { timestamps: true }
)

const BankModel = mongoose.model<IBank>('bank', bankSchema)

export default BankModel
