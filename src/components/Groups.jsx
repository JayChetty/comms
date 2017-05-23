import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import AppHeader from './AppHeader'
import './Groups.css'
import Divider from 'material-ui/Divider';
import {
  Redirect
} from 'react-router-dom'

import {List, ListItem} from 'material-ui/List';

import {
  Link,
} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress';


function Groups( props ) {
  console.log("Rendering groups")
  // console.log("rendering groups props", props)
  if(!props.user){
    return <Redirect to="/signin"/>
  }
  if(!props.groups){
    return ( <LinearProgress mode="indeterminate" /> )
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
