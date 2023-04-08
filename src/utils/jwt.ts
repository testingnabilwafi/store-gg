import jwt from 'jsonwebtoken'
import CONFIG from '../config/env.conf'

import type { IUser } from '../types/user.types'

export const signJWT = (
  payload: Partial<Pick<IUser, 'password'>> & Omit<IUser, 'password'>,
  options?: jwt.SignOptions
) => {
  return jwt.sign(payload, `${CONFIG.SECRET_JWT}`, {
    ...(options && options)
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, `${CONFIG.SECRET_JWT}`)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}
