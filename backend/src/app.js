import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all origins during development
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://engage-learningf.vercel.app');
    res.header('Access-Control-Allow-Headers', '*');

    res.header('Access-Control-Allow-Methods', 'GET','POST','DELETE','PATCH','PUT','OPTIONS')

    if(req.method === 'OPTIONS'){
      return res.status(200).json({});
    }
    next();
  });

// Common middlewares
app.use(express.json());

// Import routes
import signupRouter from './routes/signup.route.js';
import signinRouter from './routes/signin.route.js';
import formRouter from './routes/form.route.js';

app.use('/register', signupRouter);
app.use('/login', signinRouter);
app.use('/form', formRouter);

// Handle preflight requests (OPTIONS)
app.options('*', cors());

export { app };
