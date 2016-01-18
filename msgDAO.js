'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('msg.db');

module.exports = {
    save: function save(sender, msg, cb) {
        db.serialize(function saveMsg() {
            db.run('CREATE TABLE if not exists msgs (id INTEGER PRIMARY KEY, ts DATETIME DEFAULT CURRENT_TIMESTAMP, user TEXT, text TEXT)');
            db.run('INSERT INTO msgs(user, text) VALUES (?, ?)', [sender, msg]);
        }, cb);
    },
    load: function load(numMsg, cb) {
        db.serialize(function saveMsg() {
            db.all('SELECT * FROM msgs ORDER BY id DESC LIMIT 10', cb);
        });
    }
};

