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

export default class AppNavbar extends Component {

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

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand className="mx-auto" tag={Link} to="/">Sudoku</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="test">
                    My Records
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="test">
                    Sign Out
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/CreateAccount">
                    Create Account
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
