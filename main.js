const path = require("path");
const fs = require('fs');
require("dotenv").config({path: path.join(__dirname, ".env.local")});
const express = require("express");
const http = require("http");
const app = express();
const http_port = process.env.http_port;
const trades_path = process.env.trades_path;

app.set("view engine", "ejs");

const files = fs.readdirSync(trades_path);

const http_server = http.createServer(app).listen(http_port, function () {
    console.log("Running on port " + http_port);
});

app.get("/", function(req, res) {
    res.render("index",{
        files: files
    });
});

function parse_file(file, miliseconds=undefined) {
    let data = JSON.parse(fs.readFileSync(file, "utf-8"));
    let x_axis = [];
    let y_axis = [];
    let start_time = data[0]['T'];
    for (let i=0; i<data.length; i++) {
        let current_time = (data[i]['T']-start_time);
        if (miliseconds !== undefined && current_time >= miliseconds)
            break;
        x_axis.push(current_time);
        y_axis.push(data[i]['p']);
    }
    return [x_axis, y_axis];
}

app.get("/graph/:file", function(req, res){
    let file_name = req.params.file;
    if (files.indexOf(file_name) !== -1) {
        let axes = parse_file(path.join(trades_path, file_name));
        res.render("graph", {
            x_axis: JSON.stringify(axes[0]),
            y_axis: JSON.stringify(axes[1])
        });
    } else {
        res.send("Wrong graph");
        res.end();
    }
});

app.get("/graph/:file/:timeframe", function(req, res){
    let file_name = req.params.file;
    if (files.indexOf(file_name) !== -1) {
        let axes = parse_file(path.join(trades_path, file_name), req.params.timeframe);
        res.render("graph", {
            x_axis: JSON.stringify(axes[0]),
            y_axis: JSON.stringify(axes[1])
        });
    } else {
        res.send("Wrong graph");
        res.end();
    }
});
