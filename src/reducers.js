const initialState = {
  count: 0,
  events: [],
  user:null,
  authError:null
}

export default function(state = initialState, action){
  switch(action.type){
    case 'SET_EVENTS':
      return Object.assign({}, state, {events: action.events})
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
