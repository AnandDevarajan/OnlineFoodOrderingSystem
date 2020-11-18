const express = require('express');
const { stringify } = require('uuid');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

//GET ALL HOTEL
router.get('/', (req, res) => {
  let qr = 'SELECT * FROM HOTEL';
  con.query(qr, (err, result) => {
    if (err || result.length == 0) {
      return res.status(400).json({
        message: 'No products found',
      });
    }
    res.json(result);
  });
});

//GET A products from HOTEL
router.get('/:id', (req, res) => {
  let id = req.params.id;
  let qr = `SELECT * FROM PRODUCTS WHERE hotel_name='${id}';SELECT * FROM HOTEL WHERE hotel_name='${id}'`;
  con.query(qr, (err, result) => {
    if (err || result.length == 0) {
      console.log(err);
    }
    res.json(result);
  });
});
router.get('/getAHotel/:id', (req, res) => {
  let id = req.params.id;
  let qr = `SELECT * FROM HOTEL WHERE hotel_name='${id}'`;
  con.query(qr, (err, result) => {
    if (err || result.length == 0) {
      console.log(err);
    }
    res.json(result);
  });
});

//ADD A NEW HOTEL
router.post('/', (req, res) => {
  const { hotelName, hotelRating, contactNo, place, pincode } = req.body;
  const hotel_name = hotelName;
  const hotel_rating = hotelRating;
  const contact_no = contactNo;
  const hplace = place;
  const hpincode = pincode;
  con.query(
    'INSERT INTO HOTEL (hotel_name,hotel_rating,contact_no,place,pincode) VALUES (?,?,?,?,?)',
    [hotel_name, hotel_rating, contact_no, hplace, hpincode],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(424).json({
          message: 'Failed to add the product',
        });
      }
      return res.json({
        success: 'Successfully added new product',
      });
    }
  );
});

// UPDATE A HOTEL
router.put('/:id', (req, res) => {
  let id = req.params.id;
  const { hotelName, hotelRating, contactNo, place, pincode } = req.body;
  const hotel_name = hotelName;
  const hotel_rating = hotelRating;
  const contact_no = contactNo;
  const hplace = place;
  const hpincode = pincode;
  con.query(
    `UPDATE HOTEL SET hotel_name='${hotel_name}',hotel_rating=${hotel_rating},contact_no='${contact_no}',place='${hplace}',pincode=${hpincode} WHERE hotel_name='${id}';UPDATE PRODUCTS SET hotel_name='${hotel_name}' WHERE hotel_name='${id}' `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json({
        success: 'Successfully updated the product',
      });
    }
  );
});

router.put('/rate/:id', (req, res) => {
  let id = req.params.id;
  const { newRa } = req.body;
  const hotel_rating = newRa;

  con.query(
    `UPDATE HOTEL SET hotel_rating=${hotel_rating} WHERE hotel_name='${id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json({
        success: 'Successfully updated the product',
      });
    }
  );
});

router.get('/rating/:id', (req, res) => {
  let hid = req.params.id;
  con.query(
    `SELECT hotel_rating  FROM HOTEL where hotel_name='${hid}'`,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.json(result);
    }
  );
});

// DELETE A HOTEL
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let qr = `DELETE FROM HOTEL WHERE hotel_name='${id}'`;
  con.query(qr, (err, result) => {
    if (err) {
      return res.json({
        message: 'Failed to delete the product',
      });
    }
    res.json({
      success: 'Product deleted successfully',
    });
  });
});
module.exports = router;
