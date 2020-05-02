import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const Navbars = () => (
  <React.Fragment>
    <Navbar
      style={{ paddingLeft: '100px' }}
      bg="gradient-light"
      variant="light"
    >
      <LinkContainer to='/'>
        <Navbar.Brand >
          Invoice APP
        </Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to='/Invoices'>
          <Nav.Link >
            Invoices
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/Products'>
          <Nav.Link >
            Products
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/Customers'>
          <Nav.Link >
            Customers
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  </React.Fragment>
)   