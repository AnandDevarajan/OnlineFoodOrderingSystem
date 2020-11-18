import React from 'react';
import { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import Axios from 'axios';
const img = require('./logo.png');

const divStyle1 = {
  width: '327px',
  height: '69px',
  backgroundImage: `url(${img})`,
};

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: #ffffff;
    font-family: Sans-Serif;
    &:hover {
      color: grey;
    }
  }
  .navbar-image {
    background-image: url(./logo.png);
    background-repeat: no-repeat;
    width: 10px;
    height: 20px;
  }
  .navbar-brand {
    font-size: 1.5em;
    color: #9fffcb;
    &:hover {
      color: green;
    }
  }
  .form-center {
    position: absolute;
    left: 25%;
    right: 25%;
  }

  .navbar-style {
    width: 100%;
    font-size: 18px;
    font-family: helevita;
    margin-right: 10px;
    text-align: right;
    flex-direction: row;
    color: grey;
    background-attachment: fixed;
  }

  .navbar-mainstyle {
    font-size: 20px;
    font-family: sans-serif;
    color: rgb(255, 255, 255);
  }
`;
export const NavigationBar = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [name, setName] = useState(localStorage.getItem('username'));
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
  const [color, setColor] = useState('');
  const signOut = () => {
    Axios.get('http://localhost:3001/users/signout').then((response) => {
      localStorage.clear();
      window.location.pathname = '/signin';
      console.log(response);
    });
  };

  return (
    <Styles>
      <Navbar style={{ backgroundColor: '#222831', zIndex: '100' }} expand='lg'>
        <Navbar.Brand href='/'>
          <div style={divStyle1}>
          </div>
          <div>
            <h3>Food Ordering System </h3>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {role == 1 && (
            <Nav className='navbar-mainstyle'>
              <Nav.Item>
                <Nav.Link href='/'>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/about'>About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/products'>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/hotels'>Hotels</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/adminOrders'>Orders</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href='/viewhotelwmostprod'>R1</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href='/viewmostordprod'>R2</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href='/viewusersordmostprod'>R3</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href='/viewuserwmostord'>R4</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href='/viewordwmostprod'>R5</Nav.Link>
              </Nav.Item>

              <Nav.Link
                className='text-danger'
                href='/signout'
                onClick={signOut}
              >
                Signout
              </Nav.Link>
              <Nav.Item style={{ marginLeft: '300px' }}>
                <Nav.Link className='text-success'>Welcome {name}</Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {role == 2 && (
            <Nav className='navbar-mainstyle'>
              <Nav.Item>
                <Nav.Link href='/'>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/about'>About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/products'>Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/hotels'>Hotels</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/cart'>Cart</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/orders'>Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className='text-danger'
                  href='/signout'
                  onClick={signOut}
                >
                  Signout
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginLeft: '400px' }}>
                <Nav.Link className='text-success'>Welcome {name}</Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {role != 1 && role != 2 && (
            <Nav className='navbar-style'>
              <Nav.Item>
                <Nav.Link href='/signin'>SignIn</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/signup'>SignUp</Nav.Link>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};
