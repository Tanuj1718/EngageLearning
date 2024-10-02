import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import cors from 'cors'
const app = express();


// Common middlewares
app.use(express.json());

// Set up CORS headers
app.use(cors());

// Import routes
import signupRouter from './routes/signup.route.js';
import signinRouter from './routes/signin.route.js';
import formRouter from './routes/form.route.js';

app.use('/register', signupRouter);
app.use('/login', signinRouter);
app.use('/form', formRouter);
export { app };
