const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5lZXNoMjIiLCJhIjoiY2p2ZHczNjczMjRlYTN5bjNyMGp3anR2dCJ9.Qf2Ym4wyGNubhP0qWPQnng&limit=1'
    request({url //shorthand syntax
        , json: true},(error,{body} //destructured response
            )=>{
        if(error){
            callback('Unable to connect to geocoding services!',undefined)
        }
        else if(body.features.length===0){
            callback('No location found, try a different location!',undefined)
        }
        else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }        
    })
}

module.exports=geocode