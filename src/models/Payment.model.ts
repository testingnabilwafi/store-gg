import mongoose from 'mongoose'

import type { IPayment } from '../types/payment.types'

const paymentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: [true, 'type payment must be fill']
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y'
    },
    banks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank'
      }
    ]
  },
  { timestamps: true }
)

const PaymentModel = mongoose.model<IPayment>('payment', paymentSchema)

export default PaymentModel
