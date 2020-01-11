const request = require('request')

function getLocationCoords(city, callback){
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoib2xla3NpeXBvbHlhbm92c2t5eSIsImEiOiJjazRkMzFkYmcwdHdpM3BwOHVmbTRtMTByIn0.ND0RA7cOs6h2oAz0dmN2jA`
    request({url:url, json:true},(error, response)=>{
        if (error){
            callback("Connection error")
        }
        else if (response.statusCode !== 200){
            callback("Geocoding API error!")
        }
        else{
            let coordinates = response.body.features[0].geometry.coordinates
            let lon = coordinates[0]
            let alt = coordinates[1]
            callback(undefined, [lon, alt])
        }
    })
}

function getWeatherByCoords(coords, callback){
    let url = `https://api.darksky.net/forecast/18031f54577c3519569219fb6bef85ad/${coords[0]},${coords[1]}?units=si`
    request({url:url, json:true},(error, response)=>{
        const currentlyWeatherInfo = response.body.currently;

        if (error){
            callback("Connection error")
        }
        else if (response.statusCode !== 200){
            callback("Weather API error!")
        }
        else{
            callback(undefined, currentlyWeatherInfo);
        }
    })
}

function getWeatherByCity (city, callback){
    getLocationCoords(city, (error, data)=>{
        if (error){
            callback(error)
        }
        else{
            
            getWeatherByCoords(data, (error, data)=>{
                if (error){
                    callback(error)
                }
                else{
                    const currentlyWeather = data.summary;
                    const currentlyTemperature = data.temperature;
                    const currentlyWindSpeed = data.windSpeed;
                    const weather = {
                        city: city,
                        summary:currentlyWeather, 
                        temperature:currentlyTemperature,
                        wind:currentlyWindSpeed
                    }
                   callback(undefined, weather)
                }
            })
        }
    })
}

module.exports = {getLocationCoords, getWeatherByCoords, getWeatherByCity}