const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

/*
View Hotel_name vs No of Products
*/

router.get('/', (req, res) => {
    let qr = `SELECT  hotel_name as label ,COUNT(product_id) as y FROM PRODUCTS GROUP BY hotel_name`;
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