const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

router.get('/:id', (req, res) => {
  let id = req.params.id;
  con.query(`SELECT * FROM ORDERS WHERE user_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/', (req, res) => {
  con.query('SELECT * FROM ORDERS', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/', (req, res) => {
  const { i, address, pincode, phoneno, p, userId } = req.body;
  const productID = i;
  const ototal = p;
  const user_id = userId;
  const oaddress = address;
  const ophno = phoneno;
  const opincode = pincode;
  const currentDate = new Date();
  con.query(
    'INSERT INTO ORDERS (user_id,product_id,address,pincode,phone_no,time,total) VALUES (?,?,?,?,?,?,?)',
    [user_id, productID, oaddress, opincode, ophno, currentDate, ototal],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(424).json({
          message: 'Failed to add the product',
        });
      } else {
        console.log(result);
        return res.json({
          success: 'Successfully added new product',
        });
      }
    }
  );
});
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  con.query(`DELETE FROM ORDERS WHERE order_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let ostatus = req.body.status;
  console.log(ostatus);
  con.query(
    `UPDATE ORDERS SET status = ? WHERE order_id = ?`,
    [ostatus, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
