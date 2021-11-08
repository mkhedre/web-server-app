const request = require('request')

const geocode =(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWtoZWRyZSIsImEiOiJja3ZsZngxcDcwMGxhMnZyMjRzZHNxNmkzIn0.rO35J26tphUor-g9CjEnjA&limit=1'
    request({url, json :true},(error,{body})=>{
        if(error){
            callback('un able to connect internet',undefined)
        }else if(body.features.length === 0){
            callback('cant find this location , try again',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode