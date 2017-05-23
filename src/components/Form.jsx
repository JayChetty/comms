import React, { Component } from 'react';
import './Form.css'
import TextField from 'material-ui/TextField';
// import logo from './logo.svg';

// import { connect } from 'react-redux'
// import {
//   Link,
// } from 'react-router-dom'


export default function Form( { form, submission, onFormChange, isCurrentUser } ) {

  if(!submission && isCurrentUser){//setup form from default
    Object.keys(form.default).forEach((formKey)=>{
      onFormChange(form.default[formKey], formKey)
    })
  }

  const dataSource = submission || form.default
  // // const events = props.events
  const formListItems = Object.keys(dataSource).map((formKey)=>{
    // return ( <li key={formKey}> { formKey } </li> )
    // dataSource[formKey]
    // let input = null
    // if(isCurrentUser){
    //   input = <input onChange={ (event)=>onFormChange(event.target.value, formKey) } value={dataSource[formKey]} name={formKey} type='number' className="Form-input"/>
    // }else{
    //   input = <input readOnly value={dataSource[formKey]} name={formKey} type='number' className="Form-input"/>
    // }
    return(
      // <div className="Form-listitem">
      //   <label className="Form-label" key={formKey} for={formKey}> {formKey}</label>
      //   { input }
      // </div>
      <div className="Form-listitem">
        <TextField
           onChange={ (event)=>onFormChange(event.target.value, formKey) }
           name={formKey}
           hintText={formKey}
           floatingLabelText={formKey}
           type="number"
           value={dataSource[formKey]}
           disabled={!isCurrentUser}
        />
      </div>
    )
  })

  return (
    <form>
      { formListItems }
    </form>
  );
}
