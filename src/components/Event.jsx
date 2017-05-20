import React, { Component } from 'react';
import { connect } from 'react-redux'


function Event({event}){

  return (
    <div className="App">
      {event.name}
    </div>
  );
}

const mapStateToProps = (state, {match}) =>{
  const event = state.events[match.params.eventId]
  return {event}
}

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Event )
