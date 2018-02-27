const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const db = require('./API/HELPERS/database');
const spotcontroller = require('./API/CONTROLLERS/spotcontroller');
dotenv.config();


db.MongoDBConnexion();
db.MySQLConnexion();
app.use(bodyparser.json());
app.use('/api', require('./API'))
app.get('/', function(req, res){
    res.json({
        'message':'Welcome to FFLV REST API for site'
    });
});

app.listen(process.env.PORT, function(){
    console.log('Server listening on port '+process.env.PORT)
});
