import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

function LoginPage() {
  return (
    <Grid>
      <Grid.Column width={7} />
      <Grid.Column width={3}>
        <Form>
          <Form.field>
            <input label="Email" placeholder="Email" />
          </Form.field>
          <Form.field>
            <input label="password" type="password" placeholder="Password" />
          </Form.field>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Grid.Column>
      <Grid.Column width={7} />
    </Grid>
  );
}

export default LoginPage;
