import { model, Schema, Document } from "mongoose";


export interface UserModelInterface {
   email: string;
   fullName: string;
   userName: string;
   password: string;
   confirmHash: string;
   confirmed?: boolean;
   location?: string;
   about?: string;
   website?: string;
}

type UserModelDocumentInterface = UserModelInterface & Document;



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



export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);