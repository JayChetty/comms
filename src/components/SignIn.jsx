import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import './SignIn.css'
import AppHeader from './AppHeader.jsx'
import {
  Redirect
} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state  = {email:'', password: ''}
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event){
    this.setState( { [event.target.name]: event.target.value } );
  }
  handleSubmit(event){
    event.preventDefault()
    // this.props.onSubmit(this.state)
    this.props.dispatch(
    {type: "SIGNIN_SUBMIT",
     email: this.state.email,
     password: this.state.password
    })
  }
  render() {
    if(this.props.authError){

    }
    const authDisplay = this.props.authError ? "Wrong username or password" : null
    if(this.props.user){
      return <Redirect to="/groups"/>
    }
    return (
      <section className="SignIn">
        <p style={{width:'75%'}}>{authDisplay}</p>
        <form onSubmit={this.handleSubmit}>
            <TextField
               onChange={this.handleInputChange}
               name="email"
               hintText="Email"
               floatingLabelText="Email"
               type="email"
             />
            <TextField
               onChange={this.handleInputChange}
               name="password"
               hintText="Password"
               floatingLabelText="Password"
               type="password"
             />
           <RaisedButton type="submit" label="login" className="SignIn-submit" primary={true} />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( SignIn )
