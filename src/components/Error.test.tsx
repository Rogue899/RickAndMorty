import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
  it('should render error message', () => {
    render(<Error message="Something went wrong" />);
    
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render error icon', () => {
    const { container } = render(<Error message="Test error" />);
    
    const icon = container.querySelector('.error-icon');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe('⚠️');
  });

  it('should display custom error message', () => {
    render(<Error message="Custom error message" />);
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
});

