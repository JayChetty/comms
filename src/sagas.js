import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'

import {
  firebaseGetCurrentUser,
  firebaseSignin,
  firebaseUpdateCounter,
  firebaseGetCounterValue,
  firebaseCounterListener
} from './firebase_helpers'

// function listenToDbChanges(){
//   let counterRef = window.firebase.database().ref('counter/');
//   counterRef.on('value', function(snapshot) {
//     // updateStarCount(postElement, snapshot.val());
//     console.log("VALUE CHANGED", snapshot.val())
//     callback( snapshot.val() )
//   });
// }


export function* incrementAsync( user ) {
  console.log("TRYING TO INCREMENT DATABASE")
  let value = yield call(firebaseGetCounterValue)
  console.log("TGOT VALUE", value)
  let response = yield call( firebaseUpdateCounter, value + 1 )
  //not going to do anything with this as listening separatly to database value changes
  console.log("update response")
}

//(Intuition) These yield out Promises to the watchers that then in turn feedback to them the resolved result
export function* signInSubmit( action ){
  let response = yield call( firebaseSignin, action )
  if(response.error){
    yield put({ type: "SET_AUTH_ERROR", error: response.error.message })
  }else{
    yield put({ type: "ACTIVATE_USER", user: response.user })
  }
}

//The watcher will trigger d.throw if .catch.  This will enter any catch block in here. So can do error checking
//in here.
export function* getCurrentUser(){
    let currentUser = yield call( firebaseGetCurrentUser )
    if( currentUser ){
      yield put({ type: "ACTIVATE_USER", user: currentUser })
    }
}

export function* activateUser(user){
  //Have this separted out as this could be nice put to do the database listening
  //But what is the best way to do this?
  yield put({ type: "SET_USER", user: user })
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

export function* watchActivateUser() {
  yield takeEvery('ACTIVATE_USER', activateUser)
}

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
    watchGetCurrentUser(),
    watchActivateUser()
  ]
}
