import express from 'express'
import userRoutes from './routes/routes.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

import { fileURLToPath } from 'url'

const App = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (CSS, JS, Images)
App.use(express.static(path.join(__dirname, "..", "frontend")));


App.use(cookieParser())
App.use(express.json())

App.use('/', userRoutes)
App.listen(5000,() => {
    console.log("server running on 5000")
})

