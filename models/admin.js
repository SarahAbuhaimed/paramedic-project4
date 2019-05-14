const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const adminSchema = new Schema({
 name : { type: String, required: true, unique : true},
 email : { type: String, required: true, unique : true},
 password : { type: String, required: true},
 isadmin: {type: Boolean, default: false},
 age : { type: Number, required: true, default:0},
 field: { type: String, required: true, default:"null"},
 licence : { type: Number, required: true, default:0},
 case : [{ type: Schema.Types.ObjectId, ref : 'Case'}]
},{timestamps : true})

adminSchema.pre('save',function(next){
    let user = this
    if(user.password && user.isModified('password')){    
      bcrypt.hash(user.password, saltRounds, (err, hash)=>{
        if(err){ return next()}
        user.password = hash
        next()
      })
    }
})

adminSchema.methods.verifyPassword = (plainPassword, hashedPassword, cb) => {
 bcrypt.compare(plainPassword, hashedPassword, (err, response) => {
   if(err) { 
     return cb(err) 
   }
   return cb(null, response)
 })
}

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin