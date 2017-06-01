import React from 'react'
import './AppHeader.css'
import 'font-awesome/css/font-awesome.css'
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';


export default function GroupNav({groupId, onChatClick}){
  const eventsIcon = <FontIcon className="fa fa-lg fa-gamepad"/>
  const chatIcon = <FontIcon className="fa fa-lg fa-comments"/>

  return (
    <Paper zDepth={1} style={{position:'fixed', bottom:0, width:'100%'}}>
      <BottomNavigation selectedIndex={0}>
        <BottomNavigationItem
          label="Events"
          icon={eventsIcon}
        />
        <BottomNavigationItem
          label="Chat"
          icon={chatIcon}
          onTouchTap={onChatClick}
        />
      </BottomNavigation>
    </Paper>
  )
}


// const mapStateToProps = (state, router) =>{
//   return state
// }
//
//
// // const mapStateToProps = state => state
//
// const mapDispatchToProps = (dispatch)=>{
//   return { dispatch: dispatch }
// }
//
// export default connect( mapStateToProps, mapDispatchToProps )( GroupNav )
