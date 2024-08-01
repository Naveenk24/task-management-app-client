import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { MdOutlineLogout } from 'react-icons/md';

import './index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logutTheWebsite = () => {
    Cookies.remove('jwt_token');
    return navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <FaTasks className="nav-icon" />

      <div className="cart-login-container">
        <div className="cart-container">
          <div className="cart-count-container">
            <BiTask className="cart-logo" />
            <p className="cart-count">0</p>
          </div>
        </div>

        <div className="logout-container">
          <button className="logout-button" onClick={logutTheWebsite}>
            Logout
          </button>
        </div>

        <MdOutlineLogout className="logout-logo-mobile" />
      </div>
    </nav>
  );
};

export default Navbar;
