import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { connect } from 'react-redux'
// import {
//   Link,
// } from 'react-router-dom'


export default function Form( { form, submission } ) {
  console.log("form", submission)
  const dataSource = submission || form.default
  // // const events = props.events
  const formListItems = Object.keys(dataSource).map((formKey)=>{
    // return ( <li key={formKey}> { formKey } </li> )
    dataSource[formKey]
    return(
      <label key={formKey}>
        {formKey}:
        <input value={dataSource[formKey]} name={formKey} type='text'/>
      </label>
    )
  })

  return (
    <form>
      { formListItems }
    </form>
  );
}
