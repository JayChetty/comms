import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Events extends Component {
  render() {
    console.log("prop events", this.props.events)
    const events = this.props.events
    const eventListItems = Object.keys(events).map((key)=>{
      return ( <li key={key}> {events[key].name} </li> )
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
}

export default Events;
