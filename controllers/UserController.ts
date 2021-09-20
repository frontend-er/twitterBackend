import express from "express";
import { validationResult } from "express-validator";
import { UserModel, UserModelInterface, UserModelDocumentInterface } from "../models/userModule";
import { sendEmail } from "../utils/sendEmail";
import { gennerateMD5 } from "./../utils/generateHash";
const mongoose = require('../node_modules/mongoose');
const jwt = require("jsonwebtoken")

const isValidObjectId = mongoose.Types.ObjectId.isValid;
class UserController {
   async index(_: any, res: express.Response): Promise<void> {
      try {


         const users = await UserModel.find({}).exec();

         res.json({
            status: 'success',
            data: users
         });
      } catch (error) {
         res.json({
            status: 'error',
            message: JSON.stringify(error)
         })
      }
   }

   async show(req: any, res: express.Response): Promise<void> {
      try {
         const userId = req.params.id;

         if (!isValidObjectId(userId)) {
            res.status(401).send();
            return;
         }


         const user = await UserModel.findById(userId).exec();
         if (!user) {
            res.status(404).send();
            return;
         }

         res.json({
            status: 'success',
            data: user
         });
      } catch (error) {
         res.json({
            status: 'error',
            message: JSON.stringify(error)
         })
      }
   }

   async create(req: express.Request, res: express.Response): Promise<void> {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            res.status(400).json({ status: 'error', errors: errors.array() });
            return;
         }


         const data: UserModelInterface = {
            email: req.body.email,
            username: req.body.username,
            fullName: req.body.fullName,
            password: gennerateMD5(req.body.password + process.env.SECRET_KEY),
            confirmHash: gennerateMD5(process.env.SECRET_KEY || Math.random().toString())

         }

         const user = await UserModel.create(data);




         sendEmail(
            {
               emailFrom: 'admin@twitter.com',
               emailTo: data.email,
               subject: 'Подтверждение почты Twitter Clone Tutorial',
               html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:8888/auth/verify?hash=${data.confirmHash}">по этой ссылке</a>`,
            },
            (err: Error | null) => {
               if (err) {
                  res.status(500).json({
                     status: 'error',
                     message: err,
                  });
               } else {
                  res.status(201).json({
                     status: 'success',
                     data: user,
                  });
               }
            },
         );




      } catch (error) {
         res.json({
            status: 'error',
            message: JSON.stringify(error)
         })
      }
   }

   async verify(req: any, res: express.Response): Promise<void> {
      try {
         const hash = req.query.hash;
         if (!hash) {
            res.status(400).send();
            return;
         }
         const user = await UserModel.findOne({ confirmHash: hash }).exec();


         if (user) {
            user.confirmed = true;
            user.save();
            res.json({
               status: 'success',
            });
         } else {
            res.status(404).json({
               status: 'error',
               message: 'Пользователль не найден'
            });
         }




      } catch (error) {
         res.json({
            status: 'error',
            message: JSON.stringify(error)
         })
      }
   }


   async afterLogin(req: express.Request, res: express.Response): Promise<void> {
      try {
         const user = req.user ? (req.user as UserModelDocumentInterface)?.toJSON() : undefined;
         res.json({
            status: 'succes',
            data: {
               ...user,
               token: jwt.sign({ body: req.user }, process.env.SECRET_KEY, {
                  expiresIn: '35d'
               })
            }
         })


      } catch (error) {
         res.json({
            status: 'error',
            message: JSON.stringify(error)
         })
      }
   }


   async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
      try {
         const user = req.user ? (req.user as UserModelDocumentInterface)?.toJSON() : undefined;
         res.json({
            status: 'succes',
            data: user
         })


      } catch (error) {
         res.json({
            status: 'error',
            message: JSON.stringify(error)
         })
      }
   }

}







export const UserCtrl = new UserController();