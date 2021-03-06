const weatherModel = require('../MODELS/MONGO/wheaterModel');
const spotModel = require('../MODELS/MYSQL/spotModel');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config()

var CardinalPoint = {
    "N":[348.75,11.25],
    "NNE":[11.25, 33.75],
    "NE":[33.75,56.25],
    "ENE":[56.25,78.75],
    "E":[75.75,101.25],
    "ESE":[101.25,123.75],
    "SE":[123.75,146.25],
    "SSE":[146.25,168.75],
    "S":[168.75,191.25],
    "SSO":[191.25,213.75],
    "SO":[213.75,236.25],
    "OSO":[236.25,258.75],
    "O":[258.75,281.25],
    "ONO":[281.25,303.75],
    "NO":[303.75,326.25],
    "NNO":[326.25,348.75]
}

function WeatherController(){
    this.updateWeather= function(req,res){
        spotModel.readAllSpot(function(spots){
            var requestsCount = 0;
            spots.forEach(async function(spot){
                var url = "api.openweathermap.org";
                var options = {
                    host: url,
                    path: '/data/2.5/weather?lat='+spot.latitude+'&lon='+spot.longitude+'&appid='+process.env.OWM_ApiKey,
                    method: 'POST'
                  };
                await http.request(options, function(_res){
                    _res.setEncoding('utf8');
                    _res.on('data', function (chunk) {
                        console.log(chunk);
                        chunk = JSON.parse(chunk);
                        var isFlyable = CheckIfFlyable(spot, chunk);
                        var weather = new weatherModel({
                            spotid: spot.id,
                            name: spot.name,
                            weather: chunk.weather[0].main,
                            windspeed: chunk.wind.speed,
                            winddirection: chunk.wind.deg,
                            isFlyable: isFlyable
                        });
                        weather.save(function(err){
                            if(err) throw err;
                        });
                    });
                    _res.on('end', function(){
                        requestsCount+=1;
                        if(requestsCount == spots.length-1){
                            res.send("All requests performed : "+(requestsCount+1));
                        }
                    });
                }).end();
            });

        });
    }
    var CheckIfFlyable = function(spot, chunk){
        var orientations = spot.orientation.split(',');
        var isFlyable = false;
        orientations.forEach(function(orientation){
            var betweenN3 = 360 > chunk.wind.deg && CardinalPoint[orientation][0] < chunk.wind.deg;
            var betweenN0 = CardinalPoint[orientation][1] >= chunk.wind.deg && 0 < chunk.wind.deg;
            // Si la direction du vent se situe entre la fourche du point cardinal -> True
            if(orientation == "N" && (betweenN3 || betweenN0)){
                isFlyable = true;
            }
            else if(CardinalPoint[orientation][0] < chunk.wind.deg && CardinalPoint[orientation][1] > chunk.wind.deg){
                isFlyable = true;
            }
        });
        // Si le temps est propice 
        if(chunk.weather[0].id >= 800 && chunk.weather[0].id < 900){
            isFlyable = isFlyable && true;   
        }
        else{
            isFlyable = false;
        }
        // Si le vent n'est pas trop rapide
        if(chunk.wind.speed*3.6 < 35){
            isFlyable = isFlyable && true;
        }else{
            isFlyable = false;
        }
        return isFlyable;
    }
    this.getWeather =  function(req, res){
        weatherModel.find({spotid: req.params.id}).sort({date:-1}).exec(function(err, weather){
            if(err) throw err;
            res.json(weather);
        });
    }
    this.checkWeather =  function(req, res){
        weatherModel.findOne({spotid: req.params.id}).sort({date:-1}).exec(function(err, weather){
            if(err) throw err;
            res.send(weather.isFlyable ? "Oui" : "Non");
        });
    }
    this.checkWeatherByName =  function(req, res){
        weatherModel.findOne({name: req.body.name}).sort({date:-1}).exec(function(err, weather){
            if(err) throw err;
            res.send(weather.isFlyable ? "Oui" : "Non");
        });
    }
    this.getWeatherByName = function(req, res){
        weatherModel.find({name: req.body.name}).sort({date:-1}).exec(function(err, weather){
            if(err) throw err;
            res.send(weather);
        });
    }
    this.getWeathers = function(req, res){
        weatherModel.find({}).sort({date:-1}).exec(function(err, weathers){
            if(err) throw err;
            res.send(weathers);
        });
    }
}
module.exports = new WeatherController();