// app.js
import express from 'express';
import cors from 'cors';
import signupRouter from './routes/signup.route.js';
import signinRouter from './routes/signin.route.js';
import formRouter from './routes/form.route.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: '*', // Change this in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

// Enable CORS
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Mount Routers
app.use('/register', signupRouter);
app.use('/login', signinRouter);
app.use('/form', formRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export { app };

