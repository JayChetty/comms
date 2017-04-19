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

  // console.log("incremenet async", database)
  // yield window.firebase.database().ref('count').set(
  //   {count: 99}
  // );
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

export function* signInSubmit( action ){
  console.log("signInSubmit", action)
  let response = yield call( firebaseSignin, action )
  console.log("response", response)
  if(response.error){
    console.log( "got error", response.error )
  }else{
    console.log( "got user", response.user )
  }
  // .catch(function(error){
  //   console.log("error", error)
  // })

  // details.email, details.password

  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });
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
