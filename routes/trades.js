const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router();
const fs = require("fs");

let gateListingPattern = /.*-(?<year>\d+)-(?<month>\d+)-(?<day>\d+)_(?<time>.*)\.json/;
let binanceListingPattern = /.*_(?<year>\d+)-(?<month>\d+)-(?<day>\d+)_(?<time>.*)\.json/;

router.get("/trades/gate_historical", function(req, res) {
    let file_names = fs.readdirSync(process.env.gate_historical_path);
    file_names = sortFileNames(file_names, gateListingPattern);
    res.render("files", {
        type: "gate_historical",
        file_names: file_names
    });
});


router.get("/trades/binance_live", function(req, res) {
    let file_names = fs.readdirSync(process.env.binance_live_path);
    file_names = sortFileNames(file_names, binanceListingPattern);
    res.render("files", {
        type: "binance_live",
        file_names: file_names
    });
});

router.get("/trades/binance_historical", function(req, res) {
    let file_names = fs.readdirSync(process.env.binance_historical_path);
    file_names = sortFileNames(file_names, binanceListingPattern);
    res.render("files", {
        type: "binance_historical",
        file_names: file_names
    });
});

router.get("/trades/gate_historical/:file", function (req, res) {
    let file_name = req.params.file;
    let files = fs.readdirSync(process.env.gate_historical_path);
    if (files.indexOf(file_name) !== -1) {
        res.render("graph", {
            title: file_name.split('-')[0],
            file_name: file_name,
            data: fs.readFileSync(path.join(process.env.gate_historical_path, file_name), "utf-8"),
            type: "gate_historical"
        });
    } else {
        res.send("Wrong graph");
    }
});

router.get("/trades/binance_live/:file", function (req, res) {
    let file_name = req.params.file;
    let files = fs.readdirSync(process.env.binance_live_path);
    if (files.indexOf(file_name) !== -1) {
        res.render("graph", {
            title: file_name.split('_')[0],
            file_name: file_name,
            data: fs.readFileSync(path.join(process.env.binance_live_path, file_name), "utf-8"),
            type: "binance_live"
        });
    } else {
        res.send("Wrong graph");
    }
});

router.get("/trades/binance_historical/:file", function (req, res) {
    let file_name = req.params.file;
    let files = fs.readdirSync(process.env.binance_historical_path);
    if (files.indexOf(file_name) !== -1) {
        res.render("graph", {
            title: file_name.split('_')[0],
            file_name: file_name,
            data: fs.readFileSync(path.join(process.env.binance_historical_path, file_name), "utf-8"),
            type: "binance_historical"
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
