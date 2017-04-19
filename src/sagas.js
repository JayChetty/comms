import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'

// Our worker Saga: will perform the async increment task
function firebaseSignin(userDetails){
  console.log("in firebase sign in")
  return window.firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
  .then(function( user ){
    console.log('response', user)
    return { user }
  })
  .catch(function( error ){
    return { error }
  })

}
export function* incrementAsync() {
  console.log("fire", window.firebase)
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


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  console.log("watch inc async")
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchSignInSubmit() {
  console.log("watch signin submit")
  yield takeEvery('SIGNIN_SUBMIT', signInSubmit)
}



export default function* rootSaga() {
  yield [
    watchIncrementAsync(),
    watchSignInSubmit()
  ]
}
