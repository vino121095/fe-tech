import React, { useState } from 'react';
import axios from 'axios';
import '../Auth/Login.css';
import logo from '../user/assets/RiM-Logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import baseurl from '../apiService/apiService';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${baseurl}/api/loginUser`, { email, password });
      console.log('Response data:', response.data.data); // Log response to debug
      
      if (response.data.message === 'Login successful') {
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        setError(null); // Clear any previous error messages
        if (response.data.data.isadmin === true) {
          navigate('/Dashboard');
        } else {
          navigate('/');
        }
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Login error:', error);
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="otp-login">
          <a href="/Auth/Signup">Sign-up</a>
        </p>
      </div>
      <div className="login-banner">
        <img src={logo} alt="Logo" className="rim-logo" />
      </div>
    </div>
  );
};

export default Login;
