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
var geoUrl = `https://mapsgoogleapis.com/maps/api/geocode/json?address=${addressEncode}&key=${googleKey}`;

axios.get(geoUrl).then((response)=>{
    console.log(response.data);
}).catch((e)=>{
    console.log(e);
});



