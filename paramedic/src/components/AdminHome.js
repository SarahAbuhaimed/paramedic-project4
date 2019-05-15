import React from 'react';

import ShowCase from './ShowCase';

const AdminHome =(props) =>{
 
    return (
      <div className="space spacelink">
        <a href="Add"  className="btn badge-pill badge-info"><b>Add new case</b></a>
     <ShowCase cases={props.cases} admin={props.admin} />
      </div>
    )
  
}
export default AdminHome;