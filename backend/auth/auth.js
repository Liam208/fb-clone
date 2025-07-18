import jwt from "jsonwebtoken";

const JWT_secret = "your_super_secret_key";

export default function checkAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login"); // No token → redirect
  }

  try {
    const decoded = jwt.verify(token, JWT_secret);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the route
  } catch (err) {
    return res.redirect("/login"); // Invalid token → redirect
  }
}
