import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { firebaseAddMessage, firebaseUpdateValue } from '../firebase_helpers'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';



import "./Chat.css"
function updateCurrentMessage(message, userId, groupId){
  console.log("Message", message)
  firebaseUpdateValue(`users/${userId}/groups/${groupId}/currentMessage`, message)
}

function postMessage(message, userId, groupId){
  firebaseAddMessage(userId, groupId, message)
  firebaseUpdateValue(`users/${userId}/groups/${groupId}/currentMessage`, "")
}

function Chat(props){
  console.log("props", props)
  const groupId = props.match.params.groupId
  const message = props.userDetails.groups[groupId].currentMessage
  const userId = props.user.uid
  const group = props.groups[groupId]
  const messageKeys = Object.keys(group.messages)

  const messageItems = messageKeys.map((key)=>{
    const message = group.messages[key]
    return (
      <div key={key}>
        <Paper zDepth={1}>
          { message.message }
        </Paper>
      </div>
    )
  })

  return(
    <div className="Chat-container">
      <div className="Chat-main">
        { messageItems }
      </div>
      <div className="Chat-input">
        <TextField
          hintText="Type a message"
          multiLine={true}
          value={message}
          rows={1}
          rowsMax={10}
          onChange={(ev)=> updateCurrentMessage(ev.target.value, userId, groupId )}
        />
        <FloatingActionButton onTouchTap={()=>postMessage(message,userId,groupId)}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state, router) =>{
  return Object.assign({},state, router)
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Chat )
