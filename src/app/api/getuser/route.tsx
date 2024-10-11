export const dynamic = 'force-dynamic'
import mongoose from "mongoose";
import { NextResponse } from "next/server"
import { UserSchema } from "../../../../lib/schema/userSchema";


export async function GET(request: Request, res : any) {

  const user = mongoose.models.user || mongoose.model('user', UserSchema)

  const result = await user.aggregate([
    {$unset: 'password'},
    {$unset: 'token'}
  ])
  
  return NextResponse.json(result)
}


