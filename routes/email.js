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
    if (!req.body.email) {
        res.send("error");
    } else {
        let email_address = req.body.email;
        let database = open_database(process.env.database_dir);
        setTimeout(() => {
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
        }, 3000);
    }
});

router.post("/email/remove", function(req, res){
   let email_address = req.body.email;
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
});

module.exports = router;