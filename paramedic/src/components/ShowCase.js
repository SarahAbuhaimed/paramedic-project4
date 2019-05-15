import React, { Component } from 'react'
import {Card, CardBody, Row } from 'reactstrap'


class ShowCase extends Component  {
render(){
  console.log("hi",this.props.cases);
  
//show only new cases
  const filtercase = this.props.cases.filter((c)=> {
    return c.new === "true"; })
//if user is admin show all cases else show only new cases
  const user = this.props.admin ? this.props.cases : filtercase;
  return (
    <div className="container-fluid">
   <Row className="space" >
    { user.map((cas) => 
     <div className={this.props.admin?(cas.new === "false" ? "in":"out"):"out"} key={cas._id}>
     <Card  id={cas._id} style={{ width: '18rem'}} >
      <CardBody >
        
        <p className="h5" >{cas.name}</p>
        <hr/>
        <p className="h6" >description:{cas.description}</p>
        <p className="h6" >age range:{cas.age_range}</p>
        <p className="h6">location:{cas.location[0]}</p>

        <button  onClick={()=>this.props.idcas(cas._id)} id={cas._id} className="btn btn-info " style={{display: this.props.admin ? 'none' : 'inline' }}>Accept</button>
    
      </CardBody>
      </Card>
      </div>
     )}
 </Row>
 </div>
  )

    }
  }

export default ShowCase;
