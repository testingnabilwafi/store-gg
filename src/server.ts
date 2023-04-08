import express from 'express'
import logger from './utils/logger'
import bodyParser from 'body-parser'
import path from 'path'
import expressLayout from 'express-ejs-layouts'
import morgan from 'morgan'
import './utils/connectDB'
import session from 'express-session'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import CONFIG from './config/env.conf'
import methodOverride from 'method-override'

import routes from './routes/web'

import type { Application } from 'express'
import routesAPI from './routes/api'
import deserializeToken from './middlewares/deserializeToken'

const app: Application = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/adminlte', express.static('./node_modules/admin-lte/'))
app.use(expressLayout)
app.use(methodOverride('_method'))
app.use(flash())
app.use(cookieParser())
app.use(
  session({
    secret: `${CONFIG.SECRET_SESSION}`,
    resave: false,
    saveUninitialized: true,
    cookie: {}
  })
)
app.use(deserializeToken)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

routesAPI(app)
routes(app)

app.listen(process.env.PORT ?? 3000, () => {
  logger.info('Server is running on port 3000')
})
