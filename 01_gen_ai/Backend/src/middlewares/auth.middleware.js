import jwt from 'jsonwebtoken';
import blacklistModel from '../models/blacklist.model.js';


export const authUser = async (req, res, next) => {

    // get token from cookies:
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    // check token is blacklisted ?
    const isTokenBlacklisted = await blacklistModel.findOne({ token });
    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is invalid"
        })
    }

    try {
        // verify token:
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
};