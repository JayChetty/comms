import React from 'react'
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import "./Chat.css"

export default class Chat extends React.Component{
  // constructor(props) {
  //  super(props);
  //  this.state = {date: new Date()};
  // }
  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom(){
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  render(){
    const groupId = this.props.match.params.groupId
    const message = this.props.userDetails.groups[groupId].currentMessage
    const userId = this.props.user.uid
    const group = this.props.groups[groupId]

    const messageKeys = group.messages ? Object.keys(group.messages) : []

    const messageStyle = {
      maxWidth: '75%',
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

    return(
      <div className="Chat-container">
        <div className="Chat-main">
          { messageItems }
          <div style={ {float:"left", clear: "both"} }
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <div className="Chat-input">
          <TextField
            style={{flex: 8, margin:'10px'}}
            hintText="Type a message"
            multiLine={true}
            value={message}
            rows={1}
            rowsMax={10}
            onChange={(ev)=> this.props.updateCurrentMessage(ev.target.value, userId, groupId )}
          />
          {/* <RaisedButton
            primary={true}
            style={buttonStyle}
            icon={<FontIcon className="fa fa-heart-o" />}
            onTouchTap={()=>postMessage(message,userId,groupId) }/> */}
          <IconButton
            style={{flex: 2, marginTop: '10px'}}
            iconClassName="fa fa-paper-plane"
            onTouchTap={()=> this.props.postMessage(message,userId,groupId) }
          />
          {/* <IconButton
            primary={true}
            style={buttonStyle}
            icon={<FontIcon className="fa fa-heart-o" />}
            onTouchTap={()=>postMessage(message,userId,groupId) }/> */}
        </div>
      </div>
  )}
}
