import { CACHE_CONFIG } from '../constants/app-config';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  url: string;
}

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
}

class CacheService {
  private cache: Map<string, CacheEntry<any>>;
  private stats: CacheStats;
  private defaultTTL: number;
  private maxCacheSize: number;

  constructor(defaultTTL: number = CACHE_CONFIG.TTL_MEDIUM, maxCacheSize: number = CACHE_CONFIG.MAX_SIZE) {
    this.cache = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      size: 0
    };
    this.defaultTTL = defaultTTL;
    this.maxCacheSize = maxCacheSize;
  }

  private generateKey(url: string): string {
    return url;
  }

  private isValid(entry: CacheEntry<any>): boolean {
    const now = Date.now();
    return (now - entry.timestamp) < entry.ttl;
  }

  private cleanupExpired(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if ((now - entry.timestamp) >= entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
    this.updateStats();
  }

  private manageCacheSize(): void {
    if (this.cache.size <= this.maxCacheSize) return;

    const entries = Array.from(this.cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);

    const entriesToRemove = Math.ceil(this.maxCacheSize * 0.2);
    for (let i = 0; i < entriesToRemove; i++) {
      this.cache.delete(entries[i][0]);
    }

    this.updateStats();
  }

  private updateStats(): void {
    this.stats.size = this.cache.size;
  }

  get<T>(url: string): T | null {
    this.cleanupExpired();

    const key = this.generateKey(url);
    const entry = this.cache.get(key);

    if (entry && this.isValid(entry)) {
      this.stats.hits++;
      return entry.data as T;
    }

    this.stats.misses++;
    return null;
  }

  set<T>(url: string, data: T, ttl?: number): void {
    const key = this.generateKey(url);
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
      url
    };

    this.cache.set(key, entry);
    this.manageCacheSize();
    this.updateStats();
  }

  invalidate(url: string): boolean {
    const key = this.generateKey(url);
    const deleted = this.cache.delete(key);
    
    if (deleted) {
      this.updateStats();
    }
    
    return deleted;
  }

  invalidatePattern(pattern: string): number {
    let count = 0;
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (entry.url.includes(pattern)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => {
      this.cache.delete(key);
      count++;
    });

    if (count > 0) {
      this.updateStats();
    }

    return count;
  }

  clear(): void {
    this.cache.clear();
    this.stats.hits = 0;
    this.stats.misses = 0;
    this.updateStats();
  }

  getStats(): CacheStats {
    this.cleanupExpired();
    return { ...this.stats };
  }

  getCachedUrls(): string[] {
    this.cleanupExpired();
    return Array.from(this.cache.values()).map(entry => entry.url);
  }

  getHitRate(): number {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : (this.stats.hits / total) * 100;
  }

  has(url: string): boolean {
    const key = this.generateKey(url);
    const entry = this.cache.get(key);
    return entry !== undefined && this.isValid(entry);
  }
}

const cacheService = new CacheService(
  CACHE_CONFIG.TTL_MEDIUM,
  CACHE_CONFIG.MAX_SIZE
);

export default cacheService;

export { CacheService };

export const CacheTTL = {
  SHORT: CACHE_CONFIG.TTL_SHORT,
  MEDIUM: CACHE_CONFIG.TTL_MEDIUM,
  LONG: CACHE_CONFIG.TTL_LONG,
  EXTRA_LONG: CACHE_CONFIG.TTL_EXTRA_LONG,
  NEVER: Infinity
} as const;

export const cacheHelpers = {
  invalidateCharacters: () => cacheService.invalidatePattern('/character'),
  invalidateLocations: () => cacheService.invalidatePattern('/location'),
  invalidateEpisodes: () => cacheService.invalidatePattern('/episode'),
  invalidateCharacter: (id: number) => cacheService.invalidate(`/character/${id}`),
  invalidateLocation: (id: number) => cacheService.invalidate(`/location/${id}`),
  invalidateEpisode: (id: number) => cacheService.invalidate(`/episode/${id}`),
  getStats: () => cacheService.getStats(),
  clearAll: () => cacheService.clear()
};
