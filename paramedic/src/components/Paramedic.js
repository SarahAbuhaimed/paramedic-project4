import React from 'react'

import ShowCase from './ShowCase';

const Paramedic  =(props)=> {
  
    return (
      <div>
       <ShowCase cases={props.cases} admin={props.admin} idcas={props.idcas} />
      </div>
    )
  
}
export default Paramedic;