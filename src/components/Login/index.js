import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const passwordType = passwordVisible ? 'text' : 'password';

  const loginRequest = async () => {
    const url = 'http://localhost:3005/login';
    const userConfig = {
      username,
      password,
    };

    const response = await axios.post(url, userConfig);

    const data = response.data;

    if (data.login === 'OK') {
      Cookies.set('username', username);
      Cookies.set('jwt_token', data.jwtToken);
      alert(`Login Successfully!. Hi ${username} Welcome to our community...`);
      navigate('/');
    } else {
      setErrorMessage(data);
    }
  };

  const handleFoncus = () => {
    setErrorMessage('');
  };

  const loginForm = async (e) => {
    e.preventDefault();
    // Handle form submission
    loginRequest();
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          className="login-page-image"
          src="https://img.freepik.com/free-vector/smart-id-card-with-photo-users-identification-microchip-electronic-identity-card-plastic-smartcard-personal-information-chipcard-concept-vector-isolated-illustration_335657-2220.jpg?t=st=1722365005~exp=1722368605~hmac=f66fe43307252e3b9d2a85ec7020bb7217c8de7236886935dc400e37080c59e4&w=826"
          alt="myimage"
        />
        <div className="login-card-item">
          <h1 className="login-card-heading">Login</h1>
          <form onSubmit={loginForm}>
            <div className="input-container">
              <label className="user-login-label">Email</label>
              <div className="input-icon-container">
                <div>
                  <FaUser className="icons" />
                  <input
                    className="name-element"
                    type="text"
                    placeholder="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => handleFoncus()}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-container">
              <label className="user-login-label">PASSWORD</label>
              <div className="input-icon-container">
                <div>
                  <RiLockPasswordFill className="icons" />
                  <input
                    className="email-element"
                    type={passwordType}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFoncus()}
                    required
                    placeholder="password"
                  />
                </div>
                {password.length !== 0 && (
                  <button
                    type="button"
                    className="visible-button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <IoMdEyeOff className="password-visible" />
                    ) : (
                      <IoMdEye className="password-visible" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMessage.length !== 0 && (
              <p className="error-message">{errorMessage}</p>
            )}
          </form>

          <p className="signup-description">
            Don't have an account?
            <Link to="/signup" className="link">
              <span className="signup-para">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
