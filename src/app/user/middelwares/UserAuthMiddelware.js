import jwt from "cva-jwt";
import { User } from "../models/UserModel";
import { HttpStatus } from "../../../utils/HttpUtil";
import { errorResponse } from "../../../utils/ResponseUtil";
import { UserMessages } from "../messages/messages";


export const UserAuth = async (req,res,next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return errorResponse(res, HttpStatus.UNAUTHORIZED, UserMessages.UNAUTHORIZED_TOKEN);
        }
       
        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return errorResponse(res, HttpStatus.UNAUTHORIZED, UserMessages.UNAUTHORIZED_TOKEN);
        }

        
        let decoded;
        try {            
            decoded = jwt.decode(token, process.env.JWT_SECRET, 'HS256');  
        } catch (err) {
            console.error('JWT Verification error:', err.message);
            return errorResponse(res, HttpStatus.UNAUTHORIZED, UserMessages.INVALID_TOKEN);
        }

        
        if (!decoded || !decoded._id) {
            return errorResponse(res, HttpStatus.UNAUTHORIZED, UserMessages.INVALID_TOKEN);
        }

        const user = await User.findById(decoded._id);

        if(!user) {
            return errorResponse(res, HttpStatus.NOT_FOUND, UserMessages.USER_NOT_FOUND);
        }

        next();

        
    } catch (error) {
        console.error('Authorization error:', error);
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, UserMessages.BAD_REQUEST);
        
    }

}

export const sessionAuthCheck = async (req,res,next)=> {
    try {
        
    } catch (error) {
        
    }
}