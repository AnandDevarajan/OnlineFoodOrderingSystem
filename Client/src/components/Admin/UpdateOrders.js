import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import './form.css';
export const UpdateOrders = () => {
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [orderList, setOrderList] = useState([]);
  const [status, setStatus] = useState('');
  const [name, setName] = useState(localStorage.getItem('username'));
  useEffect(() => {
    Axios.get(`http://localhost:3001/orders/`).then((response) => {
      setOrderList(response.data);
      console.log(orderList);
    });
  }, []);

  const viewProduct = (val) => {
    localStorage.setItem('pid', val.product_id);
    window.location.pathname = '/viewFromOrders';
  };
  const updateStatus = (val) => {
    let id = val.order_id;
    Axios.put(`http://localhost:3001/orders/${id}`, {
      status,
    }).then((response) => {
      toast('updated successfully', { type: 'success' });
    });
  };

  return (
    <div className='container'>
      <div>
        <ToastContainer position='top-center' />
        <h1>Order Details</h1>
      </div>
      <div>
        <table className='table'>
          <thead className='thead-dark'>
            <th>OrderID</th>
            <th>ProductID</th>
            <th>Amount</th>
            <th>CustID</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Phone No</th>
            <th>Status</th>
            <th></th>
            <th></th>
            <th></th>
          </thead>

          {orderList.map((val, key) => {
            return (
              <tbody>
                <tr>
                  <td>{val.order_id}</td>
                  <td>{val.product_id}</td>
                  <td>{val.total}</td>
                  <td>{val.user_id}</td>
                  <td>{val.address}</td>
                  <td>{val.pincode}</td>
                  <td>{val.phone_no}</td>
                  <td>
                    {val.status != 'Delivered' ? (
                      <select
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        style={{ width: '120px', height: '35px' }}
                      >
                        <option>{val.status}</option>
                        <option>Picked Up</option>
                        <option>Delivered</option>
                      </select>
                    ) : (
                      <button className='btn btn-success'>Delivered</button>
                    )}
                  </td>
                  <td>
                    {val.status!='Delivered' ? (
                       <button
                       className='btn btn-success'
                       onClick={() => {
                         updateStatus(val);
                       }}
                     >
                       update
                     </button>
                    ):(
                      <button
                      className='btn btn-primary '
                      style={{ border: 'none' }}
                      onClick={() => {
                        viewProduct(val);
                      }}
                    >
                      View
                    </button>
                    )}
                   
                  </td>
                  <td>
      
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
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
