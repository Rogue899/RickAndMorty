import './LoadingSkeleton.scss';

interface LoadingSkeletonProps {
  type?: 'card' | 'detail' | 'list';
  count?: number;
}

function LoadingSkeleton({ type = 'card', count = 6 }: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image skeleton-shimmer"></div>
            <div className="skeleton-content">
              <div className="skeleton-title skeleton-shimmer"></div>
              <div className="skeleton-text skeleton-shimmer"></div>
              <div className="skeleton-text-short skeleton-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="skeleton-detail">
        <div className="skeleton-detail-header">
          <div className="skeleton-detail-image skeleton-shimmer"></div>
          <div className="skeleton-detail-info">
            <div className="skeleton-title-large skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text-short skeleton-shimmer"></div>
          </div>
        </div>
        <div className="skeleton-detail-content">
          <div className="skeleton-text skeleton-shimmer"></div>
          <div className="skeleton-text skeleton-shimmer"></div>
          <div className="skeleton-text-short skeleton-shimmer"></div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="skeleton-list">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-list-item">
            <div className="skeleton-text skeleton-shimmer"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default LoadingSkeleton;

