import {
  getVoucherByIdPopulateUser,
  getVouchersSelectedColumn
} from '../../services/voucher.services'
import type { Request, RequestHandler, Response } from 'express'

export const index = (async (req: Request, res: Response) => {
  try {
    const vouchers = await getVouchersSelectedColumn()
    if (!vouchers) {
      return res.status(404).json({ message: 'vouchers not found' })
    }

    res.status(200).json({ data: vouchers })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Intenal Server Error' })
  }
}) as RequestHandler

export const show = (async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const voucher = await getVoucherByIdPopulateUser(id)

    if (!voucher) {
      return res.status(404).json({ message: 'Voucher game not found' })
    }

    res.status(200).json({ data: voucher })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Intenal Server Error' })
  }
}) as RequestHandler
