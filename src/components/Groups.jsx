import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'

import {
  Link,
} from 'react-router-dom'


function Groups(props){
  return(
    <div>Hello</div>
  )
}

function Groups( props ) {
  console.log("rendering groups props", props)
  if(!props.groups){
    return ( <div> Fetching...</div> )
  }
  console.log("rendering groups props", props)
  const groups = props.groups
  const groupListItems = Object.keys(groups).map((key)=>{
    return ( <li key={key}> <Link to={`/groups/${key}`}> {key} </Link> </li> )
  })
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Comms</h2>
      </div>
      <ul>
        { groupListItems }
      </ul>
    </div>
  );
}


const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Groups )
