import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut, isUserLoggedIn } from '../actions/UserActions';

class AppNavbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.props.isUserLoggedIn();
  }

  render() {
    const isUserLoggedIn = this.props.user.userLoggedIn !== null ? true : false;
    let isUserAdmin = false;
    if(isUserLoggedIn){
      isUserAdmin = this.props.user.userLoggedIn.role === 'admin';
    }
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand className="mx-auto" tag={Link} to="/">Sudoku</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isUserLoggedIn ? (
                  <React.Fragment>
                    {/* <NavItem>
                      <NavLink href="test">
                        My Profile
                      </NavLink>
                    </NavItem> */}
                    {isUserAdmin &&
                      <NavItem>
                        <NavLink tag={Link} to="/AddSudoku">
                          Add Sudoku
                        </NavLink>
                      </NavItem>
                    }
                    <NavItem>
                      <NavLink tag={Link} to="/" onClick={this.props.logOut}>
                        Log Out
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <NavItem>
                        <NavLink tag={Link} to="/Login">
                          Log In
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} to="/CreateAccount">
                          Create Account
                        </NavLink>
                      </NavItem>
                    </React.Fragment>
                  )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

AppNavbar.propTypes = {
  logOut: PropTypes.func,
  isUserLoggedIn: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logOut, isUserLoggedIn })(AppNavbar);