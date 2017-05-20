import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import {
  Link,
} from 'react-router-dom'


function Events( props ) {
  console.log("rendering events prop events", props.events)
  const events = props.events
  const eventListItems = Object.keys(events).map((key)=>{
    return ( <li key={key}> <Link to={`/events/${key}`}> {events[key].name} </Link> </li> )
  })

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Comms</h2>
      </div>
      <ul>
        { eventListItems }
      </ul>
    </div>
  );
}


const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Events )
