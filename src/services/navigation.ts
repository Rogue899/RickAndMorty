/**
 * Navigation Helper Service
 * Generic navigation with returnTo pattern
 */

import { NavigateFunction } from 'react-router-dom';

/**
 * Navigate to a page with return path encoded
 * @param navigate - React Router navigate function
 * @param targetPath - Path to navigate to
 * @param currentPath - Current pathname
 * @param currentSearch - Current search params string
 */
export const navigateWithReturn = (
  navigate: NavigateFunction,
  targetPath: string,
  currentPath: string,
  currentSearch: string
): void => {
  // Encode current full path as returnTo
  const returnTo = encodeURIComponent(currentPath + currentSearch);
  const separator = targetPath.includes('?') ? '&' : '?';
  navigate(`${targetPath}${separator}returnTo=${returnTo}`);
};

/**
 * Navigate back using returnTo parameter
 * @param navigate - React Router navigate function
 * @param searchParams - URLSearchParams object
 * @param defaultRoute - Fallback route if no returnTo (default: browser back)
 */
export const navigateBack = (
  navigate: NavigateFunction,
  searchParams: URLSearchParams,
  defaultRoute?: string
): void => {
  const returnTo = searchParams.get('returnTo');
  
  if (returnTo) {
    try {
      // Decode and navigate to the return path
      const decodedPath = decodeURIComponent(returnTo);
      navigate(decodedPath);
    } catch (error) {
      // If decoding fails, fallback
      console.error('Failed to decode returnTo path:', error);
      if (defaultRoute) {
        navigate(defaultRoute);
      } else {
        navigate(-1);
      }
    }
  } else if (defaultRoute) {
    navigate(defaultRoute);
  } else {
    // Fallback to browser back
    navigate(-1);
  }
};

/**
 * DEPRECATED: Use navigateBack instead
 * Kept for backward compatibility
 */
export const handleBackNavigation = (
  navigate: NavigateFunction,
  searchParams: URLSearchParams,
  defaultRoute: string = '/'
): void => {
  navigateBack(navigate, searchParams, defaultRoute);
};

/**
 * Get page number from search params
 */
export const getCurrentPage = (searchParams: URLSearchParams): number => {
  return parseInt(searchParams.get('page') || '1', 10);
};

