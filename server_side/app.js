if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express")
const router  = require("./routers")
const app = express()
const cors = require("cors")
const  errorHandler  = require("./middlewares/errorHandler")

// using corse
app.use(cors())

// middlewares and body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use(router);

//error handler
app.use(errorHandler)

module.exports = app
