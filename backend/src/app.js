import express from "express"
const app = express()
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})




app.use(cors({
  origin: 'https://engage-learning.vercel.app/', // Change this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

//common middlewares
app.use(express.json())
app.options('*', cors());

//import routes
import signupRouter from "./routes/signup.route.js"
import signinRouter from "./routes/signin.route.js"
import formRouter from "./routes/form.route.js"
app.use('/register', signupRouter)
app.use('/login', signinRouter)
app.use('/form', formRouter)
export {app}