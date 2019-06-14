const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url='https://api.darksky.net/forecast/3ef561b05a04b9479b5d3884654c2f20/'+latitude+','+longitude+'?units=si'

request({url,json:true},(error,{body}) => {
    if(error){
        callback('Could not connect to weather services!',undefined)
    }
    else if(body.error){
        callback(body.error,undefined)
    }
    else{    
    callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees celsius out. The highest temperature today was '+body.daily.data[0].temperatureHigh+' and the lowest temperature today was '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain.')
    }
})
}

module.exports=forecast