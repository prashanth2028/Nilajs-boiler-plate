import { HttpStatus } from '../../../utils/HttpUtil';
import { errorResponse, successResponse } from '../../../utils/ResponseUtil';
import { UserSessionMessages } from './messages';
import UserSessionService from './UserSessionService';
import jwt from 'cva-jwt';


class UserSessionController {
    
    // Create a new session
    async createSession(req,userlogin) {
        try {    
            
            const userDetails = {
                _id: userlogin._id,
                name: userlogin.name,
                email: userlogin.email,
                password: userlogin.password,
                is_primary: userlogin.is_primary,
                status: userlogin.status,
                created_at: userlogin.created_at,
            };
            const sessionData = {
                user_id: userlogin._id,  // Get the user ID from userlogin
                session_token: jwt.encode(userDetails,process.env.JWT_SECRET,'HS256'),
                session_information: {
                    userAgent: req.headers['user-agent'],
                    ip: req.ip || req.connection.remoteAddress,
                    language: req.headers['accept-language'],
                    referrer: req.headers['referer']
                },
                iAt: new Date()
            };
            const session = await UserSessionService.createSession(sessionData);

            return session;
        } catch (error) {                        
            return errorResponse( HttpStatus.BAD_REQUEST, UserSessionMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Read all sessions
    async listSessions(req, res) {
        try {
            const sessions = await UserSessionService.listSessions();
            return successResponse(res, HttpStatus.OK, UserSessionMessages.OK, sessions);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserSessionMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Read a single session by ID
    async getSession(req, res) {
        try {
            const session = await UserSessionService.getSessionById(req.params.id);
            if (!session) return errorResponse(res, HttpStatus.BAD_REQUEST, UserSessionMessages.SESSION_NOT_FOUND, { message: UserSessionMessages.SESSION_NOT_FOUND });
            return successResponse(res, HttpStatus.OK, UserSessionMessages.OK, session);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserSessionMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Update a session by ID
    async updateSession(req, res) {
        try {
            const session = await UserSessionService.updateSessionById(req.params.id, req.body);
            if (!session) return res.status(404).json({ message: 'Session not found' });
            res.json(session);
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserSessionMessages.BAD_REQUEST, { message: error.message });
        }
    }

    // Delete a session by ID
    async deleteSession(req, res) {
        try {
            const session = await UserSessionService.deleteSessionById(req.params.id);
            if (!session) return res.status(404).json({ message: 'Session not found' });
            res.json({ message: 'Session deleted' });
        } catch (error) {
            return errorResponse(res, HttpStatus.BAD_REQUEST, UserSessionMessages.BAD_REQUEST, { message: error.message });
        }
    }
}

export default new UserSessionController();
