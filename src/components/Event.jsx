import React, { Component } from 'react';
import { connect } from 'react-redux'
import Form from './Form'
import { firebaseUpdateValue } from '../firebase_helpers'
import AppHeader from './AppHeader'
import './Event.css'

function Event({dispatch, event, group, submission, updateSubmission, submissions, currentUserId}){
  console.log("Event group", group)
  const forms = Object.keys(group.members).map((memberId)=>{
    const member = group.members[memberId]
    const submission = submissions[memberId]
    const isCurrentUser = currentUserId === memberId
    return (
    <div className="Event-usercard">
      <h3>{member.displayName}</h3>
      <Form
        key={memberId}
        form={event.form}
        submission={submission}
        onFormChange={updateSubmission}
        isCurrentUser={isCurrentUser}>
      </Form>
    </div>
  )
  })

  return (
    <div>
      <AppHeader title={event.name}/>
      <div className="Event">
        {forms}
      </div>
    </div>
  );
}

const mapStateToProps = (state, {match}) =>{
  const event = state.events[match.params.eventId]
  const group = state.groups[match.params.groupId]
  //need to get submission from the group event
  const submissions = group.events[match.params.eventId].submissions
  const currentUserId = state.user.uid
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
    updateSubmission,
    submissions,
    currentUserId
  }
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Event )
