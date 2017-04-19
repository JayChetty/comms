//Making Firebase library return a promise for getting current user so can follow same pattern
function onAuthStateChangedWrapper(){
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

export function firebaseSignin(userDetails){
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



export function firebaseGetCurrentUser(){
  console.log("trying to get current user")
  return onAuthStateChangedWrapper()
  .then((user)=>{
    return user
  })
  .catch(()=>{
    return null
  })
}
