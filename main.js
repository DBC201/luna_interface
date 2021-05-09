const path = require("path");
const argv = require("yargs")(process.argv.slice(2))
    .option("no_https", {
        description: "runs http only",
        alias: "n",
        type: "boolean",
        default: false,
    })
    .help().alias("help", "h")
    .parse();
require("dotenv").config({path: path.join(__dirname, ".env.local")});
const fs = require("fs");
const express = require("express");
const app = express();
const routes = require(path.join(__dirname, "routes", "index"));
const body_parser = require("body-parser");


app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

const http_port = process.env.http_port;
const http = require("http");
let http_server;
function create_http_server(app, port) {
    console.log("Running on port " + port);
    return http.createServer(app).listen(port);
}

if (argv.no_https){
    http_server = create_http_server(app, http_port);
} else {
    const http_app = express(); //part below listens to http_port and redirects all traffic to https
    http_server = create_http_server(http_app, http_port);
    http_app.get("*", function (req, res) {
        res.redirect("https://" + req.headers.host + req.url);
    });

    const https = require('https');
    const https_port = process.env.https_port;
    const credentials = {
        key: fs.readFileSync(process.env.private_key_dir, 'utf8'),
        cert: fs.readFileSync(process.env.certificate_dir, 'utf8')
    };
    const https_server = https.createServer(credentials, app).listen(https_port, function () {
        console.log("Running on port " + https_port);
    });
}

app.get("*", routes);
app.post("*", routes);
