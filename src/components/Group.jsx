import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events'
import AppHeader from './AppHeader.jsx'
import GroupNav from './GroupNav.jsx'


function Group({group, events, id, history}){
  function gotoChat(){
    history.push(`/groups/${id}/chat`)
  }

  const groupEvents = Object.keys(group.events).map( eventKey => {
    const event = events[eventKey]
    event.id = eventKey
    return event
  })
  return (
    <div className="Group">
      <Events group={group} groupId={id} events={groupEvents}> </Events>
      <GroupNav groupId={id} onChatClick={gotoChat}/>
    </div>

  );
}

const mapStateToProps = (state, router) =>{
  const history = router.history
  const group = state.groups[router.match.params.groupId]
  const events = state.events
  const id = router.match.params.groupId
  return {group, events, id, history}
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Group )
