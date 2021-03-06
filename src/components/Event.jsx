import React from 'react';
import { connect } from 'react-redux'
import Form from './Form'
import { firebaseUpdateValue } from '../firebase_helpers'

import './Event.css'
function error(submission, result){
  return Object.keys( submission ).reduce( (acc,key)=> acc + Math.abs( result[key] - submission[key] ), 0 )
}

function Event({dispatch, event, group, submission, updateSubmission, submissions, currentUserId}){

  let scores = {}
  let sortedMemberKeys = []

  if(event.result){//order by score
    Object.keys(group.members).forEach((key)=>{
      const memberSubmission = submissions[key] || event.form.default
      scores[key] = error(memberSubmission, event.result)
    })
    sortedMemberKeys = Object.keys(group.members).sort((k1,k2) =>{
      return scores[k1] < scores[k2]
    }).reverse()
  }else{//put the currnetUserKey first
    sortedMemberKeys = Object.keys(group.members)
    sortedMemberKeys = sortedMemberKeys.filter( key => key !== currentUserId )
    sortedMemberKeys.unshift( currentUserId )
  }

  const forms = sortedMemberKeys.map((memberId, index)=>{
    const member = group.members[memberId]
    const submission = submissions[memberId]
    // const dataSource = submission ||
    const isCurrentUser = currentUserId === memberId
    return (
    // <div className="Event-usercard" key={memberId}>
    // <Card  zDepth={4} key={memberId} style={{marginBottom:'10px'}}>
    //   <CardHeader
    //     title={member.displayName}
    //   />
    //   <CardText>
        <Form
          key={memberId}
          form={event.form}
          submission={submission}
          onFormChange={updateSubmission}
          member={member}
          memberId={memberId}
          isCurrentUser={isCurrentUser}
          event={event}
          score={scores[memberId]}
          position={index + 1}
          >
        </Form>
    //   </CardText>
    // </Card>

  )
  })

  return (
    <div className="Event">
      {forms}
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
    console.log("updating submissions", value, formCategory)
    const routeString = `/groups/${match.params.groupId}/events/${match.params.eventId}/submissions/${state.user.uid}/${formCategory}/`
    firebaseUpdateValue(routeString, Number(value))
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
