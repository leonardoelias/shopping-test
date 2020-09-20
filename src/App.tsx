import React from 'react';
import {
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

function Cart() {
  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}

function Order() {
  return (
    <div>
      <h1>page order</h1>
    </div>
  );
}

function Payment() {
  return (
    <div>
      <h1>page payment</h1>
    </div>
  );
}

function Checkout() {
  return (
    <div>
      <h1>page checkout</h1>
    </div>
  );
}

function Layout() {
  return (
    <>
      <nav
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Link to='/'>Home</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/checkout'>Checkout</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

function LayoutCheckout() {
  return (
    <>
      <header>
        <Link to='/'>Loja</Link>
      </header>
      <nav
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Link to='/checkout'>Checkout</Link>
        <Link to='/checkout/payment'>Payment</Link>
        <Link to='/checkout/order'>Order</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='checkout' element={<LayoutCheckout />}>
          <Route path='/' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/order' element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
