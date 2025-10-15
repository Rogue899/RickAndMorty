/**
 * Performance monitoring utilities
 */

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiCallTime: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();

  startTiming(key: string): void {
    performance.mark(`${key}-start`);
  }

  endTiming(key: string): number {
    performance.mark(`${key}-end`);
    performance.measure(key, `${key}-start`, `${key}-end`);
    
    const measure = performance.getEntriesByName(key)[0];
    const duration = measure ? measure.duration : 0;
    
    this.metrics.set(key, {
      loadTime: duration,
      renderTime: 0,
      apiCallTime: 0
    });

    return duration;
  }

  getMetrics(): Map<string, PerformanceMetrics> {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics.clear();
    performance.clearMarks();
    performance.clearMeasures();
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Hook to measure component render performance
 */
export function usePerformanceMonitor(componentName: string) {
  const startTiming = () => performanceMonitor.startTiming(componentName);
  const endTiming = () => performanceMonitor.endTiming(componentName);

  return { startTiming, endTiming };
}
