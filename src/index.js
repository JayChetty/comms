import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import App from './App';

import reducer from './reducers'
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)


//set off the sagas to listen,  like little threads
sagaMiddleware.run(rootSaga)

//check if user already signed in, should this move to a sage ->  get current user from local
// window.firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     store.dispatch(
//       { type: "SET_USER", user: user }
//     )
//   }
// });


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
