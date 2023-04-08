import NominalModel from '../models/Nominal.model'

import type { INominal } from '../types/nominal.types'

export const getNominals = () => {
  const result = NominalModel.find()

  return result
}

export const getNominalsById = async (_id: string) => {
  const result = await NominalModel.findOne({ _id })

  return result
}

export const getNominalByCoinName = async (coinName: string) => {
  const result = await NominalModel.findOne({ coinName })

  return result
}

export const addNominal = async (payload: INominal) => {
  const result = await NominalModel.create(payload)

  return result
}

export const updateNominal = async (_id: string, payload: INominal) => {
  const result = await NominalModel.findOneAndUpdate({ _id }, { $set: payload })

  return result
}

export const deleteNominal = async (_id: string) => {
  const result = await NominalModel.findOneAndDelete({ _id })

  return result
}
