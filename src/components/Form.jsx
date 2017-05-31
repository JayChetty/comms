import React, { Component } from 'react';
import './Form.css'
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {greenA200, amber500, blueGrey100, brown400} from 'material-ui/styles/colors';
// import logo from './logo.svg';

// import { connect } from 'react-redux'
// import {
//   Link,
// } from 'react-router-dom'


export default function Form( { form, submission, onFormChange, isCurrentUser, member, memberId, event, score, position} ) {
  if(!submission && isCurrentUser){//setup form from default
    Object.keys(form.default).forEach((formKey)=>{
      onFormChange(form.default[formKey], formKey)
    })
  }

  const dataSource = submission || form.default

  const keysInOrder = ["conservatives", "labour", "snp", "liberals", "other"]
  // // const events = props.events
  const formListItems = keysInOrder.map((formKey, index)=>{

    let label = form.labels[formKey]
    if(event.result){
      const actual = event.result[formKey]
      const error = dataSource[formKey] - actual
      const sign = error >= 0 ? "+" : "-"
      label = `${label} ${actual}( ${sign}${Math.abs(error)})`
    }
    return(
      // <div className="Form-listitem">
      //   <label className="Form-label" key={formKey} for={formKey}> {formKey}</label>
      //   { input }
      // </div>
      <div className="Form-listitem" key={formKey}>
        <TextField
           onChange={ (event)=>onFormChange(event.target.value, formKey) }
           name={formKey}
           hintText={formKey}
           floatingLabelText={label}
           type="number"
           value={dataSource[formKey]}
           autoFocus={index===0}
           disabled={!isCurrentUser || event.status != "open"}
        />
      </div>
    )
  })

  const sum = Object.values( dataSource ).reduce( (acc,curr)=> acc + Number(curr), 0 )
  const remaining = 650 - sum

  let infoBox = <Avatar size={32} backgroundColor={greenA200}>{ sum }</Avatar>

  if(!event.result && remaining != 0){
    const adviceText = remaining > 0 ? 'Add' : 'Remove';
    infoBox = (
    <Chip>
      <Avatar size={32}>{ sum }</Avatar>
      { `${adviceText} ${ Math.abs(remaining) } seats`}
    </Chip>)
  }

  if(event.result){
    let color = null
    switch (position) {
      case 1:
        color = amber500
        break;
      case 2:
        color = blueGrey100
        break;
      case 3:
        color = brown400
        break;
      default:
        color = null
    }
    infoBox = (
      <Chip>
        <Avatar size={32} backgroundColor={color}>{ position }</Avatar>
        { `${score} wrong seats` }
      </Chip>
    )
  }

  return (
    <Card  zDepth={4} key={memberId} style={{marginBottom:'10px'}}>
      <CardHeader
        title={member.displayName}
      />
      <CardText>
        {infoBox}
        <form>
          { formListItems }
        </form>
      </CardText>
    </Card>
  );
}
