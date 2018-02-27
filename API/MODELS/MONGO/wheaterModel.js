const mongoose = require('mongoose');


var WeatherModel = mongoose.Schema({
    spotid: Number,
    name: String,
    weather: String,
    windspeed: Number,
    winddirection: Number,
    isFlyable: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', WeatherModel);