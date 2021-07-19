import dotenv from 'dotenv';
dotenv.config();

require("./core/db")

import express from 'express';
import { UserCtrl } from "./controllers/UserController";
import { registorValidations } from './validations/registr';


const app = express();

app.use(express.json())


app.get('/users', UserCtrl.index);
app.post('/users', registorValidations, UserCtrl.create);
app.get('/users/verify', registorValidations, UserCtrl.verify);

//app.patch('/users', UserCtrl.update);
//app.delete('/users', UserCtrl.delete);






app.listen(8888, () => {
   console.log("SERVER RUNNED")
});