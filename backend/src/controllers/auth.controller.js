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
        const { fullname, email, phone, password, location } = req.body;
        console.log(fullname+email+password+location)

        if (!fullname || !email || !phone || !password || !location) {
            console.log(fullname + email + phone + password + location);
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUserByPhone = await User.findOne({ phone });
        if (existingUserByPhone) {
            return res.status(409).json({ message: 'Phone number already exists' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname: fullname,
            email,
            phone,
            password: hashedPassword,
            location,
        });
        console.log(newUser);

        res.status(200).json({
            fullname: newUser.fullname,
            email: newUser.email
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};


const Signin = async (req, res) => {
    try {
        const { fullname, password } = req.body;

        if (!fullname || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await User.findOne({ fullname });
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