import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

export const AddHotel = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelRating, setHotelRating] = useState(0);
  const [contactNo, setContactNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [place, setPlace] = useState('');

  const onSubmit = () => {
    Axios.post('http://localhost:3001/hotels/', {
      hotelName,
      hotelRating,
      contactNo,
      place,
      pincode,
    }).then(() => {
      window.location.pathname = '/hotels';
    });
  };
  return (
    <div className='HotelStyling' background>
      <ToastContainer position='top-center' />
      <Container className='AddProduct'>
        <form onSubmit={onSubmit} className='btn btn-block btn-dark '>
          <h2 className='text-success'>Add a Hotel</h2>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              required='true'
              placeholder='Name'
              name='poduct_name'
              onChange={(e) => {
                setHotelName(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Place'
              required='true'
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              pattern='\d*'
              className='form-control'
              placeholder='Contact No'
              maxLength='10'
              minLength='10'
              required='true'
              name='price'
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              pattern='\d*'
              className='form-control'
              placeholder='Pincode'
              required='true'
              minLength='6'
              maxLength='6'
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Create Hotel
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
