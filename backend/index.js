import express ,{urlencoded}from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/user.routes.js"
import postRoute from "./routes/post.routes.js"
import messageRoute from "./routes/message.routes.js"

import dotenv from "dotenv"
import connectDB from "./utils/db.js"
dotenv.config({})


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true,
}
app.use(cors(corsOptions));
app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
    connectDB();

});
