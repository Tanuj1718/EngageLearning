import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all origins during development
  app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', 'https://engage-learningf.vercel.app');
    res.header('Access-Control-Allow-Headers','Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Content-Language', 'Content-Length', 'Accept','Accept-Language', 'Connection','Accept-Encoding', 'Host','Authorization');
    res.header('Access-Control-Allow-Methods', 'GET','DELETE','POST','HEAD','PATCH','OPTIONS');
    
    if(req.method === 'OPTIONS'){
      return res.status(200).json({});
    }
    next();
  })

// Import routes
import signupRouter from './routes/signup.route.js';
import signinRouter from './routes/signin.route.js';
import formRouter from './routes/form.route.js';

app.use('/register', signupRouter);
app.use('/login', signinRouter);
app.use('/form', formRouter);


export { app };
