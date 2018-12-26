const request = require('request');

const googleKey = 'AIzaSyDhsUaxTgIw72Lr1Dyq2SqHPHYhEzmDAkQ';

const geoCodeAddress = (address, callbak) => {
const addressEncode = encodeURIComponent(address)
request({
    url : `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}&key=${googleKey}`,
    json : true
},(error,response,body)=>{
    if(error){
        callbak('Unable to onect to google service');
    }else if(body.status === "ZERO_RESULTS"){
        callbak('Unable to find the address');
    }else if (body.status === "OK"){
        callbak(undefined,{
            address : body.results[0].formatted_address,
            Lat: body.results[0].geometry.location.lat,
            Lng: body.results[0].geometry.location.lng
        })    
    }
})
}

module.exports = {
    geoCodeAddress
}