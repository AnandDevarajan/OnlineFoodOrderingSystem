import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import { Container } from 'react-bootstrap';
import './form.css';

export const Signup = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [phno, setPhno] = useState('');

  Axios.defaults.withCredentials = true;
  const onSubmit = () => {
    Axios.post('http://localhost:3001/users/register', {
      username,
      password,
      email,
      pincode,
      phno,
    }).then((window.location.pathname = '/signin'));
  };
  return (
    <div className='Appsignup'>
      <ToastContainer position='top-center' />

      <Container>
        <form onSubmit={onSubmit} className='btn btn-block  '>
          <h2 className='text-dark'>CREATE NEW ACCOUNT</h2>

          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              required='true'
              name='user_name'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className='form-group'>
            <input
              className='form-control'
              type='email'
              placeholder='Email'
              required='true'
              name='user_email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              required='true'
              className='form-control'
              minlength='8'
              maxlength='15'
              placeholder='password'
              name='user_password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              pattern='\d*'
              className='form-control'
              placeholder='user_pincode'
              required='true'
              minLength='6'
              maxLength='6'
              onChange={(e) => {
                if (e.target.value != null) {
                  if (e.target.value < 0) {
                    toast(
                      'The Pincode you entered is negative.Please Enter Again',
                      { type: 'error' }
                    );
                  } else {
                    setPincode(e.target.value);
                  }
                }
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              pattern='\d*'
              className='form-control'
              placeholder='user_phno'
              maxLength='10'
              minLength='10'
              required='true'
              name='user_phno'
              onChange={(e) => {
                if (e.target.value < 0) {
                  toast(
                    'The Phone number you entered is negative.Please Enter Again',
                    { type: 'error' }
                  );
                } else {
                  setPhno(e.target.value);
                }
              }}
            />
          </div>

          <button type='submit' className='btn btn-success'>
            Create User
          </button>
        </form>
      </Container>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
