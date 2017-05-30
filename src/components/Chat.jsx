import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

import { firebaseAddMessage, firebaseUpdateValue } from '../firebase_helpers'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import IconButton from 'material-ui/IconButton';

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

  const messageStyle = {
    width: '75%',
    padding: '10px',
    margin: '10px'
  }

  const userStyle = {
    alignSelf: 'flex-end'
  }

  const messageItems = messageKeys.map((key)=>{
    const message = group.messages[key]
    const member = group.members[message.userId]
    const isUser = userId === message.userId
    const additionalStyles = isUser ? userStyle : {}
    const style = Object.assign({}, messageStyle, additionalStyles)
    if(!isUser){
    return (
      <div key={key} className="Chat-item">
        <Paper zDepth={1} style={style}>
          <div className="Chat-item-name">{ member.displayName }</div>
          { message.message }
        </Paper>
      </div>
    )}else{
      return (
        <div key={key} className="Chat-item">
          <Paper zDepth={1} style={style}>
            { message.message }
          </Paper>
        </div>
      )

    }
  })

  const buttonStyle = {

  }

  return(
    <div className="Chat-container">
      <div className="Chat-main">
        { messageItems }
      </div>
      <div className="Chat-input">
        <TextField
          style={{flex: 8, margin:'10px'}}
          hintText="Type a message"
          multiLine={true}
          value={message}
          rows={1}
          rowsMax={10}
          onChange={(ev)=> updateCurrentMessage(ev.target.value, userId, groupId )}
        />
        {/* <RaisedButton
          primary={true}
          style={buttonStyle}
          icon={<FontIcon className="fa fa-heart-o" />}
          onTouchTap={()=>postMessage(message,userId,groupId) }/> */}
        <IconButton
          style={{flex: 2, marginTop: '10px'}}
          iconClassName="fa fa-paper-plane"
          onTouchTap={()=>postMessage(message,userId,groupId) }
        />
        {/* <IconButton
          primary={true}
          style={buttonStyle}
          icon={<FontIcon className="fa fa-heart-o" />}
          onTouchTap={()=>postMessage(message,userId,groupId) }/> */}
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
