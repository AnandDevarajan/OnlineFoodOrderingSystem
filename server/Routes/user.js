const express = require('express');
const config = require('../Config/DB_Config');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const saltRounds = 10;
const con = config.con;

//GET USERS
router.post('/register', (req, res) => {
  const { username, password, email, pincode, phno } = req.body;
  const user_name = username;
  const user_password = password;
  const user_email = email;
  const user_pincode = pincode;
  const user_phno = phno;
  bcrypt.hash(user_password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    con.query(
      `INSERT INTO USERS (user_name,user_password,user_email,user_pincode,user_phno) VALUES (?,?,?,?,?)`,
      [user_name, hash, user_email, user_pincode, user_phno],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({
      loogedIn: true,
      user: req.session.user,
    });
  } else {
    res.send({
      loogedIn: false,
    });
  }
});

router.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/signin');
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user_email = email;
  const user_password = password;
  con.query(
    `SELECT * FROM USERS WHERE user_email = ?;`,
    user_email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        bcrypt.compare(
          user_password,
          result[0].user_password,
          (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            } else {
              res.send({ message: 'invalid' });
            }
          }
        );
      } else {
        res.send({ message: 'user doesnt exists' });
      }
    }
  );
});
module.exports = router;