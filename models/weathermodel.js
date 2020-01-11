const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
    city:{type:String, required:true},
    summary:{type:String, required:true}, 
    temperature:{type:String, required:true},
    wind:{type:String, required:true}
})

module.exports = mongoose.model('Weather', weatherSchema)