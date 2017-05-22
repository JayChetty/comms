import React, { Component } from 'react';
import { connect } from 'react-redux'
import Events from './Events'

function Group({group}){
  console.log("group", group)
  return (
    <div className="App">
      {group}
      <Events events={group.events}> </Events>
    </div>
  );
}

const mapStateToProps = (state, {match}) =>{
  const group = state.groups[match.params.groupId]
  return {group}
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Group )
