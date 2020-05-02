import React from 'react';
import './App.css';
import Customers from './pages/Customers/Customers'
import Products from './pages/products/Products'
import Home from './pages/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbars} from './components/navbar/navbar'
import {Switch, Route} from 'react-router-dom'
import Invoices from './pages/Invoices/Invoices'
import invoice from './pages/invoice/Invoice';

const App = () => {
  return (
    <React.Fragment>
      <Navbars/>
      <Switch>
        <Route path='/Invoices' exact component={Invoices} />
        <Route path='/Customers'><Customers/></Route>
        <Route path='/Products' ><Products/></Route>
        <Route path='/Invoices/Invoice' exact component={invoice}></Route>
        <Route path='/Invoices/Invoice/:id' exact component={invoice}></Route>
        <Route path='/' exact component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
