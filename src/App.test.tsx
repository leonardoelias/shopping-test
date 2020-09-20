import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

function renderWithRouter(
  ui: React.ReactElement,
  {
    route = '/',
    ...opts
  }: {
    route?: string;
  } = {}
) {
  window.history.pushState({}, 'Page router', route);

  return {
    ...render(ui, {
      wrapper: Router,
      ...opts,
    }),
  };
}

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('Home', () => {
  test('renders learn react link', () => {
    renderWithRouter(<App />);
    const textMain = screen.getByText(/hello/i);

    expect(textMain).toBeInTheDocument();
  });

  it('navigates to cart', () => {
    renderWithRouter(<App />);

    const cartLink = screen.getByText(/cart/i);
    fireEvent.click(cartLink);

    expect(window.location.pathname).toBe('/cart');
  });

  it('navigates to /cart and back to /', () => {
    renderWithRouter(<App />);

    const cartLink = screen.getByText(/cart/i);
    fireEvent.click(cartLink);

    expect(window.location.pathname).toBe('/cart');

    const homeLink = screen.getByText(/home/i);
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');
  });
});

describe('Checkout', () => {
  it('navigate to /home to /checkout', () => {
    renderWithRouter(<App />);

    const checkoutLink = screen.getByText(/checkout/i);
    fireEvent.click(checkoutLink);

    expect(window.location.pathname).toBe('/checkout');
    expect(screen.getByText(/page checkout/i)).toBeInTheDocument();
  });

  it('navigate to /checkout to /checkout/payment', () => {
    renderWithRouter(<App />, { route: '/checkout' });

    expect(window.location.pathname).toBe('/checkout');
    expect(screen.getByText(/page checkout/i)).toBeInTheDocument();

    const paymentLink = screen.getByText(/payment/i);
    fireEvent.click(paymentLink);

    expect(window.location.pathname).toBe('/checkout/payment');
    expect(screen.getByText(/page payment/i)).toBeInTheDocument();
  });

  it('navigate to /checkout/payment to /checkout/order', () => {
    renderWithRouter(<App />, { route: '/checkout/payment' });

    expect(window.location.pathname).toBe('/checkout/payment');
    expect(screen.getByText(/page payment/i)).toBeInTheDocument();

    const paymentOrder = screen.getByText(/order/i);
    fireEvent.click(paymentOrder);

    expect(window.location.pathname).toBe('/checkout/order');
    expect(screen.getByText(/page order/i)).toBeInTheDocument();
  });
});
