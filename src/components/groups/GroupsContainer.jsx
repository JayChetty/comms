import React from 'react';
import { connect } from 'react-redux'
import Groups from './Groups'
import './Groups.css'


function GroupsContainer( {groups, user} ) {
  return (
     <Groups
       groups={groups}
       user={user}
     />
  );
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    user: state.user
  }
}



export default connect( mapStateToProps )( GroupsContainer )
