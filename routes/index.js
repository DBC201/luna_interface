const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router();
const fs = require("fs");

const trades = require(path.join(__dirname, "trades"));
const email = require(path.join(__dirname, "email"));

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/compressed", function (req, res) {
    let files = fs.readdirSync(process.env.compressed_path);
    res.render("compressed", {
        title: "compressed",
        file_names: files
    })
});

router.get("/compressed/:file", function (req, res) {
    let files = fs.readdirSync(process.env.compressed_path);
    let file = req.params.file;
    if (files.indexOf(file) !== -1) {
        res.sendFile(path.resolve(path.join(process.env.compressed_path, file)));
    } else {
        res.send("unknown file");
    }
});

router.get("/trades/*", trades);
router.post("/email/*", email);

module.exports = router;
