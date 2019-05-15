import React from 'react'
import { Input, Col, FormGroup, Label, Button} from 'reactstrap'
import {
    BrowserRouter as Router
  } from 'react-router-dom';

const Register =(props) =>{
    return (
      <div>
              <br/>
           <>       
    <Col sm={3} md={4} className="mx-auto">
    <FormGroup>
          <Label for="exampleName" sm={2}>Name</Label>
        <Input name="name" onChange={props.change} className="badge-pill"/>
     </FormGroup>
     <FormGroup>
          <Label for="exampleEmail" sm={2}>Email</Label>
        <Input name="email" onChange={props.change} className="badge-pill"/>
     </FormGroup>
     <FormGroup>
          <Label for="examplePassword" sm={2}>Password</Label>
          <Input name="password" type="password" onChange={props.change} className="badge-pill"/>
      </FormGroup>
     <FormGroup>

          <Label for="exampleAge" sm={2}>Age</Label>
        <Input name="age" onChange={props.change} className="badge-pill" />
     </FormGroup>
     <FormGroup>
          <Label for="exampleField" sm={2}>Field</Label>
        <Input name="field" onChange={props.change} className="badge-pill"/>
     </FormGroup>
     <FormGroup>
          <Label for="exampleLicence" sm={4}>Licence Number</Label>
        <Input name="licence" onChange={props.change} className="badge-pill"/>
     </FormGroup>
     
      <Button onClick={props.register} className="btn badge-pill badge-info" size="lg" block><a href="/login" className="App-link">Register</a>  </Button>
      <Router>
      <a href="/Login">Login</a>
      </Router>
     </Col>
    </>
      </div>
    )
}
export default Register;