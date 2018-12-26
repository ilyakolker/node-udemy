const yargs = require('yargs');
const axios = require('axios');

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

const googleKey = 'AIzaSyDhsUaxTgIw72Lr1Dyq2SqHPHYhEzmDAkQ';
const addressEncode = encodeURIComponent(argv.address);
var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}&key=${googleKey}`;

axios.get(geoUrl).then((response)=>{
    if (response.data.status === 'ZERO_RESULTS' ) {
        throw new Error('Unable to find that address')
    }
    var lat =  response.data.results[0].geometry.location.lat;
    var lng =  response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/2eedef4328bd50de74faa93b1092f1a6/${lat},${lng}?units=si`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var summary = response.data.currently.summary;
    console.log(`it's currenatly ${temperature} and it's ${summary}`)
}).catch((e)=>{
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to conect to API servers');    
    }else{
        console.log(e.message);
    }
});



