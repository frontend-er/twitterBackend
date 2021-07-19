import { body } from "express-validator"



export const registorValidations = [
   body('email', 'Введите E-Mail').isEmail().withMessage('Неверный E-Mail').isLength({
      min: 10,
      max: 40,
   }).withMessage('Допустимый минимум 10, максимум 40'),
   body('fullName', 'Введите  имя').isString().isLength({
      min: 2,
      max: 40,
   }).withMessage('Допустимый минимум 2, максимум 40'),
   body('userName', 'Введите логин').isString().isLength({
      min: 2,
      max: 40,
   }).withMessage('Допустимый минимум 2, максимум 40'),
   body('password', 'Введите пароль').isString().isLength({
      min: 6
   }).withMessage('Минимальная длинна пароля 6 символов ')
      .custom((value, { req }) => {
         if (value !== req.body.password2) {
            throw new Error("Пароли не совпадают");
         } else {
            return value;
         }
      }),

]