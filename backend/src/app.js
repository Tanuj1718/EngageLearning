import express from "express"
const app = express()
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})


const corsOptions = {
  origin: 'https://engage-learning.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECT', 'HEAD', 'PATCH', 'TRACE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://engage-learning.vercel.app');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

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