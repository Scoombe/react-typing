import React from 'react';
import {
  Grid, Form, Button, Input,
} from 'semantic-ui-react';

function LoginPage(props) {
  const { location } = props;
  const signup = location.pathname === '/signup';
  console.log(`signup: ${signup} pathName: ${location.pathname} `);
  return (
    <div>
      <Grid>
        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form>
            <Form.Field control={Input} label="Email" placeholder="Email" />
            <Form.Field control={Input} type="password" label="password" placeholder="Password" />
            <Form.Group inline>
              <Form.Field control={Button}>Submit</Form.Field>
              { !signup && <Form.Field control={Button}>Signup</Form.Field> }
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column width={7} />
      </Grid>
    </div>
  );
}

export default LoginPage;
