import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

const jwtKey = process.env.JWT_SECRET



const Signup = async (req, res) => {
    try {
        console.log("Received")
        const { username, email, password} = req.body;
        console.log(username+email+password)

        if (!username || !email || !password ) {
            console.log(username + email + password + location);
            return res.status(400).json({ message: 'All fields are required' });
        }


        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            email,
            password: hashedPassword
        });
        console.log(newUser);

        res.status(200).json({
            username: newUser.username,
            email: newUser.email
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};


const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 24 hours
        const token = jwt.sign({ fullname: user.fullname }, jwtKey, {
            expiresIn: '2h'
        });

        res.status(200).json({
            fullname: user.fullname,
            token
        });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Server error during signin' });
    }
};

export {Signup, Signin}