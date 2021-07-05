const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router()
const fs = require("fs");

const graph = require(path.join(__dirname, "graph"));
const email = require(path.join(__dirname, "email"));

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/live_trades", function(req, res) {
    let file_names = fs.readdirSync(process.env.live_path);
    res.render("files", {
        file_names: file_names
    });
});

router.get("/historical_trades", function(req, res) {
    let file_names = fs.readdirSync(process.env.historical_path);
    res.render("files", {
        file_names: file_names
    });
});

router.get("/graph/*", graph);
router.post("/email/*", email);

module.exports = router;
