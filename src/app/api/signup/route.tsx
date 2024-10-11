import { NextResponse,NextRequest } from "next/server"
import mongoose, { Document, Model } from "mongoose";
import jwt from 'jsonwebtoken';
import { UserSchema } from "../../../../lib/schema/userSchema";
 
export async function POST(request: NextRequest, response: Response) {

  try {
    const data = await request.json()

    const user = mongoose.models.user || mongoose.model('user', UserSchema)

    const find_user : any = await user.find({email: data.email})

    console.log(find_user[0])

    if(find_user[0] == undefined){

        const join_date = Date.now()

        const info = {
            email: data.email,
            username: data.username,
            join_date: join_date
        }

        const secretJwt = process.env.SECRET_JWT;
        if (!secretJwt) {throw new Error('SECRET_JWT is not defined')}

        const token = jwt.sign({
            data: info
        }, secretJwt, { expiresIn: process.env.EXP_JWT });
          console.log(token)

          await user.create({
            email: data.email,
            username: data.username,
            password: data.password,
            join_date: join_date,
            token: token
          });
      
          return NextResponse.json({
            msg: "user added",
            token: token
          })

    }
    else{
        return NextResponse.json({ msg: 'user already exist' }, { status: 200 })
    } 

  }
  catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }

}