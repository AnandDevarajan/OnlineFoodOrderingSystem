import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { Home } from './Home';
import { About } from './About';
import { Products } from './Products';
import { AddProduct } from './components/Admin/AddProduct';
import { Cart } from './components/Product/Cart';
import { Order } from './components/auth/Order';
import { AddHotel } from './components/Admin/AddHotel';
import { UpdateHotel } from './components/Admin/UpdateHotel';
import { Signin } from './components/auth/Signin';
import { Signup } from './components/auth/Signup';
import { UpdateProduct } from './components/Admin/UpdateProduct';
import { Hotels } from './Hotels';
import { ViewProduct } from './components/Product/ViewProduct';
import { ViewFromOrder } from './components/Product/ViewFromOrder';
import { UpdateOrders } from './components/Admin/UpdateOrders';
import { AddProductFromHotel } from './components/Admin/AddProductFromHotel';
import { RateHotel } from './components/auth/RateHotel';
import ViewHotelwmostProd from './ViewHotelwmostProd';
import ViewmostOrdProd from './ViewMostOrderedProd';
import ViewUsersOrdMostProd from './ViewUsersOrdmostProd';
import ViewuserwmostOrd from './ViewuserwmostOrd';
import ViewOrdwmostProd from './ViewOrdwmostProd';

function App() {
  return (
    <div style={{ backgroundColor: '#dfdfdf' }}>
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/about' component={About} />
            <Route path='/products' component={Products} />
            <Route path='/hotels' component={Hotels} />
            <Route path='/addProduct' component={AddProduct} />
            <Route path='/updateProduct' component={UpdateProduct} />
            <Route path='/addHotel' component={AddHotel} />
            <Route path='/updateHotel' component={UpdateHotel} />
            <Route path='/viewProducts' component={ViewProduct} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/cart' component={Cart} />
            <Route path='/orders' component={Order} />
            <Route path='/adminOrders' component={UpdateOrders} />
            <Route path='/viewFromOrders' component={ViewFromOrder} />
            <Route path='/addViewProduct' component={AddProductFromHotel} />
            <Route path='/rateHotel' component={RateHotel} />
            <Route path='/viewhotelwmostprod' component={ViewHotelwmostProd} />
            <Route path='/viewmostordprod' component={ViewmostOrdProd} />
            <Route
              path='/viewusersordmostprod'
              component={ViewUsersOrdMostProd}
            />
            <Route path='/viewuserwmostord' component={ViewuserwmostOrd} />
            <Route path='/viewordwmostprod' component={ViewOrdwmostProd} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
