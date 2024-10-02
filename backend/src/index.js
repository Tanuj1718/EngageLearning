import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./databases/db.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDb connection error ", err)
})