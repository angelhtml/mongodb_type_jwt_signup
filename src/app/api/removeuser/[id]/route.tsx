import { NextResponse,NextRequest } from "next/server";
import mongoose, { Document, Model } from "mongoose";

export async function GET(req: NextRequest, { params }: { params: any }) {
    console.log(params);

    const Schema = mongoose.Schema;
    
    const UserSchema = new Schema({
    name: String,
    password: String,
  });

  const user = mongoose.models.user || mongoose.model('user', UserSchema ) 

  await user.findByIdAndDelete({_id: params.id})
    return NextResponse.json({ id: params.id });
  }