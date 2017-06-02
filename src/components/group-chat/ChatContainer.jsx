import React from 'react'

import { firebaseAddMessage, firebaseUpdateValue } from '../../firebase_helpers'
import { connect } from 'react-redux'

import Chat from './Chat'

function updateCurrentMessage(message, userId, groupId){
  firebaseUpdateValue(`users/${userId}/groups/${groupId}/currentMessage`, message)
}

function postMessage(message, userId, groupId){
  firebaseAddMessage(userId, groupId, message)
  firebaseUpdateValue(`users/${userId}/groups/${groupId}/currentMessage`, "")
}

function ChatContainer(props){
  const chatProps = Object.assign(props, {updateCurrentMessage, postMessage})
  return(
    <Chat
      {...chatProps}
    />
  )
}

const mapStateToProps = (state, router) =>{
  // const groupId = this.props.match.params.groupId
  // const message = this.props.userDetails.groups[groupId].currentMessage
  // const userId = this.props.user.uid
  // const group = this.props.groups[groupId]
  //
  return Object.assign({},state, router)
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( ChatContainer )
