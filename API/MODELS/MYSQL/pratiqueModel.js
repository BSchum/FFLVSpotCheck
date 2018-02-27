const db = require('../../HELPERS/database')

var PratiqueModel = function PratiqueModel(){
    this.insertPratique = function(pratique, sendPratiqueInserted){
        var insertPratiques = 'INSERT IGNORE INTO pratiques(name) VALUES (?)';
        var values = [ pratique.name ]
        db.connexion.query(insertPratiques,[values], function(err, result){
            if(err) throw err;
            pratique.id = result.insertId;
            sendPratiqueInserted(pratique);
        });
    }

    this.readPratique = function(id, sendPratique){
        var select = 'SELECT * from pratiques WHERE id='+id;
        db.connexion.query(select, function(err, result){
            if(err) throw err;
            sendPratique(result);
        });
    }

    this.readAllPratique = function(sendPratiques){
        var selectAll = 'SELECT * FROM pratiques';
        db.connexion.query(selectAll, function(err, result){
            if(err) throw err;
            sendPratiques(result);
        });
    }

    this.deletePratique = function(id, sendPratique){
        var deletePratique = 'DELETE FROM pratiques WHERE id='+id;
        db.connexion.query(deletePratique, function(err, result){
            if(err) throw err;
            console.log(result);
            sendPratique(result.affectedRows+' Affected rows');
        });
        
    }
    this.updatePratique = function(pratique, sendUpdated){
        var updateQuery = 'UPDATE pratiques SET name=? WHERE id=?'
        var values = [
            pratique.name,
            pratique.id
        ] 
        db.connexion.query(updateQuery, values,function(err, result, fields){
            if(err) throw err;
            sendUpdated(pratique);
        });
    }
    this.linkPratique = function(id, idpratique, sendLink){
        var insertLink = 'INSERT INTO spot_pratique(id_spot, id_pratique) VALUES (?)';
        var values = [id, idpratique];
        db.connexion.query(insertLink, [values], function(err, result){
            if(err) throw err;
            sendLink([result.insertId, id, idpratique]);
        });
    }
}

module.exports = new PratiqueModel();