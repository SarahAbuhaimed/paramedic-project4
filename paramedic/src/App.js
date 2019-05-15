import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Home from './components/Home'
import Add from './components/Add'
import AdminHome from './components/AdminHome'
import ShowCase from './components/ShowCase'
import Login from './components/Login';
import Register from './components/Register';
import Paramedic from './components/Paramedic';
import Edit from './components/Edit';

import { getToken, setToken, logout, getAuth} from './services/auth'
import jwt_decode from 'jwt-decode'
import {
  Alert
} from 'reactstrap';
// import Add from './components/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPhone,faEnvelope,faMap} from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  // withRouter
} from "react-router-dom";
// import { debug } from 'util';


let header = {
  headers :{
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${getToken()}`
  }
}


class App extends Component {

  state = {
    cases : [],
    user : "",
    errorMsg : '',
    editid:'',
    isAuthenticated : false,
    hasError : false
  }

changeHandler = (e) => {
  let data = {...this.state}
  data[e.target.name] = e.target.value
  this.setState(data)
}

loginHandler = (e)=>{
  console.log("login")
  axios.post('http://localhost:3001/paramedics/login',{ email: this.state.email, password: this.state.password})
  .then( response => {
    console.log(response)
   // if(response.data.token){
      setToken(response.data.token)
      let data = {...this.state}
      data.user = response.data.paramedic
      data.isAuthenticated = true
      data.hasError = false

      this.setState(data)
      

   // }
  })
  .catch(err =>{
    console.log("loginHandler ",err)
    
  })
}
  
  getCases = () =>{
    axios.get('/cases', header)
    .then(response => {
      if(response.data.cases.length > 0){
        let data = {...this.state}
        data.cases = response.data.cases
        this.setState(data)
      }
    })
    .catch((error) => {
       console.log('getCases',error.response);
        
      })
  }

  submitHandler = (e) => {   
    console.log(getToken())
    axios.post('/cases',{ 
    name : this.state.casename,
    description : this.state.description,
    age_range : this.state.agerange,
    location : [this.state.location, this.state.location ],
    new: true
    }, header)
      .then( response => {
        console.log(response)
      let data = {...this.state}
      data.cases.push(response.data.cases)
      this.setState(data)
      })
      .catch(err=>{
        console.log("submitHandler",err);
        
      })
  }
//edit fuction to turn case.new from true to false
  caseNewHandler = (id) => { 
    // console.log("****",id);
    axios.put(`/cases/${id}/edit`,{ 
    new: "false"
    }, header)
      .then( response => {
      let data = {...this.state}
      data.editid = id
      data.cases.forEach((c)=>{
        if (c.id === id) {c.new = "false"}
      })
  
      this.setState(data)
      window.location.href = `/edit?id=${id}`
      })
      .catch(err =>{
        console.log("caseNewHandler",err);
        
      })
  }

  logout = () =>{
    logout()
    let data = {...this.state}
    data.isAuthenticated = false
    data.user = ""
    data.email = ""
    data.password = ""
   // data.cases =[]
    this.setState(data)
  }

//get year for footer 
    getYear() {
    return new Date().getFullYear();
}
 //register post save information
registerHandler =()=>{
axios.post('http://localhost:3000/paramedics/Register',{
  name : this.state.name,
  email : this.state.email,
  password : this.state.password,
  age : this.state.age,
  field: this.state.field,
  licence : this.state.licence,
new:true
})
.then( response => { 
  console.log("register res",response)
  if(response.data.token){
    setToken(response.data.token)
    let data = {...this.state}
    data.user = response.data.paramedic
    data.isAuthenticated = true
    data.hasError = false
    this.setState(data)
    
  }
})
.catch((ee) => {
  console.log("registerHandler",ee)
  console.log("line 109")
})
}

componentDidMount(){

  if(getToken()){
    var decoded = jwt_decode(getToken());
    let data = {...this.state}
    data.user = decoded
    data.isAuthenticated = true
    this.setState(data)
    console.log(decoded)
    this.getCases()
  }
}

  render() {

 const auth = !this.state.isAuthenticated;
 const admin = this.state.user.isadmin;
 //logout button show only when user logged in
 const Logout = (this.state.isAuthenticated) ? <button onClick={this.logout} className="btn btn-link" style={{color: 'white'}}><p className="App-link">Logout</p></button>: null
//case page button ,in admin case go to admin home, in paramedic go to paramedic page
 const cass = (this.state.user.isadmin === true) ? <Link to='/adminhome' className="App-link ">Cases</Link>: (this.state.user.isadmin === false) ?<Link to='/paramedic' className="App-link ">Paramedic</Link>:null
 return (
      
      <Router> 
      <div>
        {/* Header */}
      <div >
      <header className=" App-header navbar navbar-expand-lg " >
        <a href="/Home"><img src="https://i.imgur.com/PV9nYTP.png" alt=""/></a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
      <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <Link to="/Home" className="App-link ">Home</Link>
        </li>
        <li className="nav-item active spacelink">
       {cass}
        </li>
       
      </ul>
        <ul className="navbar-nav row">
        <li className="App-link">{this.state.user.name} </li>
          <li className="App-link"><Link to="/Home" > {Logout}</Link></li> 
        </ul>
        </div>
       </header>
       <Alert color="danger" isOpen={this.state.hasError} toggle={this.onDismiss} fade={false}>{this.state.errorMsg}</Alert>
   </div>
     
     {/* Route Components */}
      <Switch>
      <Route exact path="/" component={Home} />
       <Route exact path="/Login" render={ (props) => auth? <Login {...props} change={this.changeHandler} login={this.loginHandler} /> : ((admin === true)?
       <Redirect to="/adminhome"  /> : <Redirect to="/paramedic"  />) }/>
       <Route exact path="/Home" component={Home} />
       <Route exact path="/edit" render={(props) => <Edit {...props} id={this.state.editid} cases={this.state.cases} />} />
       <Route exact path="/register" render={props =><Register {...props}  change={this.changeHandler} register={this.registerHandler} />} />
       <Route exact path="/add" render={props => <Add {...props} getauth={getAuth()} change={this.changeHandler} add={this.submitHandler} /> }/>
       <Route exact path="/adminhome" render={(props) => <AdminHome {...props} cases={this.state.cases} admin={admin}/> }/>
       <Route exact path="/paramedic" render={(props) => <Paramedic {...props} cases={this.state.cases} admin={admin} idcas={this.caseNewHandler}/> }/>
       <Route exact path="/cases" render={(props) => <ShowCase {...props} cases={this.state.cases}  getcase={this.getCases}  admin={admin} /*idcas={this.caseNewHandler}*/ />} />
       </Switch>
      </div> 

      {/* Footer */}
      
<footer className="page-footer font-small cyan darken-3 fixed-bottom">
  <div className="container">
<br/>
<h5>What we have done for ourselves alone dies with us,
  what we have done for others and the world remains and is immortal.</h5>
 
        <div className="container d-flex justify-content-center">
   <div className="justify-content-space-between">
   
<FontAwesomeIcon icon={faPhone} />{' '}
<FontAwesomeIcon icon={faEnvelope}/>{' '}
<FontAwesomeIcon icon={faMap}/>
   </div>
</div>
</div>
  <div className="footer-copyright text-center py-3">© {this.getYear()} Copyright:
    <a href="https://github.com/SarahAbuhaimed" className="cent">Sarah Abuhaimed</a>
  </div>
</footer>
      </Router>
    )
  }
}

export default App;
