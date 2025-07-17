import express from 'express'
import userRoutes from './routes/routes.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const App = express()

App.use(cookieParser())
App.use(express.json())

App.use('/', userRoutes)
App.listen(5000,() => {
    console.log("server running on 5000")
})