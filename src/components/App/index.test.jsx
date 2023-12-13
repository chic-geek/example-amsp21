import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import App from '.'

describe('App component', () => {
  it('should display the structure of the application without data table', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Company.xyz' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card transactions by user' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fetch data (sm)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fetch data (md)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fetch data (lg)' })).toBeInTheDocument();
  });

  it('should display a data table when clicking one of the buttons', () => {
    // run out of time to mock fetch or implement mockServiceWorker...
  });
});
