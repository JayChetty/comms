import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'

import {
  Redirect
} from 'react-router-dom'

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
    console.log("about to submit", this.state)
  }
  render() {
    console.log('rendering sign in', this.props)
    if(this.props.user){
      return <Redirect to="/events"/>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> Sign In!</h2>
          <p>{this.props.errorMessage}</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label onChange={this.handleInputChange}>
            Email:
            <input name='email' type='email'/>
          </label>
          <label onChange={this.handleInputChange}>
            Password:
            <input name='password' type='password'/>
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch)=>{
  return { dispatch: dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( SignIn )
