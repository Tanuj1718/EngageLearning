import express from "express"
import cors from "cors"
const app = express()
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})




app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://engage-learningf.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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