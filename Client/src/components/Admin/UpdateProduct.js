import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';


export const UpdateProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productImage, setProductImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productHotelName, setProductHotelName] = useState('');
  const [productId, setProductId] = useState(localStorage.getItem('id'));
  const [product, setProduct] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/products/${productId}`)
      .then((response) => {
        setProductName(response.data[0].product_name);
        setProductPrice(response.data[0].price);
        setProductDesc(response.data[0].description);
        setProductStock(response.data[0].stock);
        setProductHotelName(response.data[0].hotel_name);
        setImageUrl(response.data[0].imageurl);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(product);
  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', productImage);
    formData.append('upload_preset', 'asskdb');

    Axios.post(
      'https://api.cloudinary.com/v1_1/dos8pkay6/image/upload',
      formData
    ).then((response) => {
      setImageUrl(response.data.url);
      console.log('success');
    });
  };

  const onSubmit = () => {
    Axios.put(`http://localhost:3001/products/${productId}`, {
      productName,
      productPrice,
      productDesc,
      productStock,
      imageUrl,
      productHotelName,
    }).then(() => {
      localStorage.removeItem('id');
      window.location.pathname = '/products';
    });
  };
  return (
    <div className='App'>
      <ToastContainer position='top-center' />
      <Container className='AddProduct'>
        <form onSubmit={onSubmit} className='btn btn-block btn-dark '>
          <h2 className='text-success'>Update a product</h2>
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
              placeholder='Name'
              defaultValue={productName}
              name='poduct_name'
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control'
              defaultValue={productDesc}
              placeholder='Description'
              onChange={(e) => {
                setProductDesc(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='Price'
              defaultValue={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              defaultValue={productStock}
              placeholder='Stock'
              onChange={(e) => {
                setProductStock(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='Name'
              defaultValue={productHotelName}
              name='hotel_name'
              onChange={(e) => {
                setProductHotelName(e.target.value);
              }}
            />
          </div>

          <button type='submit' className='btn btn-success'>
            Update product
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
