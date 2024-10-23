import userRouter from "./app/user/routes/routes";
// import userSessionRouter from './app/user/session/routes';
import app from "./config/express";
import AdminRouter from "./app/admin/routes";


app.use('/api/v1/admin' , AdminRouter);
//app.use('/api/v1/users/session', userSessionRouter);
app.use('/api/v1/users', userRouter);



export default app;