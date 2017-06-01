import React from 'react';
import { connect } from 'react-redux'
import './Groups.css'
import Divider from 'material-ui/Divider';
import {
  Redirect
} from 'react-router-dom'

import {List, ListItem} from 'material-ui/List';

import {Link} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress';


function Groups( props ) {
  if(!props.user){
    return <Redirect to="/signin"/>
  }
  if(!props.groups){
    return ( <LinearProgress mode="indeterminate" /> )
  }
  const groups = props.groups
  // const user = props.user

  const groupListItems = Object.keys(groups).map((key)=>{
    const group = groups[key]
    const numberOfMembers = Object.keys(group.members).length
    const numberOfEvents = Object.keys(group.events).length
    // const events = group.events
    // const hasNewEvent = Object.keys(events).some( eventKey => !events[eventKey].submissions[user.id])
    // let infoIcon = null
    // if(hasNewEvent){
    //   infoIcon =
    // }
    // const submissions = group
    // console.log("group events", group.events)
    return (
      <div key={key}>
        <ListItem
          primaryText={group.name}
          secondaryText={`${numberOfMembers} Members, ${numberOfEvents} Event`}
          key={key}
          rightIcon={null}
          containerElement={<Link to={`/groups/${key}/events`}/>}
        />
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
