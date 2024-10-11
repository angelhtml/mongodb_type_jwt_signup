import { NextRequest, NextResponse } from "next/server";
import mongoose, { Document, Model } from "mongoose";
import { UserSchema } from "../../../../lib/schema/userSchema";
import { Verfiy } from "../../../../lib/verify";
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        if(data.email && data.password){
            const user = mongoose.models.user || mongoose.model('user', UserSchema)
            const find_user : any = await user.find({email: data.email})
            if(find_user[0]){
                if(find_user[0]?.password == data.password){
                    const verify_jwt = await Verfiy(find_user[0].token)
                    console.log(verify_jwt)
                    if(verify_jwt){
                        return NextResponse.json({msg: "ok", token: find_user[0].token})
                    }
                    else{
                        const info = {
                            email: find_user[0].email,
                            username: find_user[0].username,
                            join_date: find_user[0].join_date
                        }
                        const secretJwt = process.env.SECRET_JWT;
                        if (!secretJwt) {throw new Error('SECRET_JWT is not defined')}
                        
                        const token = jwt.sign({
                            data: info
                        }, secretJwt, { expiresIn: process.env.EXP_JWT });
                        const new_update = await user.findOneAndUpdate({email:find_user[0].email},{token: token})
                        console.log(new_update)
                        return NextResponse.json({msg: "ok", token: token})
                    }
                    
                }
                else{
                    return NextResponse.json({msg: "incorrect password"})
                }
                
            }
            else{
                return NextResponse.json({msg: "user not found"})
            }
            
        }
        else{
            return NextResponse.json({msg: "incorrect data"})
        }
        
    }
    catch(err){
        console.log(err)
    }
}