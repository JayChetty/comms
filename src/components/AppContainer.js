import React from 'react'
import { connect } from 'react-redux'

import SignIn from './SignIn';
import App from './App';
import Events from './Events';

const AppContainer = ( props ) => {
  //   const state = store.getState()

  let component = <SignIn
    errorMessage={props.authError}
    onSubmit={(details) => {
      console.log('submit')
      return props.dispatch(
        {type: "SIGNIN_SUBMIT",
         email: details.email,
         password: details.password
        }
      )
    }}
  />
  if(props.user){
    // listenToDBChanges()
    component = <Events
      // value={state.count}
      events={props.events}
      onIncrement={() =>{
        return props.dispatch({
          type: "INCREMENT_ASYNC"
        })
      }}
    />
  }

  return(
    <div className="app-content">
      <h2> App Container</h2>
      { component }
    </div>
  )
}
// { props.children }
const mapStateToProps = (state)=>{
  console.log("mapping state to props", state)
  return state
  // return {
  //   siteId: params.siteId || null,
  //   view: location.pathname.split('/')[1]
  // }
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( AppContainer )
