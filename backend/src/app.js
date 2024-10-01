import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const app = express();

// Enable CORS
app.use(cors({
    origin: 'https://engage-learning.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// Common middleware
app.use(express.json());

// Import routes
import signupRouter from "./routes/signup.route.js";
import signinRouter from "./routes/signin.route.js";
import formRouter from "./routes/form.route.js";

app.use('/register', signupRouter);
app.use('/login', signinRouter);
app.use('/form', formRouter);

export { app };
