const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a : {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help','h')
.argv;

geocode.geoCodeAddress(argv.address,(errorMessage,results) => {
    if(errorMessage){
        console.log(errorMessage)
    }else{
    //console.log(results.address);
    weather.getWeather(results.Lat, results.Lng, (errorMessage,weatherResults)=>{
    if(errorMessage){
        console.log(errorMessage)
    }else{
        console.log(`It'a currently ${weatherResults.temperature} degrees in ${results.address} and it's ${weatherResults.summary}`);
    }
});
    }
});

// lat, lng , callback






