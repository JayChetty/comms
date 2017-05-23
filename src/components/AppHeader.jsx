import React from 'react'
import './AppHeader.css'
import 'font-awesome/css/font-awesome.css'
import { connect } from 'react-redux'


function AppHeader({hasGroup, title}){
  const headerTitle = title || "oleApp"
  let backButton = null
  if(hasGroup){
    backButton = (
      <a onClick={()=> window.history.back()}>
        <i className="fa fa-lg fa-chevron-left"></i>
      </a>
    )
  }
  return (
    <header className="AppHeader">
      <nav>
        {backButton}
      </nav>

      <h1> {headerTitle} </h1>
      <div className="menu"></div>

    </header>
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
