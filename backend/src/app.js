import express from "express"
const app = express()
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://engage-learning.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, TRACE'); 
      return res.sendStatus(204); // No Content
  }

  next();
});


//common middlewares
app.use(express.json())

//import routes
import signupRouter from "./routes/signup.route.js"
import signinRouter from "./routes/signin.route.js"
import formRouter from "./routes/form.route.js"
app.use('/register', signupRouter)
app.use('/login', signinRouter)
app.use('/form', formRouter)
export {app}