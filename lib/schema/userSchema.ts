import mongoose, { Document, Model } from "mongoose";
const Schema = mongoose.Schema;
export const UserSchema = new Schema({
      email: String,
      username: String,
      password: String,
      join_date: String,
      token: String
    });