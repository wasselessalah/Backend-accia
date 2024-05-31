const express = require("express");
const path=require("path")
const connectToDb = require("./config/connectToDb");
const { errorHandler, notfound } = require("./middlewares/error");
require("dotenv").config();
const cors=require("cors");
const bodyParser = require('body-parser'); 
//connect to db
connectToDb();
//init app
const app = express();
//middlewares
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (if you're also sending JSON data)
app.use(bodyParser.json());

//Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin/users", require("./routes/usersRoutes"));
app.use("/api/admin/post", require("./routes/postRoutes"));
app.use("/api/admin/comment", require("./routes/commentRoutes"));
app.use("/api/admin/album", require("./routes/albumRouter"));
app.use("/api/admin/event",require("./routes/EventRouter"));
app.use("/api/admin/document",require("./routes/documentRoute"));
app.use("/api/admin/sponsor",require("./routes/sponsorRoute"));
app.use("/api/reservation",require("./routes/reservationRoute"));

//error Handler
app.use(notfound);
app.use(errorHandler);

//running the server

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on port 8000');
});

