import {Router} from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from '../variables/users.js'
import verifyToken from '../middleware/token.js'

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const HTML_PAGES_DIR = path.join(__dirname, '..', 'tests')
const JWT_secret = 'your_super_secret_key'



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




router.post('/login', async(req,res) => {
    const {username, password} = req.body

    const user = users.find(u=> u.username === username)
    if(!user) return res.status(401).json({message: "wrong mail or pass"})
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).json({message: "Wrong pasword"})

    const token = jwt.sign({username}, JWT_secret, {expiresIn: '1h'})


    res.cookie('token',token, {httpOnly: true, maxAge: 3600000})
    res.json({message: "login successful"},token)
})
router.post('/signup', async (req,res) => {
    const { username,password } = req.body;
    const userExists = users.find(u => u.username === username)
    if(userExists) return res.status(409).json({message: "User exists"})

    const hashedPassword = await bcrypt.hash(password,10)
    users.push({username,password: hashedPassword})
    res.status(201).json({message: 'user registered'})
})

export default router