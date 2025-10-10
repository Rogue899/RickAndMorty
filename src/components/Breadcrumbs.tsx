import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation();

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.path === location.pathname;

          return (
            <li key={index} className="breadcrumbs-item">
              {!isLast && item.path ? (
                <>
                  <Link 
                    to={item.path} 
                    className={`breadcrumbs-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                  <span className="breadcrumbs-separator">/</span>
                </>
              ) : (
                <span className="breadcrumbs-current">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

