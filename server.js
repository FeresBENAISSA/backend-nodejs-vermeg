const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;
const verifyJWT = require("./middleware/verifyJWT");
const verifyTokenIsNotInBlacklist = require("./middleware/verifyTokenIsNotInBlacklist");
// custom - 3rd pardy build in middleware

// build-in middleware and applyet for all routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
// midleware for cookies
app.use(cookieParser());
//custom middlware logger
app.use(logger);
// Cross Origin Resource sharing (only react server) 3rd party
app.use(cors());

// connect to db
mongoose.connect(
  "mongodb+srv://fbi:Co145142@mydata.xfjubpp.mongodb.net/?retryWrites=true&w=majority"
);

// use the routes
// app use , path , path in yout project with require
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));

// apply verfiy jwt middleware
app.use(verifyJWT);
// app.use(verifyTokenIsNotInBlacklist);
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/api/products"));

app.get("/test", (req, res) => {
  res.send({ test: true });
});
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});