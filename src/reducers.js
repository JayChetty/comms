const initialState = {
  events: [],
  user:null,
  authError:null
}

export default function(state = initialState, action){
  switch(action.type){
    case 'SET_EVENTS':
      return Object.assign({}, state, {events: action.events})
    case 'SET_USER':
      return Object.assign({}, state, {user: action.user})
    case 'SET_GROUPS':
      return Object.assign({}, state, {groups: action.groups})
    case 'SET_USER_DETAILS':
      return Object.assign({}, state, {userDetails: action.userDetails})
    case 'SET_GROUP':
      const newGroups = Object.assign({}, state.groups, {[action.groupId]: action.group} )
      return Object.assign({}, state, {groups: newGroups})
    case 'SET_AUTH_ERROR':
      return Object.assign({}, state, {authError: action.error})
    default:
      return state
  }
}
