const dbConfig = require("../register-config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.registers = require("./register-schema.model.js")(mongoose);

module.exports = db;
