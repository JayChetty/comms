import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'

import {firebaseGetCurrentUser, firebaseSignin } from './firebase_helpers'


export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

export function* signInSubmit( action ){
  console.log("signInSubmit", action)
  let response = yield call( firebaseSignin, action )
  console.log("response", response)
  if(response.error){
    console.log( "got error", response.error )
    yield put({ type: "SET_AUTH_ERROR", error: response.error.message })
  }else{
    console.log( "got user", response.user )
    yield put({ type: "SET_USER", user: response.user })
  }
}

export function* getCurrentUser(){
    let currentUser = yield call( firebaseGetCurrentUser )
    console.log("got the user man", currentUser)
    if( currentUser ){
      yield put({ type: "SET_USER", user: currentUser })
    }
}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  console.log("watch inc async")
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchSignInSubmit() {
  console.log("watch signin submit")
  yield takeEvery('SIGNIN_SUBMIT', signInSubmit)
}

export function* watchGetCurrentUser() {
  console.log("watch get current user")
  yield takeEvery('GET_CURRENT_USER', getCurrentUser)
}



export default function* rootSaga() {
  yield [
    watchIncrementAsync(),
    watchSignInSubmit(),
    watchGetCurrentUser()
  ]
}
