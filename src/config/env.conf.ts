import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const CONFIG = {
  ROOTPATH: path.resolve(__dirname, '..'),
  SALT: 10,
  DBLINK: process.env.DBLINK,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT
}

export default CONFIG
