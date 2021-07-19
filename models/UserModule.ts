import { model, Schema } from "mongoose";




const UserSchema = new Schema({
   email: {
      unique: true,
      requred: true,
      type: String,
   },

   fullName: {
      requred: true,
      type: String,
   },
   userName: {
      unique: true,
      requred: true,
      type: String,
   },
   password: {
      requred: true,
      type: String,
   },
   location: {
      requred: true,
      type: String,
   },
   confirmaed: {
      type: Boolean,
      default: false,
   },
   confirmed_hash: {
      requred: true,
      type: String,
   },
   about: String,
   website: String,



});



export const UserModel = model('User', UserSchema);