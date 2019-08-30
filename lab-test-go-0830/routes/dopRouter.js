var express = require('express');
var router = express.Router();
var ibmdb = require("ibm_db");
var dsn = require('../DBconfig');


router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/readDB', (req, res, next) => {
    ibmdb.open(dsn, function (err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        // "select * from geotest where userid='321'"
        connection.query("select * from geotest", function (err1, readData) {
            if (err1) console.log(err1);
            else {
                res.render('showdata', { data: readData })
                // console.log(readData);
            }
            connection.close(function (err2) {
                if (err2) console.log(err2);
            });
        });
    });
});

router.post('/insertDB', (req, res, next) => {
    

});

module.exports = router;