import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhoneCall } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import './index.css';

export default function Singup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, SetCountry] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [condition, setCondition] = useState(false);
  const navigate = useNavigate();

  const jwtToken = Cookies.get('jwt_token');

  const setUserDetails = async () => {
    const url = 'http://localhost:3005/register';
    const userConfig = {
      username,
      password,
      phoneNumber,
      country,
      email,
      condition,
    };

    const response = await axios.post(url, userConfig);

    if (response.data === 'Regisred Successfully') {
      alert('Regisred Successfully');
      navigate('/login');
    } else {
      setErrorMessage(response.data);
    }
  };

  const submitUserDetails = (e) => {
    e.preventDefault();
    setUserDetails();
  };

  const handleFocus = () => {
    setErrorMessage('');
  };

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup">
      <div className="signup-card-background">
        <div className="new">
          <h1 className="signup-heading">Signup</h1>
          <form onSubmit={submitUserDetails} className="signup-card">
            <div className="signup-input-container spacing">
              <FaRegUser className="signup-icons" />
              <input
                type="text"
                value={username}
                placeholder="Name"
                className="sing-input-element"
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => handleFocus()}
              />
            </div>
            <div className="signup-input-container spacing">
              <MdOutlineEmail className="signup-icons" />
              <input
                type="text"
                value={email}
                placeholder="Email"
                className="sing-input-element"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus()}
              />
            </div>
            <div className="signup-input-container spacing">
              <IoLocationOutline className="signup-icons" />
              <input
                type="text"
                value={country}
                placeholder="Country"
                className="sing-input-element"
                onChange={(e) => SetCountry(e.target.value)}
                onFocus={() => handleFocus()}
              />
            </div>
            <div className="signup-input-container spacing">
              <FiPhoneCall className="signup-icons" />
              <input
                type="text"
                value={phoneNumber}
                placeholder="Phone"
                className="sing-input-element"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => handleFocus()}
              />
            </div>
            <div className="signup-input-container">
              <RiLockPasswordLine className="signup-icons" />
              <input
                type="password"
                value={password}
                placeholder="Password"
                className="sing-input-element"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus()}
              />
            </div>
            <div className="agreement-container">
              <input
                type="checkbox"
                className="checkbox-element"
                id="agreement"
                value={condition}
                onChange={() => setCondition((prevState) => !prevState)}
              />
              <p className="agree-paragraph" htmlFor="agreement">
                Check here to indicate that you have read and agree to the terms
                of the the
                <span className="agree-span-element">Customer Agreement</span>
              </p>
            </div>
            <button className="signup-button" type="submit">
              Signup
            </button>
          </form>
          {errorMessage.length !== 0 && (
            <p className="error-message">{errorMessage}</p>
          )}
          <p className="login-decription">
            already have an account?
            <span className="login-para">
              <Link to="/login" className="login-para link">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
