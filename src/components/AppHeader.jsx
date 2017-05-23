import React from 'react'
import './AppHeader.css'
import 'font-awesome/css/font-awesome.css'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'



function AppHeader({hasGroup, title}){
  const headerTitle = title || "oleApp"
  let icon = "fa fa-lg fa-heart-o"
  let backCallback = null
  if(hasGroup){
    icon = "fa fa-lg fa-chevron-left"
    backCallback = ()=> window.history.back()
  }
  return (
    <AppBar
      iconClassNameLeft={ icon }
      title={title}
      onLeftIconButtonTouchTap = {backCallback}
    />
  )
}


const mapStateToProps = (state, router) =>{
  const locationParts = router.location.pathname.split("/")
  if(!state.groups || !state.events || locationParts.length <= 2){
    return{
      hasGroup: false,
      title: "oleApp"
    }
  }
  const hasGroup = true
  let title = null
  switch (locationParts.length) {
    case 5:
      title = state.events[ locationParts[4] ].name
      break;
    case 3:
      title = state.groups[ locationParts[2] ].name
      break;
    default:
  }

  return{
    hasGroup,
    title
  }
}


// const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( AppHeader )
