import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import App from './App';

import reducer from './reducers'
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {firebaseCounterListener} from './firebase_helpers'

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
let startedCounterListener = false
function listenToCounterChanges(){
  if(!startedCounterListener){
    startedCounterListener = true
    firebaseCounterListener((newValue)=>{
      console.log("callback got called")
      return store.dispatch({
        type: "SET_VALUE",
        value: newValue
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
    listenToCounterChanges()
    component = <App
      value={state.count}
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
