import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { createUser } from '../actions/UserActions';
import PropTypes from 'prop-types';

class CreateAccount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      alert: { visible: false, text: "Sorry! Something went wrong" }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.createUser(newUser);
    // axios
    // .post('/api/users', newUser)
    // .then(res => {
    //   alert("User created");
    // })
    // .catch((err) => {
    //   this.setState({
    //     alert: { ...this.state.alert, visible: true }
    //   });
    //   console.log(this.state.alert);
    //   if(err.response.status === 409){
    //     this.setState({
    //       alert: { ...this.state.alert, text: err.response.data.errors.username.message}
    //     });
    //   }
      
    // })
  }

  render() {
    console.log(this.props.user);
    const { alert } = this.props.user;
    return (
      <Container>
        {alert.visible &&
          <Alert color="danger">
            {alert.message}
          </Alert>
        }
        <Row>
          <Col md="4"></Col>
          <Col md="4">
            <h1>Create Account</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" onChange={this.handleChange} />
              </FormGroup>
              <Button color="success">Create Account</Button>
            </Form>
          </Col>
          <Col md="4"></Col>
        </Row>
      </Container>
    )
  }
}

CreateAccount.propTypes = {
  createUser: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { createUser })(CreateAccount);