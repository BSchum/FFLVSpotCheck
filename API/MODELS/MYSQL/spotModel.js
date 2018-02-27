const db = require('../../HELPERS/database')

var SpotModel = function SpotModel(){
    this.insertSpot = function(spot, sendSpotInserted){
        var insertSpotQuery = 'INSERT INTO spots(name, zip_code, structure, latitude, longitude, orientation) \
        VALUES (?)'
        var values = [
            spot.name,
            spot.zip_code,
            spot.structure,
            spot.latitude,
            spot.longitude,
            spot.orientation
        ] 
        db.connexion.query(insertSpotQuery,[values], function(err, result){
            if(err) throw err;
            spot.id = result.insertId;
            sendSpotInserted(spot);
        });
    }

    this.readSpot = function(id, sendSpotBack){
        var selectSpot = 'SELECT * FROM spots where id ='+id;
        db.connexion.query(selectSpot, function(err, result, fields){
            if(err) throw err;
            sendSpotBack(result);
        });
    }

    this.readAllSpot = function(sendSpots){
        var selectAll = 'SELECT * FROM spots';
        db.connexion.query(selectAll, function(err, result, fields){
            if(err) throw err;
            sendSpots(result);
        });
    }

    this.deleteSpot = function(id, sendAffectRows){
        var deleteQuery = 'DELETE FROM spots WHERE id='+id;
        db.connexion.query(deleteQuery, function(err, result, fields){
            if(err) throw err;
            sendAffectRows(result.affectedRows)
        });
    }

}

module.exports = new SpotModel();