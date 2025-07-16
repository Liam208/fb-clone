import {Router} from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const HTML_PAGES_DIR = path.join(__dirname, '..', 'tests')



router.get('/home', (req,res) => {
    res.sendFile(path.join(HTML_PAGES_DIR, 'home.html'))
})

router.get('/signup', (req,res) => {
    res.sendFile(path.join(HTML_PAGES_DIR, 'signup.html'))
    console.log("Served signup.html")
})

router.get('/login', (req,res) => {
    res.sendFile(path.join(HTML_PAGES_DIR, 'login.html'))
    console.log("served login.html")
})

router.post('/login',(req,res) => {
    console.log("Post")
})
router.post('/signup',(req,res) => {
    console.log("Post")
})

export default router