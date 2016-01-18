'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('msg.db');

module.exports = {
    save: function save(sender, msg, cb) {
        var ts = new Date().getTime();
        db.serialize(function saveMsg() {
            db.run('CREATE TABLE if not exists msgs (ts INT, user TEXT, text TEXT)');
            db.run('INSERT INTO msgs VALUES (?, ?, ?)', [ts, sender, msg]);
        }, cb);
    },
    load: function load(numMsg, cb) {
        db.serialize(function saveMsg() {
            db.all('SELECT * FROM msgs ORDER BY id DESC LIMIT 10', cb);
        });
    }
};

