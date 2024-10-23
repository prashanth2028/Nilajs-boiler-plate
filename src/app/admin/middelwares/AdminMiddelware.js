import { Admin } from '../models/AdminModel';
import { AdminMessages } from '../messages/message';
import { HttpStatus } from '../../../utils/HttpUtil';
import { errorResponse } from '../../../utils/ResponseUtil';
import jwt from 'cva-jwt';

export const AdminAuth = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return errorResponse(res, HttpStatus.UNAUTHORIZED, AdminMessages.UNAUTHORIZED_TOKEN);
        }
       
        const token = authHeader.split(' ')[1]; 
        if (!token) {
            return errorResponse(res, HttpStatus.UNAUTHORIZED, AdminMessages.UNAUTHORIZED_TOKEN);
        }

        
        let decoded;
        try {            
            decoded = jwt.decode(token, process.env.JWT_SECRET, 'HS256');  
        } catch (err) {
            console.error('JWT Verification error:', err.message);
            return errorResponse(res, HttpStatus.UNAUTHORIZED, AdminMessages.INVALID_TOKEN);
        }

        
        if (!decoded || !decoded._id) {
            return errorResponse(res, HttpStatus.UNAUTHORIZED, AdminMessages.INVALID_TOKEN);
        }

        
        const admin = await Admin.findById(decoded._id);
        
        
        if (!admin) {
            return errorResponse(res, HttpStatus.NOT_FOUND, AdminMessages.USER_NOT_FOUND);
        }
       
        next();

    } catch (error) {
        console.error('Authorization error:', error);
        return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, AdminMessages.BAD_REQUEST);
    }
};