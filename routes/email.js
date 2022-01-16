const router = require("express").Router();
const Database = require("better-sqlite3");
const database = new Database(process.env.database_dir);

router.post("/email/add", function (req, res) {
    let email_address = req.body.email;
    if (email_address) {
        setTimeout(async () => {

            let emails = database.prepare("SELECT * FROM emails WHERE email = ?").get([email_address]);
            if (emails.length > 0) {
                res.send("already added");
            } else {
                database.prepare("INSERT INTO emails(email, valid) VALUES(?,?)").run([email_address, 1]);
                res.send("done");
            }
        }, 3000);
    } else {
        res.send("error");
    }
});

router.post("/email/remove", function (req, res) {
    let email_address = req.body.email;
    if (email_address) {
        setTimeout(async () => {
            let emails = database.prepare("SELECT * FROM emails WHERE email = ?").get([email_address]);
            if (emails.length > 0) {
                database.prepare("DELETE FROM emails WHERE email = ?").run([email_address]);
                res.send("deleted");
            } else {
                res.send("this email doesn't exist in the database.");
            }
        }, 3000);
    } else {
        res.send("error");
    }
});

module.exports = router;