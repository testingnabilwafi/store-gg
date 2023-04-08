import { verifyJWT } from '../utils/jwt'

import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { getUserById } from '../services/user.services'

const deserializeToken = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers?.authorization?.replace(/^Bearer\s/, '')
  if (!accessToken) {
    return next()
  }

  const token: any = verifyJWT(accessToken)
  if (!token.decoded) {
    return next()
  }

  if (token.expired) {
    return next()
  }

  const isUserExist = await getUserById(token.decoded._doc._id)
  if (!isUserExist) {
    return next()
  }

  res.locals.user = token.decoded
  return next()
}) as RequestHandler

export default deserializeToken
