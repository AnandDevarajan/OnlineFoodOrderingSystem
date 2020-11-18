import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './form.css';
export const Order = () => {
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/orders/${userId}`).then((response) => {
      setOrderList(response.data);
      console.log(orderList);
    });
  }, []);

  const viewProduct = (val) => {
    localStorage.setItem('pid', val.product_id);
    window.location.pathname = '/viewFromOrders';
  };
  const cancelOrder = (val) => {
    let id = val.order_id;
    Axios.delete(`http://localhost:3001/orders/${id}`).then((response) => {
      toast('Successfully cancelled the order', { type: 'success' });
      window.location.pathname = '/orders';
    });
  };

  const rateProduct = (id) => {
    localStorage.setItem('rid', id);
    window.location.pathname = '/rateHotel';
  };
  return (
    <div className='container'>
      <div>
        <ToastContainer position='top-center' />
      </div>
      <div>
        {orderList.length === 0 ? (
          <h1>No orders Found</h1>
        ) : (
          <div>
            <h1>Order Details</h1>
            <table className='table'>
              <thead className='thead-dark'>
                <th>Order id</th>
                <th>Product id</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Phone No</th>
                <th>Status</th>
                <th></th>
              </thead>

              {orderList.map((val, key) => {
                return (
                  <tbody >
                    <tr>
                      <td>{val.order_id}</td>
                      <td>{val.product_id}</td>
                      <td>{val.total}</td>
                      <td>{val.address}</td>
                      <td>{val.pincode}</td>
                      <td>{val.phone_no}</td>
                      {val.status === 'Delivered' ? (
                        <td>
                          <button
                            className='btn-success'
                            style={{ border: 'none' }}
                          >
                            {val.status}
                          </button>
                        </td>
                      ) : (
                        <td>
                          <button
                            className='btn-warning'
                            style={{ border: 'none' }}
                          >
                            {val.status}
                          </button>
                        </td>
                      )}

                      <td>
                        <button
                          className='btn btn-success '
                          style={{ border: 'none' }}
                          onClick={() => {
                            viewProduct(val);
                          }}
                        >
                          View
                        </button>
                        {val.status != 'Delivered' ? (
                          <button
                            className='btn btn-danger '
                            style={{ border: 'none' }}
                            onClick={() => {
                              cancelOrder(val);
                            }}
                          >
                            cancel
                          </button>
                        ) : (
                          <button
                            className='btn btn-warning '
                            style={{ border: 'none' }}
                            onClick={() => {
                              rateProduct(val.product_id);
                            }}
                          >
                            Rate
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
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
