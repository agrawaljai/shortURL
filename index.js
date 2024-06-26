const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticrouter = require("./routes/staticRouter");
const URL = require("./models/url");

const { connectToMongoose } = require("./connect");
const { checkForAuthentication, restrictTo  } = require("./Middlewares/auth");

const app = express();
const PORT = 8001;

connectToMongoose('mongodb://127.0.0.1:27017/short-url');

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use(express.json()); //acts as middleware/plugin
app.use(express.urlencoded({ extended: false })); //to gain data from post req
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticrouter);
app.use("/user", userRoute);


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));