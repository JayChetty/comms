import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import './Events.css'
import {
  Link,
} from 'react-router-dom'


export default function Events( { group, events, groupId } ) {
  console.log("rendering events prop events", events, group, groupId)
  // const events = props.events
  const eventListItems = events.map((event)=>{
    return ( <li key={event.id}> <Link to={`${groupId}/events/${event.id}`}> {event.name} </Link> </li> )
  })

  return (
    <div className="Events">
      <ul>
        { eventListItems }
      </ul>
    </div>
  );
}


// const mapStateToProps = state => state
//
// const mapDispatchToProps = (dispatch)=>{
//   return { dispatch: dispatch }
// }
//
// export default connect( mapStateToProps, mapDispatchToProps )( Events )
