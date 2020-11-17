const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

//GET ALL PRODUCTS from cart
router.get('/:id', (req, res) => {
  let id = req.params.id;
  let qr = `SELECT * FROM CART WHERE user_id=${id}`;
  con.query(qr, (err, result) => {
    if (err || result.length == 0) {
      return res.status(400).json({
        message: 'No products found',
      });
    }
    res.json(result);
  });
});

//ADD A NEW PRODUCT to cart
router.post('/', (req, res) => {
  const { product_id, product_name, price, imageurl, userId } = req.body;
  const productID = product_id;
  const productName = product_name;
  const Pprice = price;
  const Pimageurl = imageurl;
  const user_id = userId;
  con.query(
    `INSERT INTO CART (product_id,product_name,price,imageurl,user_id) VALUES (?,?,?,?,?)`,
    [productID, productName, Pprice, Pimageurl, user_id],
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
// DELETE ALL PRODUCT from cart
router.delete('/', (req, res) => {
  let qr = `DELETE FROM CART`;
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

//UPDATE A PRODUCT from cart

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let qty = req.body.quantity;
  con.query(
    `UPDATE CART set qty=? WHERE cart_id=?`,
    [qty, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 'success',
        });
      }
    }
  );
});

// DELETE A PRODUCT from cart
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let qr = `DELETE FROM CART WHERE cart_id=${id}`;
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
