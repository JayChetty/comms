import React from 'react'
import { connect } from 'react-redux'
import Group from './Group'


function GroupContainer(props){
  function gotoChat(){
    props.history.push(`/groups/${props.id}/chat`)
  }
  return (
    <Group
      gotoChat={gotoChat}
      {...props}
    />
  );
}

const mapStateToProps = (state, router) =>{
  const history = router.history
  const group = state.groups[router.match.params.groupId]
  const events = state.events
  const id = router.match.params.groupId
  return {group, events, id, history}
}


export default connect( mapStateToProps )( GroupContainer )
