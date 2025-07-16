import express from 'express'
import userRoutes from './routes/routes.js'

const App = express()

App.use(express.json())

App.use('/', userRoutes)
App.listen(5000,() => {
    console.log("server running on 5000")
})