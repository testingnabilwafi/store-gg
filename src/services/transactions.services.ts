import mongoose from 'mongoose'
import TransactionModel from '../models/Transaction.model'

import type { ITransaction } from '../types/transaction.types'

export const getTransactions = () => {
  const result = TransactionModel.find().populate('player')

  return result
}

export const getTransactionsByCriteria = (criteria: object) => {
  const result = TransactionModel.find(criteria)

  return result
}

export const getTransactionById = async (_id: string) => {
  const result = await TransactionModel.findOne({ _id })
  return result
}

export const getTransactionByPlayer = async (player: string) => {
  const result = await TransactionModel.findOne({ player })
    .populate('category')
    .sort({ updatedAt: -1 })
  return result
}

export const getTransactionByName = async (name: string) => {
  const result = await TransactionModel.findOne({ name })
  return result
}

export const addTransaction = async (payload: ITransaction) => {
  const result = await TransactionModel.create(payload)
  return result
}

export const updateTransaction = async (_id: string, payload: ITransaction) => {
  const result = await TransactionModel.findOneAndUpdate(
    { _id },
    { $set: payload }
  )

  return result
}

export const deleteTransaction = async (id: string) => {
  const result = await TransactionModel.findByIdAndDelete({ _id: id })

  return result
}

export const updateTransactionStatus = async (
  _id: string,
  status: string | any
) => {
  const result = await TransactionModel.findOneAndUpdate({ _id }, { status })

  return result
}

export const getTotalTransaction = async (criteria: any) => {
  const result = await TransactionModel.aggregate([
    {
      $match: criteria
    },
    {
      $group: {
        _id: null,
        value: { $sum: '$value' }
      }
    }
  ])

  return result
}

export const getTotalTransactionCategoryByPlayer = async (_id: string) => {
  const result = await TransactionModel.aggregate([
    {
      $match: {
        player: new mongoose.Types.ObjectId(_id)
      }
    },
    {
      $group: {
        _id: '$category',
        value: { $sum: '$value' }
      }
    }
  ])

  return result
}
