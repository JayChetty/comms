import React from 'react'
import { connect } from 'react-redux'


// import actions from '../actions/actions'

const AppContainer = ( props ) => {
  return(
    <div className="app-content">
      <h2> App Container</h2>
      { props.children }
    </div>
  )
}

const mapStateToProps = (state)=>{
  console.log("mapping state to props", state)
  return state
  // return {
  //   siteId: params.siteId || null,
  //   view: location.pathname.split('/')[1]
  // }
}

export default connect( mapStateToProps )( AppContainer )
