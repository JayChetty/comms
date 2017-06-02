import React from 'react'
import { connect } from 'react-redux'
import Events from './Events'
import GroupNav from '../GroupNav.jsx'


export default function Group({group, events, id, gotoChat}){
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
