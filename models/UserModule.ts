import { model, Schema, Document } from "mongoose";


export interface UserModelInterface {
   _id?: string;
   email: string;
   fullName: string;
   username: string;
   password: string;
   confirmHash: string;
   confirmed?: boolean;
   location?: string;
   about?: string;
   website?: string;
}

export type UserModelDocumentInterface = UserModelInterface & Document;



const UserSchema = new Schema<UserModelInterface>({

   email: {
      unique: true,
      requred: true,
      type: String,
   },

   fullName: {
      requred: true,
      type: String,
   },
   username: {
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
   confirmed: {
      type: Boolean,
      default: false,
   },
   confirmHash: {
      requred: true,
      type: String,
   },
   about: String,
   website: String,



});

UserSchema.set('toJSON', {
   transform: function (_, obj) {
      delete obj.password;
      delete obj.confirmHash;
      return obj
   }
})



export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);