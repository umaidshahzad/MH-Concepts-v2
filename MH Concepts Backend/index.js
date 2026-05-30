//app create
const express=require("express");
require("dotenv").config();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=express();
const FileUpload=require("express-fileupload")
//port find

const PORT=process.env.PORT || 3000;
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(FileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
// Add both your local URL and your deployed URL
const allowedOrigins = [
    "http://localhost:5173", 
    "https://mh-concepts-frontend.onrender.com"
];

app.use(cors({
    origin: allowedOrigins, // Use the array instead of a single string
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//db connect
const DBconnect=require("./config/Database.js");
DBconnect();

//cloud connect
const cloudinaryConnect=require("./config/Cloudinary.js");
cloudinaryConnect();

//api route mount
const routes=require("./routes/routes.js")
app.use("/api/v1/",routes);

//server
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})