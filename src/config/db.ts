import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const db =async ():Promise<void>=>{
    const MONGO_URI = process.env.MONGO_URI as string
    if(!MONGO_URI){
        throw new Error('MONGO URI FAILED')
    }

   await mongoose.connect(MONGO_URI as string)
    .then(():void=>{
        console.log(`DB Connected`);
    })
    .catch((err:unknown):void=>{
        console.error(`DB error ${err}`);
        
    })
}


