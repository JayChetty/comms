export default function(state = {count: 0, user:null, authError:null}, action){
  switch(action.type){
    case 'SET_VALUE':
      return Object.assign({}, state, {count: action.value})
    case 'SET_USER':
      return Object.assign({}, state, {user: action.user})
    case 'SET_AUTH_ERROR':
      return Object.assign({}, state, {authError: action.error})
    default:
      return state
  }
}
