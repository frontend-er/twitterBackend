// @ts-nocheck
const passport = require("passport")
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { UserModel, UserModelInterface } from '../models/userModule';
import { gennerateMD5 } from '../utils/generateHash';




passport.use(
   new LocalStrategy(
      async (username, password, done): Promise<void> => {
         try {
            const user = await UserModel.findOne({ $or: [{ email: username }, { username }] }).exec();

            if (!user) {
               done(null, false)
            }

            if (user.password === gennerateMD5(password + process.env.SECRET_KEY)) {
               done(null, user)
            } else {
               done(null, false)
            }
         } catch (error) {
            done(error, false)


         }
      })
);


passport.serializeUser((user, done) => {
   done(null, user?._id);
});

passport.deserializeUser((id, done) => {
   UserModel.findById(id, (err, user) => {
      done(err, user);
   });
});

passport.use(
   new JWTstrategy(
      {
         secretOrKey: process.env.SECRET_KEY,
         jwtFromRequest: ExtractJwt.fromHeader('token')
      },
      async (paylaod: { data: UserModelInterface }, done) => {
         try {
            console.log(paylaod)
            const user = await UserModel.findById(paylaod.body._id).exec()

            if (user) {
               return done(null, user)
            }

            done(null, user)


            return done(null, paylaod.user);
         } catch (error) {
            done(error, false);
         }
      }
   )
);



export { passport };