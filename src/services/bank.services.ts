import BankModel from '../models/Bank.model'

import type { IBank } from '../types/bank.types'

export const getBanks = () => {
  const result = BankModel.find()

  return result
}

export const getBankById = async (_id: string) => {
  const result = await BankModel.findOne({ _id })
  return result
}

export const getBankByName = async (name: string) => {
  const result = await BankModel.findOne({ name })
  return result
}

export const addBank = async (payload: IBank) => {
  const result = await BankModel.create(payload)
  return result
}

export const updateBank = async (_id: string, payload: IBank) => {
  const result = await BankModel.findOneAndUpdate({ _id }, { $set: payload })

  return result
}

export const deleteBank = async (id: string) => {
  const result = await BankModel.findByIdAndDelete({ _id: id })

  return result
}
