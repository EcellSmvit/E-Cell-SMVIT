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
        navigate('/')
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
    <div>

      <form onSubmit={onSubmitHandler}>
        <h1>Email Verify OTP</h1>
        <p>Enter the 6-digit code sent to your email id.</p>
        <div onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              ref={e => inputRefs.current[index] = e}
              key={index}
              type="text"
              maxLength="1"
              onInput={(e) => handelInput(e, index)}
              onKeyDown={(e) => handelKeyDown(e, index)}
              required
            />
          ))}
        </div>
        <button type="submit">Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify
