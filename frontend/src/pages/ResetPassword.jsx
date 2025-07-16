import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from '../components/PublicSection/Background';

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
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-[50vw] h-[100vh] relative ">
        <Background/>
        <img
          className="absolute z-10 w-24 top-4 left-4"
          src="https://www.ecellsmvit.in/images/ecellwhite.png"
          alt="E-Cell SMVIT Logo"
        />
        <div className="absolute z-10 w-full px-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <h2 className="mb-4 text-4xl font-bold text-white drop-shadow-lg">
            Reset Password
          </h2>
          <p className="mb-6 text-lg text-blue-100">
            { !isEmailSent
              ? "Enter your registered email address to receive a reset code."
              : !isOtpSent
                ? "Enter the 6-digit code sent to your email."
                : "Set your new password below." }
          </p>
        </div>
      </div>
      <div className="w-[50vw] h-[100vh] flex flex-col justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8">
          {!isEmailSent && (
            <form onSubmit={onSubmitEmail} className="space-y-4">
              <h2 className="text-3xl font-bold mb-2 text-[#4E47E5] text-center">
                Reset Password
              </h2>
              <div>
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl px-4 py-2 border border-[#4E47E5] focus:outline-none focus:ring-2 focus:ring-[#4E47E5] bg-white text-[#4E47E5] placeholder-[#4E47E5]/60"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-[#4E47E5] text-white font-semibold rounded-2xl hover:bg-[#3a36b6] transition-colors"
              >
                Send OTP
              </button>
              <div className="flex justify-end">
                <p
                  onClick={() => navigate('/login')}
                  className="text-sm text-[#4E47E5] hover:underline cursor-pointer"
                >
                  Back to Login
                </p>
              </div>
            </form>
          )}

          {!isOtpSent && isEmailSent && (
            <form onSubmit={onSubmitOtp} className="space-y-4">
              <h2 className="text-3xl font-bold mb-2 text-[#4E47E5] text-center">
                Enter OTP
              </h2>
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
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
                      className="w-10 h-12 text-center text-2xl border border-[#4E47E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E47E5] bg-white text-[#4E47E5]"
                    />
                  ))}
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-[#4E47E5] text-white font-semibold rounded-2xl hover:bg-[#3a36b6] transition-colors"
              >
                Verify OTP
              </button>
              <div className="flex justify-end">
                <p
                  onClick={() => {
                    setIsEmailSent(false);
                    setOtp('');
                    inputRefs.current.forEach((input) => input && (input.value = ''));
                  }}
                  className="text-sm text-[#4E47E5] hover:underline cursor-pointer"
                >
                  Change Email
                </p>
              </div>
            </form>
          )}

          {isOtpSent && isEmailSent && (
            <form onSubmit={onSubmitNewPassword} className="space-y-4">
              <h2 className="text-3xl font-bold mb-2 text-[#4E47E5] text-center">
                New Password
              </h2>
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl px-4 py-2 border border-[#4E47E5] focus:outline-none focus:ring-2 focus:ring-[#4E47E5] bg-white text-[#4E47E5] placeholder-[#4E47E5]/60"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-[#4E47E5] text-white font-semibold rounded-2xl hover:bg-[#3a36b6] transition-colors"
              >
                Reset Password
              </button>
              <div className="flex justify-end">
                <p
                  onClick={() => navigate('/login')}
                  className="text-sm text-[#4E47E5] hover:underline cursor-pointer"
                >
                  Back to Login
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
