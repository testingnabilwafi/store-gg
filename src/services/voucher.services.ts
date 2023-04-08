import VoucherModel from '../models/Voucher.model'

import type { IVoucher } from '../types/voucher.types'

export const getVouchers = () => {
  const result = VoucherModel.find().populate('category').populate('nominals')

  return result
}

export const getVouchersSelectedColumn = () => {
  const result = VoucherModel.find()
    .select('_id name categories status thumbnail')
    .populate('category')

  return result
}

export const getVoucherByIdPopulateUser = async (_id: string) => {
  const result = await VoucherModel.findOne({ _id })
    .populate('category')
    .populate('nominals')
    .populate('user', '_id name phoneNumber')

  return result
}

export const getVouherByIdPopulateCatAndUser = async (_id: string) => {
  const result = await VoucherModel.findOne({ _id })
    .select('name category _id thumbnail user')
    .populate('category')
    .populate('user')

  return result
}

export const getVoucherById = async (_id: string) => {
  const result = await VoucherModel.findOne({ _id })
    .populate('category')
    .populate('nominals')

  return result
}

export const getVoucherByName = async (name: string) => {
  const result = await VoucherModel.findOne({ name })

  return result
}

export const addVoucher = async (
  payload: Omit<IVoucher, 'user'> & Record<'user', string>
) => {
  const result = await VoucherModel.create(payload)

  return result
}

export const updateVoucher = async (_id: string, payload?: IVoucher) => {
  const result = await VoucherModel.findOneAndUpdate({ _id }, { $set: payload })

  return result
}

export const deleteVoucher = async (_id: string) => {
  const result = await VoucherModel.findOneAndDelete({ _id })

  return result
}

export const updateVoucherStatus = async (_id: string, status: 'Y' | 'N') => {
  const result = await VoucherModel.findOneAndUpdate({ _id }, { status })

  return result
}
