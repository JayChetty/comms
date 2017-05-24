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


export function firebaseEventsListener(data, callback){
  let counterRef = window.firebase.database().ref(data);
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

export function firebaseAddMessage(userId, groupId, message){
  const messageData = {
    userId,
    message
  }
  const messageRoute = `/groups/${groupId}/messages`
  const newMessageKey = window.firebase.database().ref().child(messageRoute).push().key;
  let database = window.firebase.database();
  return database.ref(`${messageRoute}/${newMessageKey}`).set(messageData)
  .then((feedback)=>{
    console.log("feedback from promise", feedback)
    return feedback
  });
}

export function firebaseUpdateValue(route, value){
  let database = window.firebase.database();
  console.log("firebaseUpdateValue", route)
  return database.ref(route).set(value)
  .then((feedback)=>{
    console.log("feedback from promise", feedback)
    return feedback
  });
}

// export function firebaseUpdateSubmission(groupId, userId, eventId, category, value){
//   let database = window.firebase.database();
//   const routeString = `/${groupId}/${userId}/${eventId}/${category}/`
//   console.log("routeString", routeString)
//   return database.ref(routeString).set(value)
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

export function firebaseSignOut(){
  return window.firebase.auth().signOut()
  .then( () => {
    return true
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
