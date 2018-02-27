const SpotModel = require('../MODELS/MYSQL/spotModel');
function SpotController(){
    this.createSpot = function(req, res){
        try{
            SpotModel.insertSpot(req.body, function(spot){
                res.json(spot);
            });
        }catch(e){
            throw e;
        }
    }    
    this.deleteSpot = function(req, res){
        var id = req.params.id;
        SpotModel.deleteSpot(id, function(deletedSpot){
            res.send(deletedSpot+ " Affected rows")
        });
    }    
    this.updateSpot = function(req, res){
        SpotModel.updateSpot(req.body, function(spot){
            res.json(spot);
        });      
    }    

    this.readSpot = function(req, res){
        var id = req.params.id;
        SpotModel.readSpot(id, function(spot){
            res.json(spot);
        });
    }

    this.readAllSpot = function(req, res){
        SpotModel.readAllSpot(function(spots){
            res.json(spots);
        });
    }
}

module.exports = new SpotController();