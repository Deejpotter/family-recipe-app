import '@testing-library/jest-dom'

// Mock the Netlify Identity widget
jest.mock('netlify-identity-widget', () => ({
  init: jest.fn(),
  open: jest.fn(),
  close: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  currentUser: jest.fn(),
  logout: jest.fn(),
}));
