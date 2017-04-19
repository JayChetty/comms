import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';

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

// const action = (type) => store.dispatch( {type} )

//set off the sagas to listen,  like little threads
sagaMiddleware.run(rootSaga)

function render(){
  ReactDOM.render(
    <SignUp
      value={store.getState()}
      onSubmit={(details) => {
        console.log('submit')
        return store.dispatch(
          {type: "SIGNIN_SUBMIT",
           email: details.email,
           password: details.password
          }
        )
      }}
    />,
    document.getElementById('root')
  );
}
store.subscribe( render )

render()
