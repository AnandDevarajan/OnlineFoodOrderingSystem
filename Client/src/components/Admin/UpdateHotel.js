import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

export const UpdateHotel = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelRating, setHotelRating] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [place, setPlace] = useState('');
  const [hotelId, setHotelId] = useState(localStorage.getItem('id'));
  let history = useHistory();
  useEffect(() => {
    Axios.get(`http://localhost:3001/hotels/getAHotel/${hotelId}`)
      .then((response) => {
        setHotelName(response.data[0].hotel_name);
        setHotelRating(response.data[0].hotel_rating);
        setContactNo(response.data[0].contact_no);
        setPlace(response.data[0].place);
        setPincode(response.data[0].pincode);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = () => {
    Axios.put(`http://localhost:3001/hotels/${hotelId}`, {
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
    <div className='App'>
      <ToastContainer position='top-center' />
      <Container className='AddProduct'>
        <form onSubmit={onSubmit} className='btn btn-block btn-dark '>
          <h2 className='text-success'>Update a Hotel</h2>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='Name'
              type='text'
              defaultValue={hotelName}
              name='hotel_name'
              onChange={(e) => {
                setHotelName(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control'
              type='text'
              placeholder='Place'
              defaultValue={place}
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
              defaultValue={contactNo}
              name='price'
              maxLength='10'
              minLength='10'
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
              defaultValue={pincode}
              minLength='6'
              maxLength='6'
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
          </div>

          <button type='submit' className='btn btn-success'>
            Update Hotel
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
