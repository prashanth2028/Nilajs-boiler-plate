import adminService from "../services/AdminService";
import { successResponse ,errorResponse } from "../../../utils/ResponseUtil";
import { HttpStatus } from "../../../utils/HttpUtil";
import { AdminMessages } from "../messages/message";
import bcrypt from 'bcrypt';
import { Admin } from "../models/AdminModel";


class AdminController {

    // Create a new user
    async createAdmin(req, res) {
        try {
            const admin = await adminService.createAdmin(req.body);
                return successResponse(res, HttpStatus.CREATED, AdminMessages.ACCOUNT_CREATED, admin);
        } catch (error) {          
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message })
        }
    }

    async login(req, res) {
        try {
            const admin = await Admin.findOne({ email: req.body.email });
            if (!admin) {                
                return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.USER_NOT_FOUND);
            }

            if (!await bcrypt.compare(req.body.password, admin.password)) {
                return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.PASSWORD);
            }
            
            return successResponse(res, HttpStatus.CREATED, AdminMessages.LOGIN_SUCCESS, admin);
        } catch (error) {            
            return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.BAD_REQUEST, { message: error.message })
        }
    }

    async logOut (req , res) {
        try {
            const token = req.headers.authorization?.split(' ')[1]; 

            if (!token) {
                return errorResponse(res, HttpStatus.BAD_REQUEST, AdminMessages.UNAUTHORIZED_TOKEN);
            }

            return successResponse(res, HttpStatus.OK, AdminMessages.LOGOUT_SUCCESS);
        } catch (error) {
            return errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, AdminMessages.BAD_REQUEST, { message: error.message });
        }
    }


}

export default new AdminController();