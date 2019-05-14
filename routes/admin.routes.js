const Admin = require('../models/admin');
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/', (request, response)=>{
  Admin.find()
  .then(admins => {
   response.send({admins})
  }).catch(err => {
   response.send({message : err})
  })
  
})
router.post('/', (request, response)=>{
  let data ={
    name: request.body.name,
    email : request.body.email,
    password: request.body.password ,
    age : request.body.age,
    isadmin : request.body.isadmin,
    field:request.body.field,
    licence: request.body.licence
  }

  console.log(data)
  let admin = new Admin(data)
  
  admin.save().then(admin => {
   response.send({admin})
  }).catch(err => {
   response.send({message : err})
  })
  
})
module.exports = router