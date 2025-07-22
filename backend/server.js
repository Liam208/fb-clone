import express from 'express'
import userRoutes from './routes/routes.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './db/db.js'


const App = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

App.use(cookieParser())
App.use(express.json())

App.use((err, req, res, next) => {
  console.error("Global error handler caught an error:", err.stack); // Log the stack trace
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
    error: err.stack, // Send stack trace in development for debugging
  });
});

App.set('views', path.join(__dirname, '..', 'frontend', 'HTML'))
App.set('view engine', 'ejs')

// Serve static files (CSS, JS, Images)
App.use(express.static(path.join(__dirname, "..", "frontend")));



App.use('/', userRoutes);
connectDB();
App.listen(5000,() => {
    console.log("server running on 5000")
});

