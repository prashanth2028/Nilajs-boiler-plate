import UserService from "../app/user/UserService";
import { HttpStatus } from "../utils/HttpUtil"
import { errorResponse, successResponse } from "../utils/ResponseUtil"


export const AuthMiddleware = async (req, res, next) => {

    // 
    if (!req.headers['authorization']) {
        return errorResponse(res, HttpStatus.UNAUTHORIZED, 'Unauthorized, authorization token header is required');
    } 

    // 
    if (!req.headers['session_token']) {
        return errorResponse(res, HttpStatus.UNAUTHORIZED, 'Unauthorized, session_token header is required');
    } 

    // TODO : DB validation of tokens 
    
    // UserService.

    next();
}