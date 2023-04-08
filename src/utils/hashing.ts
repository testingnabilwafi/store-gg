import bcrypt from 'bcrypt'
import CONFIG from '../config/env.conf'

export const hashingPassword = (password: string) => {
  return bcrypt.hashSync(password, CONFIG.SALT)
}

export const verifyPassword = (password: string, passwordHasing: string) => {
  return bcrypt.compareSync(password, passwordHasing)
}
