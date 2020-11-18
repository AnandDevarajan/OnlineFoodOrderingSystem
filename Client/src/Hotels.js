import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Cart } from './components/Product/Cart';
import Axios from 'axios';
import styled from 'styled-components';
import './Products.css';
import './App.css';

const searchBarStyle = {
  margin: '35px',
  position: 'center',
  size: '25px',
};

export const Hotels = () => {
  const [hotelList, setHotelList] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  console.log(admin);
  useEffect(() => {
    Axios.get('http://localhost:3001/hotels/').then((response) => {
      console.log(response.data);
      setHotelList(response.data);
    });
  }, []);

  const deleteHotel = (id) => {
    Axios.delete(`http://localhost:3001/hotels/${id}`).then((response) => {
      window.location.pathname = '/hotels';
    });
  };

  const viewHotelProducts = (id) => {
    localStorage.removeItem('hotel_name');
    localStorage.setItem('hotel_name', id);
    window.location.pathname = '/viewProducts';
  };

  return (
    <div className='HotelStyling'>
      <div>
        <div className='container-fluid d-flex justify-content-center'>
          <div className='row'>
            <div className='col-md-3'>
              <table className='table '>
                <thead className='thead-dark '>
                  <tr>
                    <th scope='col'>Hotel_Name</th>
                    <th></th>
                    <th scope='col'>Place</th>
                    <th></th>
                    <th scope='col'>Contact_No</th>
                    <th></th>
                    <th scope='col'>Pincode</th>
                    <th></th>
                    <th scope='col'>Rating</th>
                    <th></th>
                    <th></th>
                    <th>
                      {role == 1 && (
                        <button
                          className='btn btn-success '
                          onClick={() =>
                            (window.location.pathname = '/addHotel')
                          }
                          style={{ width: '200px' }}
                        >
                          Add Hotel
                        </button>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody > 
                {/* className='text-white'  ADD this in tbody tag to make text of table contents white*/}
                  {hotelList.map((val, key) => {
                    return (
                      <tr key={key} style={{ height: '3px' }}>
                        <td scope='row'>{val.hotel_name}</td>
                        <td></td>
                        <td>{val.place}</td>
                        <td></td>
                        <td>{val.contact_no}</td>
                        <td></td>
                        <td>{val.pincode}</td>
                        <td></td>
                        {val.hotel_rating == 0 ? (
                          <td>No Rating</td>
                        ) : (
                          <td>{val.hotel_rating} ⭐</td>
                        )}

                        <td></td>

                        <td>
                          <button
                            className='btn btn-success'
                            style={{ height: '35px', width: '100px' }}
                            onClick={() => viewHotelProducts(val.hotel_name)}
                          >
                            view
                          </button>
                        </td>

                        {role == 1 && (
                          <div>
                            <td>
                              <button
                                className='btn btn-warning'
                                style={{ height: '35px', width: '100px' }}
                                onClick={() => {
                                  localStorage.setItem('id', val.hotel_name);
                                  window.location.pathname = '/updateHotel';
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
                                  deleteHotel(val.hotel_name);
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
