import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const app = express();

// Set up CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language');
  res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, HEAD, OPTIONS');

  if(req.method === 'OPTIONS'){
    return res.status(200).json({})
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

export { app };
