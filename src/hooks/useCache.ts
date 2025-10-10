/**
 * React Hook for Cache Management
 * 
 * Provides easy access to cache statistics and management functions
 */

import { useState, useEffect } from 'react';
import cacheService, { cacheHelpers } from '../services/cache';

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

/**
 * Hook to access cache statistics
 * Updates every second by default
 */
export const useCacheStats = (intervalMs: number = 1000): CacheStats => {
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    size: 0,
    hitRate: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const currentStats = cacheService.getStats();
      const hitRate = cacheService.getHitRate();
      
      setStats({
        ...currentStats,
        hitRate
      });
    };

    // Initial update
    updateStats();

    // Set interval for updates
    const interval = setInterval(updateStats, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return stats;
};

/**
 * Hook to get cache management functions
 */
export const useCacheManagement = () => {
  return {
    // Invalidation functions
    invalidateCharacters: cacheHelpers.invalidateCharacters,
    invalidateLocations: cacheHelpers.invalidateLocations,
    invalidateEpisodes: cacheHelpers.invalidateEpisodes,
    invalidateCharacter: cacheHelpers.invalidateCharacter,
    invalidateLocation: cacheHelpers.invalidateLocation,
    invalidateEpisode: cacheHelpers.invalidateEpisode,
    clearAll: cacheHelpers.clearAll,
    
    // Info functions
    getStats: cacheHelpers.getStats,
    getCachedUrls: () => cacheService.getCachedUrls(),
    has: (url: string) => cacheService.has(url)
  };
};

