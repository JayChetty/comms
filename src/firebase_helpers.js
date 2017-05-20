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


export function firebaseEventsListener(callback){
  let counterRef = window.firebase.database().ref('events/');
  counterRef.on('value', function(snapshot) {
    callback( snapshot.val() )
  });
  return null
}

// export function firebaseCounterListener(callback){
//   let counterRef = window.firebase.database().ref('counter/');
//   counterRef.on('value', function(snapshot) {
//     callback( snapshot.val() )
//   });
//   return null
// }

// export function firebaseGetCounterValue(value){
//   return window.firebase.database().ref('/counter').once('value')
//   .then(function(snapshot) {
//     return snapshot.val();
//   });
// }
//
// export function firebaseUpdateCounter(value){
//   let database = window.firebase.database();
//   return database.ref('counter/').set(value)
//   .then((feedback)=>{
//     console.log("feedback from promise", feedback)
//     return feedback
//   });
// }

export function firebaseSignin(userDetails){
  return window.firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password)
  .then( (user) => {
    return {user}
  })
  .catch( (error) =>{
    return { error }
  })
}



// export function firebaseSignUp(userDetails){
//   return window.firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
//   .then( user => { user } )
//   .catch( error  => { error } )
// }


export function firebaseGetCurrentUser(){
  return onAuthStateChangedWrapper()
  .then( user => user )
  .catch( () => null )
}
