import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events'
import AppHeader from './AppHeader.jsx'
import GroupNav from './GroupNav.jsx'


function Group({group, events, id, history}){
  // console.log("Group id", id)
  function gotoChat(){
    history.push(`/groups/${id}/chat`)
  }

  const groupEvents = Object.keys(group.events).map( eventKey => {
    const event = events[eventKey]
    event.id = eventKey
    return event
  })
  // console.log("groupEvents", groupEvents)
  console.log("group history", history)
  return (
    <div className="Group">
      <Events group={group} groupId={id} events={groupEvents}> </Events>
      <GroupNav groupId={id} onChatClick={gotoChat}/>
    </div>

  );
}

const mapStateToProps = (state, router) =>{
  console.log("router", router)
  const history = router.history
  const group = state.groups[router.match.params.groupId]
  const events = state.events
  const id = router.match.params.groupId
  // console.log("id", id)
  return {group, events, id, history}
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Group )
