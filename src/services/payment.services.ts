import PaymentModel from '../models/Payment.model'

import type { IPayment } from '../types/payment.types'

export const getPayments = () => {
  const result = PaymentModel.find().populate('banks')

  return result
}

export const getPaymentById = async (_id: string) => {
  const result = await PaymentModel.findOne({ _id }).populate('banks')
  return result
}

export const getPaymentByName = async (name: string) => {
  const result = await PaymentModel.findOne({ name }).populate('banks')
  return result
}

export const addPayment = async (payload: IPayment) => {
  const result = await PaymentModel.create(payload)
  return result
}

export const updatePayment = async (_id: string, payload: IPayment) => {
  const result = await PaymentModel.findOneAndUpdate({ _id }, { $set: payload })

  return result
}

export const deletePayment = async (id: string) => {
  const result = await PaymentModel.findByIdAndDelete({ _id: id })

  return result
}

export const updatePaymentStatus = async (_id: string, status: 'Y' | 'N') => {
  const result = await PaymentModel.findOneAndUpdate({ _id }, { status })

  return result
}
