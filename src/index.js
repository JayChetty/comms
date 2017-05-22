import registerServiceWorker from './registerServiceWorker';


import React from 'react';
import ReactDOM from 'react-dom';

import SignIn from './components/SignIn';
import Groups from './components/Groups';
import Group from './components/Group';
import Event from './components/Event';

import reducer from './reducers'
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {firebaseCounterListener, firebaseEventsListener} from './firebase_helpers'

import rootSaga from './sagas'


import { Provider } from 'react-redux';

// import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(sagaMiddleware)
)

registerServiceWorker()

//set off the sagas to listen,  like little threads
sagaMiddleware.run(rootSaga)

//set off the db listener to update when changes happen
//This is really hack,  what is a nicer way to do this?
let startedDBListener = false
function listenToDBChanges(past){
  const user = store.getState().user
  if(user && !startedDBListener){
    startedDBListener = true
    firebaseEventsListener("groups/", user, (newGroups)=>{
      console.log("groups updated", newGroups)
      return store.dispatch({type: "SET_GROUPS",groups: newGroups})
    })
    firebaseEventsListener("events/", user, (newEvents)=>{
      console.log("events updated", newEvents)
      return store.dispatch({type: "SET_EVENTS",events: newEvents})
    })
  }
}

store.subscribe( listenToDBChanges )


//Now what is really going on here? HOC right
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().user ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <PrivateRoute exact path='/' component={Groups}/>
        <PrivateRoute exact path='/groups/:groupId' component={Group}/>
        <PrivateRoute exact path='/groups/:groupId/events/:eventId' component={Event}/>
        <PrivateRoute exact path='/groups' component={Groups}/>
        <Route path='/signin' component={SignIn}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
store.dispatch({ type: "GET_CURRENT_USER" })
// function render(){
//   const state = store.getState()
//   let component = <SignIn
//     errorMessage={state.authError}
//     onSubmit={(details) => {
//       console.log('submit')
//       return store.dispatch(
//         {type: "SIGNIN_SUBMIT",
//          email: details.email,
//          password: details.password
//         }
//       )
//     }}
//   />
//   if(state.user){
//     listenToDBChanges()
//     component = <Events
//       // value={state.count}
//       events={state.events}
//       onIncrement={() =>{
//         return store.dispatch({
//           type: "INCREMENT_ASYNC"
//         })
//       }}
//     />
//   }
//
//   ReactDOM.render(
//     <Provider store={store}>
//       { component }
//     </Provider>,
//     document.getElementById('root')
//   );
// }
// store.subscribe( render )
// render()
