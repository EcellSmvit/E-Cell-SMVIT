import React, { useContext, useEffect, useRef } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Set axios to include credentials
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Move focus to next input
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Move focus back on backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    const nextEmpty = inputRefs.current.findIndex((el) => el && !el.value);
    if (nextEmpty !== -1) inputRefs.current[nextEmpty].focus();
  };

  // Handle OTP submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((el) => el?.value || '').join('');

    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code.');
      return;
    }

    const email = localStorage.getItem('verify_email');
    if (!email) {
      toast.error('User email not found. Please login again.');
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, {
        otp,
        email,
      });

      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem('verify_email');
        await getUserData();
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    }
  };

  // Redirect if already verified
  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) {
      localStorage.removeItem('verify_email');
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  const displayEmail = localStorage.getItem('verify_email') || '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={onSubmitHandler}
        className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col items-center"
        autoComplete="off"
      >
        <img
          className="w-16 mb-4"
          src="https://www.ecellsmvit.in/images/ecellwhite.png"
          alt="E-Cell Logo"
        />
        <h1 className="text-2xl font-bold mb-2 text-[#4B43D9]">Email Verification</h1>
        <p className="mb-6 text-center text-gray-700">
          Enter the 6-digit code sent to your email
          {displayEmail ? ` (${displayEmail})` : ''}.
        </p>
        <div className="flex gap-2 mb-6" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-center text-xl border-2 border-[#4B43D9] rounded focus:outline-none focus:border-blue-500 bg-white"
              />
            ))}
        </div>
        <button
          type="submit"
          className="bg-[#4B43D9] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#3a33b0] transition"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;
