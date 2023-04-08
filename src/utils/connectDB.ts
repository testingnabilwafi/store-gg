import mongoose from 'mongoose'
import CONFIG from '../config/env.conf'
import logger from './logger'

mongoose.set('strictQuery', false)
mongoose
  .connect(`${CONFIG.DBLINK}`)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.info("Couldn't connect to MongoDB")
    logger.error(err)
  })

const db = mongoose.connection

export default db
