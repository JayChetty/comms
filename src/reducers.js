export default function(state = {count: 0, user:null, authError:null}, action){
  switch(action.type){
    case 'INCREMENT':
      return Object.assign({}, state, {count: state.count + 1})
    case 'SET_USER':
      return Object.assign({}, state, {user: action.user})
    case 'SET_AUTH_ERROR':
      return Object.assign({}, state, {authError: action.error})
    default:
      return state
  }
}
