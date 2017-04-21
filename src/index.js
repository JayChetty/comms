import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import App from './App';
import Events from './Events';

import reducer from './reducers'
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {firebaseCounterListener, firebaseEventsListener} from './firebase_helpers'

import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)


//set off the sagas to listen,  like little threads
sagaMiddleware.run(rootSaga)

//set off the db listener to update when changes happen
//This is really hack,  what is a nicer way to do this?
let startedDBListener = false
function listenToDBChanges(){
  if(!startedDBListener){
    startedDBListener = true
    firebaseCounterListener((newValue)=>{
      return store.dispatch({
        type: "SET_VALUE",
        value: newValue
      })
    })

    firebaseEventsListener((newEvents)=>{
      console.log("callback got called")
      return store.dispatch({
        type: "SET_EVENTS",
        events: newEvents
      })
    })
  }
}

//list for changes in the firebase database

function render(){
  const state = store.getState()
  let component = <SignIn
    errorMessage={state.authError}
    onSubmit={(details) => {
      console.log('submit')
      return store.dispatch(
        {type: "SIGNIN_SUBMIT",
         email: details.email,
         password: details.password
        }
      )
    }}
  />
  if(state.user){
    listenToDBChanges()
    component = <Events
      // value={state.count}
      events={state.events}
      onIncrement={() =>{
        return store.dispatch({
          type: "INCREMENT_ASYNC"
        })
      }}
    />
  }

  ReactDOM.render(
    component,
    document.getElementById('root')
  );
}
store.subscribe( render )

render()
console.log("trying to dispatch")
store.dispatch({ type: "GET_CURRENT_USER" })
