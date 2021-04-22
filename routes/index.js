const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router()
const fs = require("fs");

const graph = require(path.join(__dirname, "graph"));
const email = require(path.join(__dirname, "email"));

router.get("/", function(req, res) {
    let files = fs.readdirSync(process.env.trades_path);
    res.render("index",{
        files: files
    });
});

router.get("/graph/*", graph);
router.post("/email/*", email);

module.exports = router;
