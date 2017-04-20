
import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {firebaseGetCurrentUser, firebaseSignin } from './firebase_helpers'

import { getCurrentUser, incrementAsync, signInSubmit } from './sagas'

// test('incrementAsync Saga must call delay(1000)', () => {
//   const gen = incrementAsync()
//   expect(gen.next().value).toEqual(call(delay, 1000));
// });
//
// test('incrementAsync Saga must dispatch an INCREMENT action', () => {
//   const gen = incrementAsync()
//   gen.next()
//   expect(gen.next().value).toEqual(put({type: 'INCREMENT'}));
// });
//
// test('incrementAsync Saga must be done', () => {
//   const gen = incrementAsync()
//   gen.next()
//   gen.next()
//   expect(gen.next().value).toEqual( undefined );
// });

//signinSubmit
test('signInSubmit must contact auth to try to signin', () => {
  const userDetails = {email: "person@email.com", password: "password"}
  const gen = signInSubmit(userDetails)
  expect(gen.next().value).toEqual( call(firebaseSignin, userDetails) );
});

test('signInSubmit should set user if returned user from auth', () => {
  const userDetails = {email: "person@email.com", password: "password"}
  const user = {detail: "somedetails"}
  const gen = signInSubmit(userDetails)
  gen.next()
  expect( gen.next({user}).value ).toEqual( put({ type: "SET_USER", user}) );
});

test('signInSubmit should set errror if error returned from auth', () => {
  const userDetails = {email: "person@email.com", password: "password"}
  const error = {message: "somedetails"}
  const gen = signInSubmit(userDetails)
  gen.next()
  expect( gen.next({error}).value ).toEqual( put({ type: "SET_AUTH_ERROR", error: error.message}) );
});

//getCurrentUser
test('getCurrentUser should request current user', () => {
  const gen = getCurrentUser()
  expect(gen.next().value).toEqual( call(firebaseGetCurrentUser) );
});

test('getCurrentUser should set user if received user', () => {
  const gen = getCurrentUser()
  gen.next()
  const userDetails = {email: "test@email.com"}
  expect(gen.next(userDetails).value).toEqual( put({ type: "SET_USER", user: userDetails}) );
});

test('getCurrentUser should do nothing if no user', () => {
  const gen = getCurrentUser()
  gen.next()
  const userDetails = null
  expect(gen.next(userDetails).value).toEqual( undefined );
});
