const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

/*
View Product vs No of Orders 
*/

router.get('/', (req, res) => {
    let qr = `SELECT product_id as label, COUNT(order_id) as y  FROM ORDERS GROUP BY product_id`;
    con.query(qr, (err, result) => {
      if (err || result.length == 0) {
        console.log(err);
      }
      else
      {
        console.log(result);
        res.status(200).json(
          {
            data:result
          }
        );
      }
      
    });
  });

  module.exports = router;