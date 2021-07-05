const router = require("express").Router();
const sqlite3 = require('sqlite3').verbose();

function open_database(path) {
    return new sqlite3.Database(path, (error) => {
        if (error) {
            return console.error(error.message);
        }
    });
}

function database_query(sql, params=[]) {
    let database = open_database(process.env.database_dir);
    return new Promise(function (resolve, reject) {
       database.all(sql, params, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
       });
    });
}


router.post("/email/add", function (req, res) {
    let email_address = req.body.email;
    if (email_address) {
        setTimeout(async () => {
            let emails = await database_query("SELECT * FROM emails WHERE email = ?", [email_address]);
            if (emails) {
                res.send("already added");
            } else {
                await database_query("INSERT INTO emails(email, valid) VALUES(?,?)", [email_address, 1]);
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
            let emails = await database_query("SELECT * FROM emails WHERE email = ?", [email_address]);
            if (emails) {
                await database_query("DELETE FROM emails WHERE email = ?", [email_address]);
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