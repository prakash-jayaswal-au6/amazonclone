import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment'
import Orders from './Orders'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51HSqzhIeqow5XXvP96JF5nr9SK17AUwOb6ml7goK2F2ihxhrik1JRZSy5n44Pkn76hvbL23dWJBip2Py2zGwQWnS00lmiFxLXc');

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if(authUser) {
        //user logged in  /or logged in already
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
          
       </Switch>
      </div>
    </Router>
    
  );
}

export default App;
