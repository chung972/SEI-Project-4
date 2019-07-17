import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={2}>Name:</Label>
            <Col sm={10}>
              <Input type="name" name="name" id="name" placeholder="Bruce Wayne" value={this.state.name} onChange={this.handleChange}></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>Email:</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="email" placeholder="example@email.com" value={this.state.email} onChange={this.handleChange}></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password:</Label>
            <Col sm={10}>
              <Input type="password" name="password" id="password" placeholder="abc123" value={this.state.password} onChange={this.handleChange}></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="passwordConf" sm={2}>Confirm PW:</Label>
            <Col sm={10}>
              <Input type="password" name="passwordConf" id="passwordConf" placeholder="abc123" value={this.state.passwordConf} onChange={this.handleChange}></Input>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button disabled={this.isFormInvalid()}>Submit</Button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </Col>
          </FormGroup>
        </Form>









      </div>
    );
  }
}

export default SignupForm;
