import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'

import {firebaseGetCurrentUser, firebaseSignin, firebaseUpdateCounter } from './firebase_helpers'


export function* incrementAsync( user ) {
  let response = yield call( firebaseUpdateCounter, user )
  console.log("update response")
  yield put({ type: 'INCREMENT' })
}

//(Intuition) These yield out Promises to the watchers that then in turn feedback to them the resolved result
export function* signInSubmit( action ){
  let response = yield call( firebaseSignin, action )
  if(response.error){
    yield put({ type: "SET_AUTH_ERROR", error: response.error.message })
  }else{
    yield put({ type: "SET_USER", user: response.user })
  }
}

//The watcher will trigger d.throw if .catch.  This will enter any catch block in here. So can do error checking
//in here.
export function* getCurrentUser(){
    let currentUser = yield call( firebaseGetCurrentUser )
    if( currentUser ){
      yield put({ type: "SET_USER", user: currentUser })
    }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC

//(Intuition) The watchers are calling saga.next() and passing in the information from the returned promise.
//(This is all happening behind the scene)
export function* watchIncrementAsync() {
  //Queue up all the increments and allow them to happen onw after another(typical js!)
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  //Only one can happen at a time, latest one will replace the others(traffic lights)
  // yield takeLatest('INCREMENT_ASYNC', incrementAsync)
}


//Can do all kinds of funky stuff like this - Could use a for loop and then we can only listen for a certain amount
//of actions.  THIS IS THE SHINDIG!
// export function* watchIncrementAsync() {
//   //Queue up all the increments and allow them to happen onw after another
//   while(true){
//     console.log("waiting to get action")
//     const action = yield take('INCREMENT_ASYNC')//this will now suspend the generator until the promise resolves
//     console.log("got action setting off delay")
//     yield call(delay, 1000)
//     console.log("heard back form delay")
//     yield put({ type: 'INCREMENT' })
//   }
// }

export function* watchSignInSubmit() {
  yield takeEvery('SIGNIN_SUBMIT', signInSubmit)
}

export function* watchGetCurrentUser() {
  yield takeEvery('GET_CURRENT_USER', getCurrentUser)
}



export default function* rootSaga() {
  yield [
    watchIncrementAsync(),
    watchSignInSubmit(),
    watchGetCurrentUser()
  ]
}
