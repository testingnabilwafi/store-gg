import mongoose from 'mongoose'

import type { IVoucher } from '../types/voucher.types'

const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name game must be fill']
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y'
    },
    thumbnail: {
      type: String
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    nominals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nominal'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
)

const VoucherModel = mongoose.model<IVoucher>('voucher', voucherSchema)

export default VoucherModel
