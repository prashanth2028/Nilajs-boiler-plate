import { User } from "../models/UserModel";
import { UserMessages } from "../messages/messages";
import { successResponse , errorResponse } from "../../../utils/ResponseUtil";
import { HttpStatus } from "../../../utils/HttpUtil";
import bcrypt from 'bcrypt';
import UserSessionController from "../session/UserSessionController";
import UserSessionService from "../session/UserSessionService";


class userAuthController {

    async login (req,res) {
        try {
            const userlogin = await User.findOne({email: req.body.email});   
            console.log(userlogin);
                                 

            if (!userlogin) {
                return errorResponse(res , HttpStatus.BAD_REQUEST , UserMessages.USER_NOT_FOUND);
            }
            if (!await bcrypt.compare(req.body.password, userlogin.password)) {
                return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.PASSWORD);
            }

            const session = await UserSessionController.createSession(req,userlogin);

            return successResponse(res, HttpStatus.CREATED, UserMessages.LOGIN_SUCCESS, {userlogin , session});

        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message })

            
        }
    }

    async logout (req,res) {
        try {
            const user = req.user;
            
            const session = await UserSessionService.deleteSessionById()
            
        } catch (error) {
            
        }

    }
}

export default new userAuthController();