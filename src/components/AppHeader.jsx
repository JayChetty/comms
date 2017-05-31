import React from 'react'
import './AppHeader.css'
import 'font-awesome/css/font-awesome.css'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


function AppHeader({hasGroup, title, user, dispatch}){
  let icon = "fa fa-lg fa-heart-o"
  let backCallback = null

  if(hasGroup){
    icon = "fa fa-lg fa-chevron-left"
    backCallback = ()=> window.history.back()
  }
  let menu = null
  if(user){
    menu =(
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
      <MenuItem
        primaryText="Sign out"
        onTouchTap={ ()=> dispatch({type: "SIGNOUT_SUBMIT"}) }
       />
    </IconMenu>)
  }
  return (
    <AppBar
      iconClassNameLeft={ icon }
      title={title}
      onLeftIconButtonTouchTap = {backCallback}
      iconElementRight={menu}
    />
  )
}


const mapStateToProps = (state, router) =>{
  const locationParts = router.location.pathname.split("/")
  if(!state.groups || !state.events || !state.user){
    return{
      hasGroup: false,
      title: "oléApp",
      user: null
    }
  }
  const user = state.user
  let hasGroup = true
  let title = null
  switch (locationParts.length) {
    case 5:
      title = state.events[ locationParts[4] ].name
      break;
    case 4:
      title = state.groups[ locationParts[2] ].name
      break;
    default:
      hasGroup = false,
      title = "oléApp"
  }

  return{
    hasGroup,
    title,
    user
  }
}


// const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( AppHeader )
