require("dotenv").config({ path: "./config.env" })
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const cloudianry = require("cloudinary")
const http = require("http")
const helmet = require("helmet")
const compression = require("compression")
const { allowedDomains } = require("./index")



const app = express()
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(cors({origin: allowedDomains,credentials:true}))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


app.use("/api", require("./routes/homesRoutes"))
app.use("/user", require("./routes/userRoutes"))
app.use("/api", require("./routes/uploadRoutes"))
app.use("/api", require("./routes/newsRoutes"))

cloudianry.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const PORT = process.env.PORT
const URI = process.env.MONGODB_URL

server = http.createServer(app)

mongoose.connect(URI, err => {
    if (err) throw err;
    console.log("conected to mongodb");
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`);
})