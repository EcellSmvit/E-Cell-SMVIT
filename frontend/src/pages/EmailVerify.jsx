import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const EmailVerify = () => {
  axios.defaults.withCredentials = true
  const inputRefs = React.useRef([])
  const navigate = useNavigate()
  const { backendUrl, isLogin, userData, getUserData } = useContext(AppContext)

  const handelInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handelKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/dashboard')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isLogin && userData?.isAccountVerified) {
      navigate('/dashboard');
    }
  }, [isLogin, userData]);
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center">
        <img
          src="https://www.ecellsmvit.in/images/ecellwhite.png"
          alt="E-Cell SMVIT Logo"
          className="w-20 mb-6"
        />
        <form onSubmit={onSubmitHandler} className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-[#4E47E5] mb-2 text-center">Verify Your Email</h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter the 6-digit code sent to your email address to verify your account.
          </p>
          <div
            onPaste={handlePaste}
            className="flex justify-center gap-3 mb-6"
          >
            {Array(6).fill(0).map((_, index) => (
              <input
                ref={e => inputRefs.current[index] = e}
                key={index}
                type="text"
                maxLength="1"
                onInput={(e) => handelInput(e, index)}
                onKeyDown={(e) => handelKeyDown(e, index)}
                required
                className="w-12 h-12 text-2xl text-center border-2 border-[#4E47E5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4E47E5] transition-all"
                style={{ background: "#f5f7ff" }}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#4E47E5] text-white font-semibold rounded-2xl hover:bg-[#3a36b6] transition-colors text-lg shadow"
          >
            Verify Email
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Didn't receive the code? <span className="text-[#4E47E5] font-semibold cursor-pointer hover:underline">Resend</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify
