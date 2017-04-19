import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'


//Making Firebase library return a promise for getting current user so can follow same pattern
function firebaseGetCurrentUser(){
  return new Promise((resolve, reject)=>{
    window.firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        resolve( user )
      }else{
        reject()
      }
    });
  })
}

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



function getCurrentUserFirebase(){
  console.log("trying to get current user")
  return firebaseGetCurrentUser()
  .then((user)=>{
    return user
  })
  .catch(()=>{
    return null
  })
}


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
    let currentUser = yield call( getCurrentUserFirebase )
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
