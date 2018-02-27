const PratiqueModel = require('../MODELS/MYSQL/pratiqueModel');
function PratiqueController(){
    this.createPratique = function(req, res){
        PratiqueModel.insertPratique(req.body, function(pratique){
            res.json(pratique);
        });
    }
    this.getPratique = function(req, res){
        PratiqueModel.readPratique(req.params.id, function(pratique){
            res.json(pratique);
        });
    }
    this.getAllPratique = function(req, res){
        PratiqueModel.readAllPratique(function(pratique){
            res.json(pratique);
        });
    }
    this.deletePratique = function(req, res){
        PratiqueModel.deletePratique( req.params.id, function(pratique){
            res.json(pratique);
        });
    }

    this.linkSpotPratique = function(req, res){
        PratiqueModel.linkPratique(req.body.id, req.body.idpratique, function(link){
            res.json(link);
        });
    }
}

module.exports = new PratiqueController();