import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login, resetAlert  } from '../actions/UserActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.props.resetAlert();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(user);
  }

  render() {
    const { user } = this.props;
    const { alert } = user;
    if(user.userLoggedIn !== null) {
      return <Redirect to='/' />
    }
    return (
      <Container>
        {alert.visible &&
          <Alert color="danger">
            {alert.message.map((message, i) => {
              return (
                <span key={i}>{message} <br /></span>
                )
            })}
          </Alert>
        }
        <Row>
          <Col md="4"></Col>
          <Col md="4">
            <h1>Log In</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" onChange={this.handleChange} />
              </FormGroup>
              <Button color="success">Log In</Button>
            </Form>
          </Col>
          <Col md="4"></Col>
        </Row>
      </Container>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  resetAlert: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { login, resetAlert })(Login);