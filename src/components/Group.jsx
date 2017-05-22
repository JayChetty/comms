import React, { Component } from 'react';
import { connect } from 'react-redux'


function Group({group}){
  console.log("group", group)
  return (
    <div className="App">
      {group}
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
