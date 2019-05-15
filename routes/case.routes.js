const express = require('express');
const Case = require('../models/case')
const router = require('express').Router()

//Case INDEX
router.get('/', (req, res)=>{
  Case.find({})
  .then(cases => {
   if(cases.length < 1){
    return res.json({ cases : cases, message : 'nothing found'})
   }
   res.status(200).json({ cases : cases})
  })
  .catch(err => {
   res.send({ message : err})
  })
  
})


router.post('/', (req, res)=>{
  let data = {
    name : req.body.name,
    description: req.body.description,
    age_range: req.body.age_range,
    location: req.body.location,
    new: req.body.new
  }
  
  let cases = new Case(data)
  cases.save()
  .then(()=> {
    console.log("yes working")
   res.status(200).json({ cases : cases, message: "saved"})
  })
  .catch(err => {
    console.log("err")
   res.status(201).json({ message : err})
  })
})

  //case Edit
  router.put('/:indexOfCasesArray/edit', (req, res) => {
    console.log(req.params.indexOfCasesArray);
    Case.findByIdAndUpdate(req.params.indexOfCasesArray,{ new: false } )
    .then((cas)=> {
        res.json({cas})
      }).catch()
  })


module.exports = router