const path = require("path");
require("dotenv").config({path: path.join(__dirname, "..", ".env.local")});
const router = require("express").Router()
const fs = require("fs");

const graph = require(path.join(__dirname, "trades"));
const email = require(path.join(__dirname, "email"));

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/trades/*", graph);
router.post("/trades/*", email);

module.exports = router;
