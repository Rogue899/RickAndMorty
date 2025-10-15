import { useNavigate, useSearchParams } from 'react-router-dom';
import { navigateBack } from '../services/navigation';
import { IoArrowBack } from 'react-icons/io5';
import './BackButton.scss';

interface BackButtonProps {
  label?: string;
  defaultRoute?: string;
}

function BackButton({ label = 'Back', defaultRoute }: BackButtonProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    navigateBack(navigate, searchParams, defaultRoute);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <IoArrowBack className="back-button-icon" size={20} />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;

