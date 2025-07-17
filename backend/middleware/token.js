import jwt from 'jsonwebtoken'

const JWT_secret = 'your_super_secret_key'


export default function verifyToken(req, res, next) {
  const authHeader = req.cookies.token;
  if (!authHeader)
    return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token,JWT_secret)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({message: 'something went wrong'})
  }
}