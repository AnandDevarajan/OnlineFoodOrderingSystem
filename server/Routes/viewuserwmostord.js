const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

/*
View User vs No of Orders
*/

router.get('/', (req, res) => {
    let qr = `SELECT user_id as label,COUNT(order_id) as y FROM ORDERS GROUP BY user_id`;
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

  /*
  400 --> Bad RequestThe request could not be understood by the server due to malformed syntax. 
  The client SHOULD NOT repeat the request without modifications.
  */