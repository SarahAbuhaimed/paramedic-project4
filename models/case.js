const mongoose = require('mongoose')
const Schema = mongoose.Schema

const caseSchema = new Schema({
    name : { type: String, required: true},
    description : { type: String, required: true},
    age_range:{ type: String}, //string 25 - 30
    location: { type: [Number], index: { type: '2dsphere', sparse: true}},
    new: {type: String}
},{timestamps : true})

const Case = mongoose.model('Case', caseSchema)
module.exports = Case