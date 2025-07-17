
import {Router} from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import verifyToken from '../middleware/token.js'

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const HTML_PAGES_DIR = path.join(__dirname, '..', 'tests')



router.get('/', verifyToken, (req,res) => {
    // res.sendFile(path.join(HTML_PAGES_DIR, 'home.html'))
    res.send("Home route working")
})

router.get('/signup', (req,res) => {
    // res.sendFile(path.join(HTML_PAGES_DIR, 'signup.html'))
    // console.log("Served signup.html")
    res.send("Signup working")
})

router.get('/login', (req,res) => {
    // res.sendFile(path.join(HTML_PAGES_DIR, 'login.html'))
    // console.log("served login.html")
    res.send("login working")
})

