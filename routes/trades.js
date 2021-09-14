const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router();
const fs = require("fs");

router.get("/trades/gate", function(req, res) {
    let file_names = fs.readdirSync(process.env.gate_path);
    file_names = sortGateFileNames(file_names);
    res.render("files", {
        type: "gate",
        file_names: file_names
    });
});


router.get("/trades/live", function(req, res) {
    let file_names = fs.readdirSync(process.env.live_path);
    file_names = sortBinanceFileNames(file_names);
    res.render("files", {
        type: "live",
        file_names: file_names
    });
});

router.get("/trades/historical", function(req, res) {
    let file_names = fs.readdirSync(process.env.historical_path);
    file_names = sortBinanceFileNames(file_names);
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

function sortGateFileNames(file_names) {
    return file_names.sort(function(a, b) {
        let year1 = a.split("-")[1];
        let year2 = b.split("-")[1];
        if (year1 != year2) {
            return year2 - year1;
        }
        let month1 = a.split("-")[2];
        let month2 = b.split("-")[2];
        if (month1 != month2) {
            return month2 - month1;
        }
        let day1 = a.split("-")[3].substring(0, 2);
        let day2 = b.split("-")[3].substring(0, 2);
        if (day1 != day2) {
            return day2 - day1;
        }
        let time1 = a.split("_")[2].split(".").join("").substring(0, 6);
        let time2 = b.split("_")[2].split(".").join("").substring(0, 6);
        return time2 - time1;
    });
}

function sortBinanceFileNames(file_names) {
    return file_names.sort(function(a, b) {
        let date1 = a.split("_")[1];
        let date2 = b.split("_")[1];

        let year1 = date1.split("-")[0];
        let year2 = date2.split("-")[0];
        if (year1 != year2) {
            return year2 - year1;
        }
        let month1 = date1.split("-")[1];
        let month2 = date2.split("-")[1];
        if (month1 != month2) {
            return month2 - month1;
        }
        let day1 = date1.split("-")[2];
        let day2 = date2.split("-")[2];
        if (day1 != day2) {
            return day2 - day1;
        }
        let time1 = a.split("_")[2].split(".").join("").substring(0, 6);
        let time2 = b.split("_")[2].split(".").join("").substring(0, 6);
        return time2 - time1;
    });
}

module.exports = router;
