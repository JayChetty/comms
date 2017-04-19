
import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { incrementAsync } from './sagas'

test('incrementAsync Saga must call delay(1000)', () => {
  const gen = incrementAsync()
  expect(gen.next().value).toEqual(call(delay, 1000));
});

test('incrementAsync Saga must dispatch an INCREMENT action', () => {
  const gen = incrementAsync()
  gen.next().value
  expect(gen.next().value).toEqual(put({type: 'INCREMENT'}));
});

test('incrementAsync Saga must be done', () => {
  const gen = incrementAsync()
  gen.next().value
  gen.next().value
  expect(gen.next().value).toEqual( undefined );
});
