const request=require('request')
const forecast =(latitude,longitude , callback)=>{
    const url =`http://api.weatherstack.com/current?access_key=3152696f60ada9bf86305de09b27c082&query=${latitude},${longitude}&units=m`
    request({url ,json :true},(error,{body})=>{
        if(error){
            callback('un able to connect internet',undefined)
        }else if(body.error){
            callback('cant find this weather , try again',undefined)
        }else{
            callback(undefined, 
                `its currently ${body.current.temperature} degrees out . there ie a ${body.current.precip}% chance of a rain`    
            )
        }
    })
    
}
module.exports = forecast