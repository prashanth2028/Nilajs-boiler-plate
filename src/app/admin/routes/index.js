import express from 'express';
import adminController from '../controllers/AdminController';
import { AdminAuth } from '../middelwares/AdminMiddelware';
import UserController from '../../user/controllers/UserController';


const AdminRouter = express.Router();


AdminRouter.post('/signup',adminController.createAdmin);
AdminRouter.post('/login', AdminAuth , adminController.login);
AdminRouter.post('/logout',AdminAuth,adminController.logOut);


//uers-list
AdminRouter.get('/users-list' , AdminAuth , UserController.listUsers);
AdminRouter.get('/user/:id',AdminAuth, UserController.getUser);
AdminRouter.put('/user-update/:id',AdminAuth, UserController.updateUser);
AdminRouter.delete('/user-delete/:id',AdminAuth, UserController.deleteUser);
 

export default AdminRouter;