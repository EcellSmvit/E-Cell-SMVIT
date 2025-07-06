import React, { useContext, useEffect } from 'react'
import AppContent from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {

  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.slice(0, 6).split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((el) => el.value);
      const otp = otpArray.join('');
      console.log("Submitting OTP:", otp);

      const { data } = await axios.post(backendUrl + 'api/auth/verify-account', {
        otp,
        email: userData?.email,  // send email to backend
      });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData]);

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        
      >
        <h1 >
          Email Verification
        </h1>
        <p >
          Enter the 6-digit code sent to your email.
        </p>

        <div  onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              ref={(el) => (inputRefs.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              
            />
          ))}
        </div>

        <button
          type="submit"
          
        >
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;
