/* eslint-disable no-unused-vars */
// src/__tests__/App.test.jsx

import React from 'react';
import { test, expect, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Smoke Test
test('renders without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

// Component Test
test('renders the loading state initially', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(getByText('Loading …')).toBeInTheDocument();
});
