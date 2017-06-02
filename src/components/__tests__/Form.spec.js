import React from 'react';
import Form from '../Form';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// it('renders correctly', () => {
// })
const form = {
  default:{a:1, b:2},
  labels: {a:"A", b:"B"},
  name: "Test",
  status: "open"
}

const member={
  displayName:"Jay"
}

it('renders correctly', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <Form
        form={form}
        event={{}}
        member={member}
      />
    </MuiThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
