import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all origins during development
  app.use(cors({
    origin: 'https://engage-learningf.vercel.app',
    credentials: true
  }))

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
