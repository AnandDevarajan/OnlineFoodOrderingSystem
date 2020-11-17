require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoute = require('./Routes/product');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cartRoute = require('./Routes/cart');
const hotelRoute = require('./Routes/hotel');
const paymentRoute = require('./Routes/payment');
const userRoute = require('./Routes/user');
const orderRoute = require('./Routes/order');
const viewProd = require('./Routes/viewmostordprod');
const viewUserOrd = require('./Routes/viewuserwmostord');
const viewUserProd = require('./Routes/viewusersordmostprod');
const viewHotel = require('./Routes/viewhotelwmostproducts');
const viewOrder = require('./Routes/viewordwmostprod');
const app = express();

const port = 3001 || process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: 'user_id',
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use('/', (req, res) => {
  res.send('Online Food Ordering System');
});

app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/payment', paymentRoute);
app.use('/hotels', hotelRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);
app.use('/viewprod',viewProd);
app.use('/vieworder',viewOrder);
app.use('/viewuserOrd',viewUserOrd);
app.use('/viewuserProd',viewUserProd);
app.use('/viewhotel',viewHotel);

app.listen(port, () => console.log(`Server running on port ${port}`));
