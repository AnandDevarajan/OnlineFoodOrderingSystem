import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import './AddProduct.css';

export const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const [productStock, setProductStock] = useState(0);
  const [productImage, setProductImage] = useState('');
  const [productHotelName, setProductHotelName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', productImage);
    formData.append('upload_preset', 'asskdb');

    Axios.post(
      'https://api.cloudinary.com/v1_1/dos8pkay6/image/upload',
      formData
    )
      .then((response) => {
        setImageUrl(response.data.url);
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = () => {
    Axios.post('http://localhost:3001/products/', {
      productName,
      productPrice,
      productDesc,
      productStock,
      imageUrl,
      productHotelName,
    })
      .then(() => {
        window.location.pathname = '/products';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='App'>
      <ToastContainer position='top-center' />
      <Container className='AddProduct'>
        <form onSubmit={onSubmit} className='btn btn-block btn-dark '>
          <h2 className='text-success'>Add a product</h2>
          <div className='form-group'>
            <label className='btn btn-block btn-dark '>
              Image :
              <input
                type='file'
                placeholder='choose an image'
                onChange={(e) => {
                  setProductImage(e.target.files[0]);
                }}
              />
              
              <button
                type='button'
                className='btn btn-success'
                onClick={uploadImage}
              >
                upload
              </button>
            </label>
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              required='true'
              name='poduct_name'
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control'
              required='true'
              placeholder='Description'
              onChange={(e) => {
                setProductDesc(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              required='true'
              className='form-control'
              placeholder='Price'
              name='price'
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              required='true'
              className='form-control'
              placeholder='Stock'
              onChange={(e) => {
                setProductStock(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              required='true'
              placeholder='Hotel Name'
              name='hotel_name'
              onChange={(e) => {
                setProductHotelName(e.target.value);
              }}
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Create Product
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
