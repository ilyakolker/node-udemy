const request = require('request');

const googleKey = 'AIzaSyDhsUaxTgIw72Lr1Dyq2SqHPHYhEzmDAkQ';

var geocodeAddress = (address)=>{
    return new Promise((resolve,reject)=>{
        const addressEncode = encodeURIComponent(address)
        request({
            url : `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}&key=${googleKey}`,
            json : true
        },(error,response,body)=>{
            
                if(error){
                    reject('Unable to onect to google service');
            }else if(body.status === "ZERO_RESULTS"){
                    reject('Unable to find the address');
            }else if (body.status === "OK"){
                    resolve({
                    address : body.results[0].formatted_address,
                    Lat: body.results[0].geometry.location.lat,
                    Lng: body.results[0].geometry.location.lng
                })    
            }
        })
    }
    )};



geocodeAddress('nazaret illit').then((location)=>{
    console.log(JSON.stringify(location, undefined, 2));
},(errorMessage)=>{
    console.log(errorMessage);
});