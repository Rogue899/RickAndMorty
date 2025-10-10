import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('should render pagination controls', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange when clicking next', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange when clicking previous', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking a page number', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByLabelText('Page 3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should mark current page as active', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const currentPageButton = screen.getByLabelText('Page 3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('should show ellipsis for many pages', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={onPageChange} />
    );

    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('should show all pages when total is small', () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument();
  });
});

