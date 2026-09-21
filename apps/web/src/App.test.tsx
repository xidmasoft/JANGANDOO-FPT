import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppRouter } from './routes';

describe('App Foundation', () => {
  it('renders the home page correctly', () => {
    render(<AppRouter />);

    // Check if the main heading exists
    const heading = screen.getByRole('heading', { name: /apprendre ensemble/i });
    expect(heading).toBeInTheDocument();

    // Check if the header title exists
    const headerTitle = screen.getByText('JANGANDOO FPT');
    expect(headerTitle).toBeInTheDocument();
  });
});
