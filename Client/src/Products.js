import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
// import { Cart } from './components/Product/Cart';
import Axios from 'axios';
import styled from 'styled-components';
import './Products.css';
import './App.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
  MDBContainer,
} from 'mdbreact';

const searchBarStyle = {
  margin: '35px',
  position: 'center',
  size: '25px',
};

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  let history = useHistory();

  useEffect(() => {
    Axios.get('http://localhost:3001/products/').then((response) => {
      console.log(response.data);
      setProductList(response.data);
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
        toast('Added to the cart', { type: 'success' });
      })
      .catch((err) => {
        toast('Already added to the cart', { type: 'warning' });
      });
  };

  return (
    <div>
      <ToastContainer position='top-right' />
      <div style={searchBarStyle}>
      </div>
      <div>
        <div className='container-fluid d-flex justify-content-center'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Food</th>
                {role == 1 && <th scope='col'>Id</th>}
                <th scope='col'>Name</th>
                <th scope='col'>Description</th>
                <th scope='col'>Hotel</th>
                <th scope='col'>Price</th>
                <th>
                  {role == 1 && (
                    <button
                      className='btn  btn-success '
                      onClick={() => (window.location.pathname = '/addProduct')}
                      style={{ width: '200px' }}>
                      Add Product
                    </button>
                  )}
                </th>
                <th></th>
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
                        style={{ height: '130px', width: '130px' }}
                      />
                    </td>
                    {role == 1 && <td>{val.product_id}</td>}
                    <td>
                     {val.product_name}
                    </td>
                    <td>
                     {val.description}
                    </td>
                    <td>
                     {val.hotel_name}
                    </td>
                    <td>
                   Rs {val.price} 
                    </td>
                    {role == 2 && (
                      <td>
                        <button
                          className='btn btn-success'
                          style={{ height: '35px', width: '100px' }}
                          onClick={() => addToCart(val)}
                        >
                          Add
                        </button>
                      </td>
                    )}

                    {role == 1 && (
                      <div>
                        <td>
                          <button
                            className='btn btn-warning'
                            style={{
                              height: '35px',
                              width: '100px',
                              backgroundColor: '#f8c61c',
                            }}
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
