//
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const postRoutes = require("./routes/Post");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const path = require("path")

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"*",
		credentials:true,
		optionSuccessStatus:200,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();
const buildPath = path.join(__dirname , "../build")
app.use(express.static(buildPath))
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/post", postRoutes);
// app.use("/api/v1/payment", paymentRoutes);


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.get("/*", function(req,res){
	res.sendFile(
		path.join(__dirname, "../build/index.html"),
		function(err) {
			if(err) {
				res.status(500).send(err);
			}
		}
	);

})
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

