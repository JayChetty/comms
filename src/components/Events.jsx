import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import './Events.css'
import {
  Link,
} from 'react-router-dom'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';


export default function Events( { group, events, groupId } ) {
  // const events = props.events
  const eventListItems = events.map((event)=>{
    return (
      <div key={event.id}>
        <ListItem primaryText={event.name}  containerElement={<Link to={`${groupId}/events/${event.id}`}/>} />
        <Divider/>
      </div>
    )
  })

  return (
    <List>
      { eventListItems }
    </List>
  );
}


// const mapStateToProps = state => state
//
// const mapDispatchToProps = (dispatch)=>{
//   return { dispatch: dispatch }
// }
//
// export default connect( mapStateToProps, mapDispatchToProps )( Events )
