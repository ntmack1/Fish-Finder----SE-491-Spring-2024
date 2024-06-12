import { render } from '@testing-library/react';
import ReactGA from 'react-ga4';
import App from './App';

jest.mock('react-ga4', () => ({
  initialize: jest.fn(),
  send: jest.fn(),
  event: jest.fn(),
}));

test('renders without crashing', () => {
  render(<App />);
});