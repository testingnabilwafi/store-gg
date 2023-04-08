import { getCategories } from '../../services/category.services'
import type { Request, RequestHandler, Response } from 'express'

export const index = (async (req: Request, res: Response) => {
  try {
    const categories = await getCategories()

    if (!categories) {
      return res.status(404).json({ message: 'categories not found' })
    }

    res.status(200).json({ data: categories })
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Intenal Server Error' })
  }
}) as RequestHandler
