import mongoose from 'mongoose'

import type { ITransaction } from '../types/transaction.types'

const TransactionSchema = new mongoose.Schema(
  {
    historyVoucherTopup: {
      name: { type: String, require: [true, 'game name must be fill'] },
      category: { type: String, require: [true, 'category must be fill'] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, 'coin name must be fill'] },
      coinQty: {
        type: String,
        require: [true, 'coin quantity must be fill']
      },
      price: { type: String }
    },
    historyPayment: {
      name: { type: String, require: [true, 'name must be fill'] },
      type: { type: String, require: [true, 'type must be fill'] },
      bankName: { type: String, require: [true, 'bank name must be fill'] },
      accountNumber: {
        type: String,
        require: [true, 'account number must be fill']
      }
    },
    name: {
      type: String,
      required: [true, 'name must be fill'],
      maxlength: [255, 'name length must be 3 - 225 characters'],
      minlength: [3, 'name length must be 3 - 225 characters']
    },
    accountUser: {
      type: String,
      required: [true, 'name must be fill'],
      maxlength: [255, 'name length must be 3 - 225 characters'],
      minlength: [3, 'name length must be 3 - 225 characters']
    },
    tax: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'success'],
      default: 'pending'
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    historyUser: {
      name: { type: String, required: [true, 'Name user must be fill'] },
      phoneNumber: {
        type: Number,
        required: [true, 'phone number must be fill'],
        maxlength: [13, 'phone number must be fill 9 - 13 character'],
        minlength: [9, 'phone number must be fill 9 - 13 character']
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

const TransactionModel = mongoose.model<ITransaction>(
  'transaction',
  TransactionSchema
)

export default TransactionModel
