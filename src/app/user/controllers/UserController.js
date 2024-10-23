import { HttpStatus } from '../../../utils/HttpUtil';
import { errorResponse, successResponse } from '../../../utils/ResponseUtil';
import { UserMessages } from '../messages/messages';
import UserService from '../services/UserService';

class UserController {
    
    // Create a new user
    async createUser(req, res) {
        try {            
            const user = await UserService.createUser(req.body);
            return successResponse(res, HttpStatus.CREATED, UserMessages.ACCOUNT_CREATED,user);
            
        } catch (error) {          
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message })
        }
    }

    // Read all users
    async listUsers(req, res) {
        try {
            const users = await UserService.listUsers();
            return successResponse(res, HttpStatus.OK, UserMessages.OK, users);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Read a single user by ID
    async getUser(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.USER_NOT_FOUND, { message: UserMessages.USER_NOT_FOUND });
            return successResponse(res, HttpStatus.OK, UserMessages.OK, user);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Update a user by ID
    async updateUser(req, res) {
        try {
            const user = await UserService.updateUserById(req.params.id, req.body);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Delete a user by ID
    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User deleted' });
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserMessages.BAD_REQUEST, { message: error.message });
        }
    }
}

export default new UserController();
