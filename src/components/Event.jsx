import React, { Component } from 'react';
import { connect } from 'react-redux'
import Form from './Form'


function Event({event, group, submission}){
  console.log('trying to show event', event, group)
  return (
    <div className="App">
      {event.name}
      <Form form={event.form} submission={submission}></Form>
    </div>
  );
}

const mapStateToProps = (state, {match}) =>{
  console.log('STATE', state)
  const event = state.events[match.params.eventId]
  const group = state.groups[match.params.groupId]
  //need to get submission from the group event
  const submission = group.events[match.params.eventId].submissions[state.user.uid]
  return {event, group, submission}
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Event )
