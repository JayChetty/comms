import React from 'react';
import './Events.css'
import {
  Link,
} from 'react-router-dom'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';


export default function Events( { group, events, groupId } ) {
  // const events = props.events
  const eventListItems = events.map((event)=>{
    return (
      <div key={event.id}>
        <ListItem
          primaryText={event.name}
          secondaryText={`Open! Click to make prediction`}
          containerElement={<Link to={`events/${event.id}`}/>}
        />
        <Divider/>
      </div>
    )
  })

  return (
    <List>
      { eventListItems }
    </List>
  );
}


// const mapStateToProps = state => state
//
// const mapDispatchToProps = (dispatch)=>{
//   return { dispatch: dispatch }
// }
//
// export default connect( mapStateToProps, mapDispatchToProps )( Events )
