import React, { Component } from 'react';
// import logo from './logo.svg';

// import { connect } from 'react-redux'
// import {
//   Link,
// } from 'react-router-dom'


export default function Form( { form, submission, onFormChange, isCurrentUser } ) {
  console.log("form", submission)
  if(!submission && isCurrentUser){//setup form from default
    Object.keys(form.default).forEach((formKey)=>{
      onFormChange(form.default[formKey], formKey)
    })
  }
  const dataSource = submission || form.default
  // // const events = props.events
  const formListItems = Object.keys(dataSource).map((formKey)=>{
    // return ( <li key={formKey}> { formKey } </li> )
    dataSource[formKey]
    let input = null
    if(isCurrentUser){
      input = <input onChange={ (event)=>onFormChange(event.target.value, formKey) } value={dataSource[formKey]} name={formKey} type='text'/>
    }else{
      input = <input readOnly value={dataSource[formKey]} name={formKey} type='text'/>
    }
    return(
      <label key={formKey}>
        {formKey}:
        { input }
      </label>
    )
  })

  return (
    <form>
      { formListItems }
    </form>
  );
}
