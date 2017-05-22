import React, { Component } from 'react';
import { connect } from 'react-redux'
import Form from './Form'
import { firebaseUpdateValue } from '../firebase_helpers'

function Event({dispatch, event, group, submission, updateSubmission}){
  return (
    <div className="App">
      {event.name}
      <Form form={event.form} submission={submission} onFormChange={updateSubmission}></Form>
    </div>
  );
}

const mapStateToProps = (state, {match}) =>{
  const event = state.events[match.params.eventId]
  const group = state.groups[match.params.groupId]
  //need to get submission from the group event
  const submission = group.events[match.params.eventId].submissions[state.user.uid]

  const updateSubmission = (value, formCategory)=>{
    console.log("updating submission", value, formCategory)
    const routeString = `/groups/${match.params.groupId}/events/${match.params.eventId}/submissions/${state.user.uid}/${formCategory}/`
    firebaseUpdateValue(routeString, value)
  }

  return {
    event,
    group,
    submission,
    updateSubmission
  }
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Event )
