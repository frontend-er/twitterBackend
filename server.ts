import dotenv from 'dotenv';
dotenv.config();

require("./core/db")

import express from 'express';
import { passport } from './core/passport';
import { UserCtrl } from "./controllers/UserController";
import { registorValidations } from './validations/registr';

const app = express();

app.use(express.json())
app.use(passport.initialize())

app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);
app.get('/auth/verify', registorValidations, UserCtrl.verify);
app.post('/auth/register', registorValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

//app.patch('/users', UserCtrl.update);
//app.delete('/users', UserCtrl.delete);






app.listen(8888, () => {
   console.log("SERVER RUNNED")
});