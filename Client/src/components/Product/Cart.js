import Axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import './Cart.css';
import StripeCheckout from 'react-stripe-checkout';
export const Cart = () => {
  const [product, setProduct] = useState({
    name: 'Assk Product',
  });
  const [cartList, setCartList] = useState([]);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneno, setphoneNo] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [productID, setProductId] = useState([]);

  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    Axios.get(`http://localhost:3001/cart/${userId}`)
      .then((response) => {
        console.log(response.data);
        setCartList(response.data);

        let temp = 0;
        for (const food of response.data) {
          temp = temp + food.qty * food.price;
        }
        setTotal(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      'content-type': 'application/json',
    };
    return fetch(`http://localhost:3001/payment/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log('status', status);
        let productIds = cartList.map((q) => {
          return q;
        });

        console.log(productIds);
        productIds.map((q) => {
          let i = q.product_id;
          let p = q.price;
          Axios.post(`http://localhost:3001/orders`, {
            i,
            address,
            pincode,
            phoneno,
            userId,
            p,
          })
            .then((response) => {
              Axios.delete(`http://localhost:3001/cart/`).then((response) => {
                window.location.pathname = '/orders';
              });
            })
            .catch((err) => console.log(err));
        });
        Axios.delete(`http://localhost:3001/cart/`).then((response) => {
          window.location.pathname = '/orders';
        });
      })
      .catch((error) => console.log(error));
  };

  const increaseQuantity = (id, qty) => {
    let temp = cartList;
    for (let food of temp) {
      if (food.cart_id === id) {
        food.qty += 1;
        break;
      }
    }
    setCartList(temp);
    temp = 0;
    for (const food of cartList) {
      temp = temp + food.qty * food.price;
    }
    setTotal(temp);
    console.log(cartList, total);
  };
  
  const decreaseQuantity = (id, qty) => {
    let temp = cartList;
    for (let food of temp) {
      if (food.cart_id === id && food.qty != 1) {
        food.qty -= 1;
        break;
      }
    }
    setCartList(temp);
    temp = 0;
    for (const food of cartList) {
      temp = temp + food.qty * food.price;
    }
    setTotal(temp);
    console.log(cartList, total);
  };

  const removeFromCart = (id) => {
    Axios.delete(`http://localhost:3001/cart/${id}`)
      .then((response) => {
        window.location.pathname = '/cart';
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="CartStyle">
      <h3 className='btn btn-block btn-success'>Cart</h3>
      <div className='row'>
        <div className='col-md-7'>
          {cartList.length == 0 ? (
            <h1 className='text success'>Your Cart is Empty</h1>
          ) : (
            <div>
              <table className='table'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>Item</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Quantity</th>
                  </tr>
                </thead>
                <tbody className='text-white'>
                  {cartList.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <img
                            src={val.imageurl}
                            alt=''
                            style={{ height: '80px', width: '80px' }}
                          />
                        </td>
                        <td>{val.product_name} </td>
                        <td>Rs {val.price}</td>
                        <td>
                          <button
                            className='btn-info'
                            style={{ width: '30px', border: 'none' }}
                            onClick={() => {
                              decreaseQuantity(val.cart_id, val.qty);
                            }}
                          >
                            -
                          </button>
                          {val.qty}
                          <button
                            className='btn-info'
                            style={{ width: '30px', border: 'none' }}
                            onClick={() => {
                              increaseQuantity(val.cart_id, val.qty);
                            }}
                          >
                            +
                          </button>
                        </td>

                        <td>
                          <button
                            className='btn btn-danger'
                            style={{ height: '35px', width: '100px' }}
                            onClick={() => {
                              removeFromCart(val.cart_id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td>
                      <button
                        style={{
                          padding: '3px',
                          border: 'none',
                          backgroundColor: '#8bcdcd',
                        }}
                      >
                        Total = Rs {total}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className='col-md-4'>
          <div className='btn btn-dark'>
            <h3>Order Details</h3>
            <input
              type='text'
              placeholder='address'
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type='text'
              minlength='6'
              maxLength='6'
              placeholder='pincode'
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
            <input
              type='text'
              minlength='10'
              maxLength='10'
              placeholder='phone no'
              onChange={(e) => {
                setphoneNo(e.target.value);
              }}
            />
            {
            cartList.length != 0 && (
              <StripeCheckout
                stripeKey='pk_test_51HlWbbJEXG38mpDmDT5F4JdHjrh1Av4J2GTKpzKPG1tsrrlK3ISEzCC1GYzAmZ0Jb3g3kSQjnBqJxKhDuhFdXnkH00WgC6JaJz'
                token={makePayment}>
                <button className='btn btn-success'>Order now</button>
              </StripeCheckout>
            )
            }
          </div>
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
