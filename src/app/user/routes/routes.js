import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import { UserAuth } from '../middelwares/UserAuthMiddelware';

const userRouter = express.Router();


//userRouter.get('/', UserController.listUsers);
userRouter.post('/', UserController.createUser);
// userRouter.get('/:id', UserController.getUser);
// userRouter.put('/:id', UserController.updateUser);
// userRouter.delete('/:id', UserController.deleteUser);

//user auth
userRouter.post('/login',UserAuth ,AuthController.login);

export default userRouter;