import express from 'express';
import UserSessionController from './UserSessionController';
import { AuthMiddleware } from '../../../common/AuthMiddleware';

const userSessionRouter = express.Router();

userSessionRouter.get('/', [AuthMiddleware], UserSessionController.listSessions);
userSessionRouter.post('/', UserSessionController.createSession);
userSessionRouter.get('/:id', UserSessionController.getSession);
userSessionRouter.put('/:id', UserSessionController.updateSession);
userSessionRouter.delete('/:id', UserSessionController.deleteSession);

export default userSessionRouter;
