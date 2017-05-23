import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events'
import AppHeader from './AppHeader.jsx'

function Group({group, events, id}){
  // console.log("Group id", id)
  const groupEvents = Object.keys(group.events).map( eventKey => {
    const event = events[eventKey]
    event.id = eventKey
    return event
  })
  // console.log("groupEvents", groupEvents)
  return (
    <div className="Group">
      <Events group={group} groupId={id} events={groupEvents}> </Events>
    </div>

  );
}

const mapStateToProps = (state, {match}) =>{
  const group = state.groups[match.params.groupId]
  const events = state.events
  const id = match.params.groupId
  // console.log("id", id)
  return {group, events, id}
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Group )
