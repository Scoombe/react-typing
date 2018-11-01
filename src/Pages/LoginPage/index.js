import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid, Form, Button, Input, Message,
} from 'semantic-ui-react';
import { signIn, createUser } from '../../core/firebase-functions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    const { location } = this.props;
    this.signup = location.pathname === '/signup';
    this.onSignup = this.onSignup.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signinCallback = this.signinCallback.bind(this);
  }

  onSubmit(e) {
    const { target } = e;
    console.log(target.email);
    console.log(`email: ${target.email.value} password: ${target.password.value}`);
    if (this.signup) {
      createUser(target.email.value, target.password.value,
        target.username.value, this.signinCallback);
    } else {
      signIn(target.email.value, target.password.value, this.signinCallback);
    }
  }

  onSignup(e) {
    e.preventDefault();
    const { history } = this.props;
    this.signup = true;
    history.push('/signup');
  }

  signinCallback(error) {
    const { history } = this.props;
    console.log(`error: ${error}`);
    if (error) {
      this.setState({ error: error });
    } else {
      history.push('/');
    }
  }

  render() {
    const { error } = this.state;
    const buttonText = this.signup ? 'Sign up' : 'Log in';
    const errorHeader = `${buttonText} error!`;
    return (
      <div>
        <Grid>
          <Grid.Column width={6} />
          <Grid.Column width={4}>
            <Form onSubmit={this.onSubmit} error>
              { error && (
                <Message
                  error
                  header={errorHeader}
                  content={error}
                />
              )}
              <Form.Field control={Input} label="Email" name="email" placeholder="Email" />
              <Form.Field control={Input} type="password" name="password" label="Password" placeholder="Password" />
              { this.signup && <Form.Field control={Input} label="Username" name="username" placeholder="Username" /> }
              <Form.Group inline>
                <Form.Field control={Button}>{ buttonText }</Form.Field>
                { !this.signup && <Form.Field control={Button} onClick={this.onSignup}>Create Account</Form.Field> }
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column width={7} />
        </Grid>
      </div>
    );
  }
}

export default withRouter(LoginPage);
