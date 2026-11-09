import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


// post: /api/auth/register
export const registerUserController = async (req, res) => {

    // get username, email, password from req.body:
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    // if user is already exists:
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this username and email address"
        })
    }

    // hash password:
    const hash = await bcrypt.hash(password, 10);

    // register new user:
    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    // create token for a new user:
    const token = jwt.sign(
        { id: user._id, user: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    // set token in cookie:
    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
};


// post: /api/auth/login
export const loginUserController = async (req, res) => {

    // get email and password form req.body
    const { email, password } = req.body;

    // if user already exists with this email :
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // compare password: (req.body or db)
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // create token:
    const token = jwt.sign(
        { id: user._id, user: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    // set token in cookie:
    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
};