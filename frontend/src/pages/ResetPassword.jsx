import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    setOtp(pasteArray.join(''));
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    const otpValue = otpArray.join('');
    if (otpValue.length === 6) {
      setOtp(otpValue);
      setIsOtpSent(true);
    } else {
      toast.error('Please enter the full 6-digit OTP.');
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      toast.error('Email, OTP, and New Password are required.');
      return;
    }
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
      />

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail}>
          <h1>Reset Password</h1>
          <p>Enter your registered email address.</p>

          <div>
            <img src={assets.mail_icon} alt="Email Icon" />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {!isOtpSent && isEmailSent && (
        <form onSubmit={onSubmitOtp}>
          <h1>Reset Password OTP</h1>
          <p>Enter the 6-digit code sent to your email.</p>

          <div onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  key={index}
                  type="text"
                  maxLength="1"
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                />
              ))}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {isOtpSent && isEmailSent && (
        <form onSubmit={onSubmitNewPassword}>
          <h1>New Password</h1>
          <p>Enter the new password below.</p>

          <div>
            <img src={assets.lock_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
