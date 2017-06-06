import registerServiceWorker from './registerServiceWorker';


import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/AppHeader'
import SignIn from './components/SignIn';
import GroupsContainer from './components/groups/GroupsContainer';
import GroupContainer from './components/group-events/GroupContainer';
import Event from './components/Event';
import ChatContainer from './components/group-chat/ChatContainer';

import reducer from './reducers/reducers'
import './index.css';
import createSagaMiddleware from 'redux-saga'

import {firebaseEventsListener} from './firebase_helpers'

import rootSaga from './sagas/sagas'
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import * as firebase from 'firebase';
injectTapEventPlugin()

let config = {
  apiKey: "AIzaSyDc4DpJLeK4w4ULp81hy-k3cXrR-1TWho8",
  authDomain: "comms-a2118.firebaseapp.com",
  databaseURL: "https://comms-a2118.firebaseio.com",
  projectId: "comms-a2118",
  storageBucket: "comms-a2118.appspot.com",
  messagingSenderId: "860474046609"
};

firebase.initializeApp(config);
window.firebase = firebase

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
//Can we do this in a saga - problem would need to be in method on then,  which cannot yield as is not a generator
let startedDBListener = false
function listenToDBChanges(past){
  const user = store.getState().user
  if(user && !startedDBListener){
    startedDBListener = true
    firebaseEventsListener(`users/${user.uid}/groups/`, (userGroups)=>{
      Object.keys(userGroups).forEach((groupId)=>{
        firebaseEventsListener(`groups/${groupId}`, (group)=>{//TODO check security of this
          return store.dispatch({type: "SET_GROUP", groupId: groupId, group: group})
        })
      })
      // return store.dispatch({type: "SET_GROUPS",groups: newGroups})
    })
    firebaseEventsListener("events/", (newEvents)=>{
      return store.dispatch({type: "SET_EVENTS",events: newEvents})
    })
    firebaseEventsListener(`users/${user.uid}`, (userDetails)=>{
      return store.dispatch({type: "SET_USER_DETAILS", userDetails: userDetails})
    })
  }
}

store.subscribe( listenToDBChanges )


//Based on example in docs, Now what is really going on here? HOC right
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
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
          <div>
            <Route path='/' component={AppHeader}/>
            <PrivateRoute exact path='/' component={GroupsContainer}/>
            <PrivateRoute exact path='/groups/:groupId/events/:eventId' component={Event}/>
            <PrivateRoute exact path='/groups/:groupId/events' component={GroupContainer}/>
            <PrivateRoute exact path='/groups/:groupId/chat' component={ChatContainer}/>
            <PrivateRoute exact path='/groups' component={GroupsContainer}/>
            <Route path='/signin' component={SignIn}/>
          </div>
      </Router>
    </Provider>
  </MuiThemeProvider>,
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
