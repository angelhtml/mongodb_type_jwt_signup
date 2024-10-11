"use server"
import mongoose from "mongoose";

export const userdata = async () =>{
    const Schema = mongoose.Schema;
      
      const UserSchema = new Schema({
      name: String,
      password: String
  });
  
    const user = mongoose.models.user || mongoose.model('user', UserSchema )
  
    const result = await user.aggregate([
      {$unset: 'password'},
      {$unset: 'token'}
    ])
    console.log(result)
    return result
  }