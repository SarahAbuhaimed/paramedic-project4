import React, { Component } from 'react'
import {Card, CardBody} from 'reactstrap'
import ReactMap from './ReactMap'

export default class Edit extends Component {

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(this.props.cases)
    let fcase = this.props.cases.filter((c)=>c._id === urlParams.get('id'))
    // debugger
    console.log('meeeeeee',fcase[0]);
let name;
let description;
let agerange;
let location;
    if (fcase.length !== 0){
name = fcase[0].name
description = fcase[0].description
agerange = fcase[0].age_range
location = fcase[0].location[0]
    } 
    return (
        
        <div className="container-fluid">
<head><link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css' rel='stylesheet' /></head>
        <div className="space " >
        <div  className="in" style={{ width: '40rem'}}>
      
        <Card  >
      <CardBody  >
       <h4>{name} </h4> 
       <hr/>
       <h6>Description:</h6> 
       <p>{description}</p>
       <h6>Age range:</h6> 
 <p>{agerange}</p>
 <h6>Location:</h6> 
<ReactMap loc={location}/>
</CardBody>
</Card>
</div>
      </div>
      </div>
       )
     
         }
       }