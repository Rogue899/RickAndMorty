import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('should render loading spinner', () => {
    const { container } = render(<Loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('should have proper structure', () => {
    const { container } = render(<Loading />);
    
    const loadingContainer = container.querySelector('.loading-container');
    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer?.querySelector('.loading-spinner')).toBeInTheDocument();
    expect(loadingContainer?.querySelector('.loading-text')).toBeInTheDocument();
  });
});

