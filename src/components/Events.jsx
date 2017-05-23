import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import './Events.css'
import {
  Link,
} from 'react-router-dom'


export default function Events( { group, events, groupId } ) {
  // const events = props.events
  const eventListItems = events.map((event)=>{
    return ( <div className="Events-item" key={event.id}> <Link className="Events-link" to={`${groupId}/events/${event.id}`}> {event.name} </Link> </div> )
  })

  return (
    <div className="Events">
      { eventListItems }
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
