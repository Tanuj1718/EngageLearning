import express from "express"
const app = express()
import dotenv from "dotenv"
import cors from 'cors'
dotenv.config({
    path: "./.env"
})



app.use(cors())

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