const Paramedic = require('../models/admin');
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportHelper = require('../config/passport')


router.get('/', (request, response, next) => {
  //custom jwt authenticate
  passport.authenticate('jwt', {session: false}, (err, paramedic, info)=>{
      console.log("got here")
      if(err){ return response.status(400).json({ message: err }) }

      if(info !== undefined){
        return response.json({ message: info.message })
      }else{
        User.find({})
        .then((user)=>{
          response.json({ user: user });
        })
      }
      
  })(request, response, next)  
})

router.post('/register', (request, response)=>{
  let data = {
    name: request.body.name,
    email : request.body.email,
    password: request.body.password ,
    age : request.body.age ,
    field:request.body.field,
    licence: request.body.licence
  }

  let paramedic = new Paramedic(data)
  
  paramedic.save()
  .then(()=> {
    response.status(200).json({ message : "Registered Successfully" })
  })
  .catch(err =>{
    response.status(401).json({ message : "You are not Allowed to Register"})
  })
})


router.post('/login', (request, response) => {
  console.log("in login")
  passport.authenticate('local', {session: false}, (err, paramedic, info) => {
    if (err || !paramedic) {
        return response.status(401).json({
            message: info ? info.message : 'Login failed',
            paramedic   : paramedic
        });
    }
   request.login(paramedic, {session: false}, (err) => {
          if (err) {
              return response.status(401).json({message: err});
          }
          // generate a signed json web token with the contents of paramedic object and return it in the response
          paramedic.password = '' //remove password
          console.log(paramedic)
          const token = jwt.sign(paramedic.toJSON(), 'your_jwt_secret', { expiresIn: 60 * 60 });
          return response.status(200).json({paramedic, token});
        });
    })(request, response);
   
})


module.exports = router
