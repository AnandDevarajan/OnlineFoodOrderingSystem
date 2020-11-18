import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

import './Products.css';
import './App.css';

const searchBarStyle = {
  margin: '35px',
  position: 'center',
  size: '25px',
};

export const ViewProduct = () => {
  const [productList, setProductList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [hname, setHname] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [hotelName, setHotelName] = useState(
    localStorage.getItem('hotel_name')
  );
  const [role, setRole] = useState(localStorage.getItem('role'));
  
  console.log(hotelName);
  useEffect(() => {
    Axios.get(`http://localhost:3001/hotels/${hotelName}`)
      .then((response) => {
        console.log(response.data);
        setProductList(response.data[0]);
        setHotelList(response.data[1]);
        localStorage.setItem('hname', response.data[0].hotel_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/products/${id}`).then((response) => {
      window.location.pathname = '/products';
    });
  };

  const addToCart = (val) => {
    Axios.post(`http://localhost:3001/cart/`, {
      product_id: val.product_id,
      product_name: val.product_name,
      price: val.price,
      imageurl: val.imageurl,
      userId,
    })
      .then((response) => {
        console.log(response);
        toast('Added to the cart', { type: 'success' });
      })
      .catch((err) => {
        toast('Already added to the cart', { type: 'warning' });
      });
  };
  return (
    <div>
      <ToastContainer position='top-center' />
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Hotel_Name</th>
            <th scope='col'>Place</th>
            <th scope='col'>Contact_No</th>
            <th scope='col'>Pincode</th>
            <th scope='col'>Rating</th>
          </tr>
        </thead>
        <tbody className='text-white'>
          {hotelList.map((val, key) => {
            return (
              <tr key={key} style={{ height: '3px' }}>
                <td scope='row'>
                  <font style={{ color: 'white' }}> {val.hotel_name}</font>
                </td>
                <td>
                  <font style={{ color: 'white' }}>{val.place}</font>
                </td>
                <td>
                  <font style={{ color: 'white' }}>{val.contact_no}</font>
                </td>
                <td>
                  <font style={{ color: 'white' }}>{val.pincode}</font>
                </td>
                <td>
                  <font style={{ color: 'white' }}>{val.hotel_rating} ⭐</font>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={searchBarStyle}>
  
      </div>
      {productList.length === 0 ? (
        <div>
          <h1>No items available</h1>
          {role == 1 && (
            <button
              className='btn  btn-success'
              onClick={() => {
                window.location.pathname = '/addViewProduct';
              }}
            >
              Add Product
            </button>
          )}
        </div>
      ) : (
        <div className='product-imagestyle'>
          <div className='btn btn-block btn-success m-2'>
            <h3 className='text-dark'>Items Available</h3>
          </div>
          <div className='container-fluid d-flex justify-content-center'>
            <table className='table'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Image</th>
                  <th scope='col'>Product_Name</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Stock</th>
                  <th scope='col'>Price</th>
                  <th></th>
                  <th>
                    {role ==1 && (
                      <button
                        className='btn  btn-success '
                        onClick={() => {
                          window.location.pathname = '/addViewProduct';
                        }}
                      >
                        Add Product
                      </button>
                    )}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-white'> 
                {productList.map((val, key) => {
                  return (
                    <tr key={key} style={{ height: '3px' }}>
                      <td>
                        <img
                          src={val.imageurl}
                          alt=''
                          style={{ height: '100px', width: '100px' }}
                        />
                      </td>
                      <td>{val.product_name}</td>
                      <td>{val.description}</td>

                      <td>{val.stock}</td>
                      <td>Rs {val.price}</td>
                      <td>
                        {role == 2 && (
                          <button
                            className='btn btn-success'
                            style={{ height: '35px', width: '100px' }}
                            onClick={() => addToCart(val)}
                          >
                            Add
                          </button>
                        )}
                      </td>
                      
                      {role == 1 && (
                        <div>
                          <td>
                            <button
                              className='btn btn-warning'
                              style={{ height: '35px', width: '100px' }}
                              onClick={() => {
                                localStorage.setItem('id', val.product_id);
                                window.location.pathname = '/updateProduct';
                              }}
                            >
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              className='btn btn-danger'
                              style={{ height: '35px', width: '100px' }}
                              onClick={() => {
                                deleteProduct(val.product_id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </div>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
      <br />
    </div>
  );
};
