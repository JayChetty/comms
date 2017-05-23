import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import './SignIn.css'
import AppHeader from './AppHeader.jsx'
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
      return <Redirect to="/groups"/>
    }
    return (
      <section className="SignIn">
        <p>{this.props.errorMessage}</p>
        <form onSubmit={this.handleSubmit}>
          <div className="SignIn-item">
            <label for="email">
              email
            </label>
            <input onChange={this.handleInputChange} name='email' type='email'/>
          </div>
          <div className="SignIn-item">
            <label for="password" >
              password
            </label>
            <input onChange={this.handleInputChange} name='password' type='password'/>
          </div>
          <div className="SignIn-item">
            <input className="SignIn-button" type="submit" value="submit" />
          </div>
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
