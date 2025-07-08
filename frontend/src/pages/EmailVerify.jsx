import React, { useContext, useEffect, useRef } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {
  // Use context, but fallback to localStorage for email if userData is not loaded
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const inputRefs = useRef([]);

  // Ensure axios only sets withCredentials once, not on every render
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Store email in localStorage if available
  useEffect(() => {
    if (userData?.email) {
      localStorage.setItem('verify_email', userData.email);
    }
  }, [userData?.email]);

  // Move focus to next input on input
  const handleInput = (e, index) => {
    const value = e.target.value;
    // Only allow digits
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, '');
      return;
    }
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Move focus to previous input on backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle pasting OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    // Focus the next empty input
    for (let i = 0; i < 6; i++) {
      if (inputRefs.current[i] && inputRefs.current[i].value === '') {
        inputRefs.current[i].focus();
        break;
      }
    }
  };

  // Submit OTP
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((el) => el?.value || '');
      const otp = otpArray.join('');
      if (otp.length !== 6) {
        toast.error('Please enter the 6-digit code.');
        return;
      }

      // Try to get email from userData, fallback to localStorage
      let email = userData?.email;
      if (!email) {
        email = localStorage.getItem('verify_email');
      }
      if (!email) {
        toast.error('User email not found. Please login again.');
        return;
      }

      // Defensive: check if user exists in database before submitting OTP
      // (This is a client-side check, but the real check is on the backend)
      try {
        const userRes = await axios.get(`${backendUrl}/api/user/data`);
        if (!userRes.data.success || !userRes.data.user) {
          toast.error('User not found in database. Please login again.');
          localStorage.removeItem('verify_email');
          return;
        }
      } catch (err) {
        toast.error('User not found in database. Please login again.');
        localStorage.removeItem('verify_email');
        return;
      }

      const { data } = await axios.post(
        backendUrl + '/api/auth/verify-account',
        {
          otp,
          email,
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserData();
        // Remove email from localStorage after successful verification
        localStorage.removeItem('verify_email');
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Redirect if already verified
  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) {
      // Remove email from localStorage if user is already verified
      localStorage.removeItem('verify_email');
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  // Show email from userData or localStorage
  const displayEmail = userData?.email || localStorage.getItem('verify_email') || '';

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
        <div
          className="flex gap-2 mb-6"
          onPaste={handlePaste}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                key={index}
                required
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 text-center text-xl border-2 border-[#4B43D9] rounded focus:outline-none focus:border-blue-500 bg-white"
                autoComplete="off"
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
