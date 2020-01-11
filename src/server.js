const express = require('express')
const path = require ('path')
const utils = require('./utils')
const mongoose = require('mongoose')
const Weather = require('../models/weathermodel')
const hbs = require('hbs')

//wy43zmLaZoDmXDNW
const app = express()

mongoose.connect("mongodb+srv://Oleksii:wy43zmLaZoDmXDNW@cluster0-kfds6.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Connected to mongo db'))
.catch(()=>console.log('db is not connected')) 

app.set('view engine', 'hbs')

const publicDirectoryPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../views')
app.set('views', viewPath)
hbs.registerPartials(path.join(__dirname, '../views/partials'))

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index')
})


/*app.get('/weather', (req,res)=>{
    let city = req.query.city
    Weather.findOne({city:city}).then(cityWeather=>{
        if(cityWeather){
            res.json(cityWeather)
        }else{

            utils.getWeatherByCity(city, (error, data)=>{
                if (error){
                    res.sendStatus(500)
                }else{
                    const weather = new Weather(data)
                    weather.save()
                    res.json(weather)
                }
            })
        }
    })

})*/

app.get('/weather', (req,res)=>{
    let city = req.query.city
   
    Weather.findOne({city:city}).then(cityWeather=>{
        if(cityWeather){
            const weather = cityWeather
            res.render('show', {weather})
        }else{

            utils.getWeatherByCity(city, (error, data)=>{
                if (error){
                    res.sendStatus(500)
                }else{
                    const weather = new Weather(data)
                    weather.save()
                    res.render('show',{weather})
                }
            })
        }
    })

})
let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("server is listening on port 3000")
})