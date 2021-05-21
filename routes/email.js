const router = require("express").Router();
const sqlite3 = require('sqlite3').verbose();

function open_database(path) {
    return new sqlite3.Database(path, (error) => {
        if (error) {
            return console.error(error.message);
        }
    });
}


router.post("/email/add", function (req, res) {
    let email_address = req.body.email;
    if (email_address) {
        let database = open_database(process.env.database_dir);
        setTimeout(() => {
            database.get("SELECT * FROM emails WHERE email = ?", [email_address], function (err, rows){
                if (rows) {
                    res.send("already added");
                    database.close();
                } else if (err) {
                    console.log(err);
                    res.send("error");
                    database.close();
                } else {
                    database.get("INSERT INTO emails(email, valid) VALUES(?,?)", [email_address, 1], function (err) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                            database.close();
                        } else {
                            res.send("done");
                            database.close();
                        }
                    });
                }
            });
        }, 3000);
    } else {
        res.send("error");
    }
});

router.post("/email/remove", function (req, res) {
    let email_address = req.body.email;
    if (email_address) {
        let database = open_database(process.env.database_dir);
        setTimeout(() => {
            database.run("DELETE FROM emails WHERE email = ?", [email_address], function (err) {
                if (err) {
                    console.log(err);
                    res.send("error");
                    database.close();
                } else {
                    res.send("done");
                    database.close();
                }
            });
        }, 3000);
    } else {
        res.send("error");
    }
});

module.exports = router;