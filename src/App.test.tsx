import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render app header', () => {
    render(<App />);
    
    expect(screen.getByText('Rick and Morty Explorer')).toBeInTheDocument();
  });

  it('should render main container', () => {
    const { container } = render(<App />);
    
    expect(container.querySelector('.app')).toBeInTheDocument();
    expect(container.querySelector('.app-header')).toBeInTheDocument();
    expect(container.querySelector('.app-main')).toBeInTheDocument();
  });
});

