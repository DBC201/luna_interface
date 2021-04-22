const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env.local")});
const express = require("express");
const http = require("http");
const app = express();
const http_port = process.env.http_port;
const routes = require(path.join(__dirname, "routes", "index"));
const body_parser = require("body-parser");


app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

const http_server = http.createServer(app).listen(http_port, function () {
    console.log("Running on port " + http_port);
});

app.get("*", routes);
app.post("*", routes);
