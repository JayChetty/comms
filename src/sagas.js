import { put, call, takeEvery } from 'redux-saga/effects'

import {
  firebaseGetCurrentUser,
  firebaseSignin,
  firebaseSignOut
} from './firebase_helpers'

//(Intuition) These yield out Promises to the watchers that then in turn feedback to them the resolved result
export function* signInSubmit( action ){
  let response = yield call( firebaseSignin, action )
  if(response.error){
    yield put({ type: "SET_AUTH_ERROR", error: response.error.message })
  }else{
    yield put({ type: "ACTIVATE_USER", user: response.user })
  }
}

export function* signOutSubmit( action ){
  let response = yield call( firebaseSignOut )
  if(response.error){
    yield put({ type: "SET_AUTH_ERROR", error: response.error.message })
  }else{
    yield put({ type: "ACTIVATE_USER", user: null })
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

export function* activateUser({ user }){
  //Have this separted out as this could be nice put to do the database listening
  //But what is the best way to do this?
  // let groups = yield call( firebaseGetCurrentUser )
  // firebaseEventsListener("groups/", user,
  // firebaseEventsListener("groups/", user, (groups)=>{
  //   console.log("value from events listener", groups)
  //   yield put({ type: "SET_GROUPS", groups: groups })
  // })
  yield put({ type: "SET_USER", user: user })

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

export function* watchSignOutSubmit() {
  yield takeEvery('SIGNOUT_SUBMIT', signOutSubmit)
}

export function* watchGetCurrentUser() {
  yield takeEvery('GET_CURRENT_USER', getCurrentUser)
}

// export function* watchUpdateSubmission() {
//   yield takeEvery('UPDATE_SUBMISSION', updateSubmission)
// }

// export function* watchGetCurrentUser() {
//   yield takeEvery('GET_CURRENT_USER', getCurrentUser)
// }



export default function* rootSaga() {
  yield [
    watchSignInSubmit(),
    watchGetCurrentUser(),
    watchActivateUser(),
    watchSignOutSubmit(),
    // watchUpdateSubmission()
  ]
}
