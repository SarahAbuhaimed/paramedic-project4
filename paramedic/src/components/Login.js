import React from 'react'
import { Input, Col, FormGroup, Label, Button} from 'reactstrap'
import {
  BrowserRouter as Router

} from 'react-router-dom';

const Login = (props) => {

  return (
    < >
    <Col sm={3} md={4} className="mx-auto space ">
     <FormGroup>
          <Label for="exampleEmail" sm={2}><b>Email</b> </Label>
        <Input name="email" onChange={props.change} className="badge-pill"/>
     </FormGroup>
     <FormGroup>
          <Label for="exampleEmail" sm={2}><b>Password</b> </Label>
          <Input name="password" type="password" onChange={props.change}  className="badge-pill"/>
      </FormGroup>
      <Button onClick={props.login} className="btn  badge-pill badge-info" size="lg" block><b>Login</b></Button>
      <Router>
      <a href="/Register"><b>Register</b> </a>
      </Router>
     </Col>
    </>
  )
}

export default Login