import React from 'react'
import {Input, Button,Label,FormGroup,Container} from 'reactstrap'
// import { getAuth } from '../services/auth';

class Add extends React.Component {

  render(){
    return (
      <div>
        <Container>
      <FormGroup>
      <h2 className="d-flex justify-content-center space">Add New Case</h2>
      <Label for="exampleCase" sm={2}><b>Case Name</b> </Label>
           <Input name="casename" onChange={this.props.change} className="badge-pill"/>
      </FormGroup>
      <FormGroup>
           <Label for="exampleDesc" sm={2}><b>Description</b> </Label>
           <Input name="description" onChange={this.props.change} className="badge-pill"/>
           </FormGroup>
           <FormGroup>
           <Label for="exampleAge" sm={2}><b>Age Range</b> </Label>
           <Input name="agerange" onChange={this.props.change} className="badge-pill"/>
           </FormGroup>
           <FormGroup>
           <Label for="exampleLocation" sm={2}><b>Location</b> </Label>
           <Input name="location" onChange={this.props.change} className="badge-pill"/>
           </FormGroup>
           {/* <Input name="new" onChange={this.props.change} type="hidden"/> */}
           {/* <Input name="new" type="hidden" value="true"/> */}
          <Button href="/adminhome" onClick={this.props.add} block className="btn badge-pill badge-info"><b>Add Case</b></Button>
          
          </Container>
      </div>
    )
  }
}
export default Add;