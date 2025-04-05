import express from "express"
import dotenv from "dotenv"
import { db } from "./config/db"
import path from "path"
import studentRouter from "./router/router"

const app = express()

dotenv.config()

app.set('views',path.join(__dirname ,'views'))
app.set('view engine','ejs');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../src/public')))
app.use(express.static(path.join(__dirname,'../dist/public')))



app.use('/',studentRouter)

db()


app.listen(process.env.PORT as string,():void=>{
    console.log(`Server Started at ${process.env.PORT}`);
})