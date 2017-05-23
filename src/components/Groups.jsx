import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import AppHeader from './AppHeader'
import './Groups.css'

import {
  Link,
} from 'react-router-dom'


function Groups(props){
  return(
    <div>Hello</div>
  )
}

function Groups( props ) {
  console.log("rendering groups props", props)
  if(!props.groups){
    return ( <div> Fetching...</div> )
  }
  console.log("rendering groups props", props)
  const groups = props.groups
  const groupListItems = Object.keys(groups).map((key)=>{
    return ( <div className="Groups-item" key={key}> <Link to={`/groups/${key}`}> {groups[key].name} </Link> </div> )
  })
  return (
    <div>
      <AppHeader/>
      <div className="Groups">
        { groupListItems }
      </div>
    </div>
  );
}


const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Groups )
