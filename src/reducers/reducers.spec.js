import reducer from './reducers'

test('starts off with null user', () => {
  expect(reducer(undefined, {}).user).toEqual(null);
});

test('starts off with null authError', () => {
  expect(reducer(undefined, {}).authError).toEqual(null);
});

test('starts off with empty events object', () => {
  expect(reducer(undefined, {}).events).toEqual({});
});

test('starts off with empty groups object', () => {
  expect(reducer(undefined, {}).events).toEqual({});
});

test('sets events', () => {
  const dummyEvents = { e1:{}, e2:{} }
  expect(reducer(undefined, {type: "SET_EVENTS", events: dummyEvents}).events).toEqual(dummyEvents);
});

test('sets user', () => {
  const dummyUser= { uid:"lala" }
  expect(reducer(undefined, {type: "SET_USER", user: dummyUser}).user).toEqual(dummyUser);
});

test('sets first group', () => {
  const dummyGroup= { name:"lala" }
  const groupId = "g1"
  expect(reducer(undefined,
    {type: "SET_GROUP",
     groupId:groupId,
     group:dummyGroup}).groups)
  .toEqual( { [groupId]:dummyGroup} );
});
