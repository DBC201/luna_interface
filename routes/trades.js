const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router();
const fs = require("fs");


router.get("/trades/live", function(req, res) {
    let file_names = fs.readdirSync(process.env.live_path);
    res.render("files", {
        type: "live",
        file_names: file_names
    });
});

router.get("/trades/historical", function(req, res) {
    let file_names = fs.readdirSync(process.env.historical_path);
    res.render("files", {
        type: "historical",
        file_names: file_names
    });
});

router.get("/trades/live/:file", function (req, res) {
    let file_name = req.params.file;
    let files = fs.readdirSync(process.env.live_path);
    if (files.indexOf(file_name) !== -1) {
        res.render("graph", {
            title: file_name.split('_')[0],
            file_name: file_name,
            data: fs.readFileSync(path.join(process.env.live_path, file_name), "utf-8"),
            type: "live"
        });
    } else {
        res.send("Wrong graph");
    }
});

router.get("/trades/historical/:file", function (req, res) {
    let file_name = req.params.file;
    let files = fs.readdirSync(process.env.historical_path);
    if (files.indexOf(file_name) !== -1) {
        res.render("graph", {
            title: file_name.split('_')[0],
            file_name: file_name,
            data: fs.readFileSync(path.join(process.env.historical_path, file_name), "utf-8"),
            type: "historical"
        });
    } else {
        res.send("Wrong graph");
    }
});

module.exports = router;
