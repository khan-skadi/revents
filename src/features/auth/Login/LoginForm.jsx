import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { login, socialLogin } from '../authActions.js';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin.jsx';

const actions = {
  login,
  socialLogin
};

const LoginForm = ({ login, socialLogin, handleSubmit, error, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <Button loading={submitting} fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm' })(LoginForm));
