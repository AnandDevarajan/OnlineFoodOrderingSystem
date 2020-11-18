import Axios from 'axios';
import React, { useState, useEffect } from 'react';
export const RateHotel = () => {
  const [rateId, setRateId] = useState(localStorage.getItem('rid'));
  const [hid, setHid] = useState('');
  const [list, setList] = useState([]);
  const [rate, setRate] = useState('');
  const [initRate, setinitRate] = useState('');
  const [stat, setStat] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const respHotel = await Axios.get(
        `http://localhost:3001/products/${rateId}`
      );
      setHid(respHotel.data[0].hotel_name);
      setList(respHotel.data);
    };
    fetchData();
  }, []);

  const giveRate = () => {
    Axios.get(`http://localhost:3001/hotels/rating/${hid}`).then((respone) => {
      console.log(respone);
      setinitRate(respone.data[0].hotel_rating);
    });
    setStat(!stat);
  };
  const submitRating = () => {
    console.log('init' + initRate + 'rate' + rate);
    let newRa = initRate / 2 + rate / 2;
    console.log('new' + newRa);
    Axios.put(`http://localhost:3001/hotels/rate/${hid}`, {
      newRa,
    });
    setinitRate('');
    setRate('');
    newRa = 0;
    localStorage.removeItem('rid');
    setStat(!stat);
    window.location.pathname = '/orders';
  };
  return (
    <div>
      <div className='container'>
        {list.map((val, key) => {
          return (
            <div key={key}>
              <h1>Rate {val.hotel_name}</h1>
              <select
                onChange={(e) => {
                  setRate(e.target.value);
                }}
              >
                <option>Select</option>
                <option>1</option>
                <option>2 </option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          );
        })}
        {stat == false ? (
          <button className='btn btn-warning ' onClick={giveRate}>
            Submit Rating
          </button>
        ) : (
          <button className='btn btn-success ' onClick={submitRating}>
            Confirm
          </button>
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
    </div>
  );
};
