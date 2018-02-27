const dotenv = require('dotenv');
const mongoose = require('mongoose');
const MySQL = require('mysql');
dotenv.config();

var Database = class Database {

    static MongoDBConnexion(){
        mongoose.connect(
            'mongodb://'+ process.env.MongoDB_HOST 
            +':' + process.env.MongoDB_PORT +'/' 
            + process.env.MongoDB_NAME
        );
    }
    
    static MySQLConnexion(){
        var connexion = MySQL.createConnection({
            host: process.env.MySQL_HOST,
            port: process.env.MySQL_PORT,
            database: process.env.MySQL_NAME,
            user: process.env.MySQL_USER,
            password: process.env.MySQL_PWD
        });

        Database.connexion = connexion;
        Database.connexion.connect(function(err){
            if (err) throw err;
            console.log("Connected");
        });
    }
}
module.exports = Database;

