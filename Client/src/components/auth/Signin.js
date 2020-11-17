import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import './form.css';
import { Container } from 'react-bootstrap';

export function Signin () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userdata, setUserData] = useState(0);
  const [loggedIn, setLoggedIn] = useState('');
  Axios.defaults.withCredentials = true;


  const onSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/users/login', {
    email,password,
    })
      .then((response) => {
        console.log(response.data[0])
        setUserData(response.data[0].user_id);
        localStorage.setItem('role', response.data[0].user_role);
        localStorage.setItem('user_id', response.data[0].user_id);
        localStorage.setItem('username', response.data[0].user_name);
        window.location.pathname = '/products';
      })
      .catch((err) => {
        toast('Invalid email/password', { type: 'error' });
        console.log(err);
      });
  };


  useEffect(() => {
    Axios.get('http://localhost:3001/users/login')
      .then((response) => {

        if (response.data.loggedIn === true) {
          window.location.pathname = '/products';
          localStorage.setItem('role', response.data[0].user_role);
          localStorage.setItem('user_id', response.data[0].user_id);
          localStorage.setItem('username', response.data[0].user_name);
          localStorage.setItem('loggedIn', response.data.loggedIn);
          console.log(response.data.user[0].user_name);
          console.log(response.data);
        }

      }).catch((err) => {
        console.log(err);
      });
  }, []);


  const signUp = () => {
    window.location.pathname = '/signup';
  };


  return (
    <div className='Appsignin'>
      <ToastContainer position='top-right' />
      <Container className="container">
        <br />
          <br />
          <br />
          <div>
          <form onSubmit={onSubmit} className='btn btn-block'>
          
          <h2 className='text-dark'>Login Page</h2>
          <div className='form-group'>
          
          <i class="fa fa-envelope" margin-left="5px" size="20px"></i><input
              className='form-control'
              type='text'
              placeholder='username'
              required='true'
              name='user_name'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            
          </div>

          <div className='form-group' className="w3-opacity-max">
          <i class="fa fa-lock" align="left" margin-left="5px"></i>
            <input
              type='password'
              required='true'
              class='glyphicon glyphicon-lock'
              className='form-control'
              placeholder='password'
              name='user_password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type='submit' className='btn btn-success'>
            Login
          </button>
        </form>

            </div>
        
      </Container>
      <br />
      <br />
      <div>
      <h5 onClick={signUp} className='text-white' style={{marginLeft:'500px'}}>Dont have an existing Account? Click Here To Create One..</h5>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
