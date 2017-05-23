import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import AppHeader from './AppHeader'
import './Groups.css'
import Divider from 'material-ui/Divider';

import {List, ListItem} from 'material-ui/List';

import {
  Link,
} from 'react-router-dom'


function Groups(props){
  return(
    <div>Hello</div>
  )
}

function Groups( props ) {
  // console.log("rendering groups props", props)
  if(!props.groups){
    return ( <div> Fetching...</div> )
  }
  // console.log("rendering groups props", props)
  const groups = props.groups
  const groupListItems = Object.keys(groups).map((key)=>{
    return (
      <div>
        <ListItem  primaryText={groups[key].name} key={key} containerElement={<Link to={`/groups/${key}`}/>}/>
        <Divider/>
      </div>
    )
  })
  return (
     <List>
      { groupListItems }
    </List>
  );
}


const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( Groups )
