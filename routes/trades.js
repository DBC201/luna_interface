const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router();
const fs = require("fs");

let gateListingPattern = /.*-(?<year>\d+)-(?<month>\d+)-(?<day>\d+)_(?<time>.*)\.json/;
let binanceListingPattern = /.*_(?<year>\d+)-(?<month>\d+)-(?<day>\d+)_(?<time>.*)\.json/;

router.get("/trades/gate", function(req, res) {
    let file_names = fs.readdirSync(process.env.gate_path);
    file_names = sortFileNames(file_names, gateListingPattern);
    res.render("files", {
        type: "gate",
        file_names: file_names
    });
});


router.get("/trades/live", function(req, res) {
    let file_names = fs.readdirSync(process.env.live_path);
    file_names = sortFileNames(file_names, binanceListingPattern);
    res.render("files", {
        type: "live",
        file_names: file_names
    });
});

router.get("/trades/historical", function(req, res) {
    let file_names = fs.readdirSync(process.env.historical_path);
    file_names = sortFileNames(file_names, binanceListingPattern);
    res.render("files", {
        type: "historical",
        file_names: file_names
    });
});

router.get("/trades/gate/:file", function (req, res) {
    let file_name = req.params.file;
    let files = fs.readdirSync(process.env.gate_path);
    if (files.indexOf(file_name) !== -1) {
        res.render("graph", {
            title: file_name.split('-')[0],
            file_name: file_name,
            data: fs.readFileSync(path.join(process.env.gate_path, file_name), "utf-8"),
            type: "gate"
        });
    } else {
        res.send("Wrong graph");
    }
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

function sortFileNames(file_names, file_pattern) {
    return file_names.sort(function(a, b) {
        console.log(a);
        a = file_pattern.exec(a).groups;
        file_pattern.lastIndex = 0;
        b = file_pattern.exec(b).groups;
        console.log(b);
        file_pattern.lastIndex = 0;
        if (a.year != b.year) {
            return b.year - a.year;
        }
        if (a.month != b.month) {
            return b.month - a.month;
        }
        if (a.day != b.day) {
            return b.day - a.day;
        }
        return b.time - a.time;
    });
}

module.exports = router;
