const request = require('request');

var getWeather = (lat,lng,callback) => {
    request({
        url : `https://api.darksky.net/forecast/2eedef4328bd50de74faa93b1092f1a6/${lat},${lng}?units=si`,
        json : true
        },  (error, response, body) => {
            
            if(!error && response.statusCode === 200 ){
                callback(undefined,{
                    temperature : Math.floor(body.currently.temperature),
                    summary : body.currently.summary
                })
            } else {
                callback('Unable to fetch weathere');
            }
                
    });
};



module.exports = {
    getWeather
}

// Formula from Fahrenheit to celsius (F - 32) * 5/9