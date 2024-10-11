
import { NextResponse,NextRequest } from "next/server"
import mongoose, { Document, Model } from "mongoose";
import { Verfiy } from "../../../../lib/verify";
 
export async function POST(request: NextRequest, response: Response) {
    try{
        const data = await request.json()
        
        const verify_jwt = await Verfiy(data.token)
        

        if(verify_jwt){
            console.log(verify_jwt)
            return NextResponse.json({
                msg: "ok",
                data: verify_jwt.data
            })
        }
        else{
            return NextResponse.json({
                msg: "expired",
                data: false
            })
        }

        
    }
    catch(err){
        console.log(err)
    }
}