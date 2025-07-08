// The code is mostly correct, but there are a few issues and improvements to consider:

// 1. The default state is set to 'Sign Up', which means the form opens in sign up mode. This is fine if intentional.
// 2. The login POST only sends email and password, but your backend allows login with email, username, or mobileNumber. You may want to allow login with username or mobile number as well.
// 3. The getUserData function from context does not return the user object; it only sets state. So `const user = await getUserData()` will always be undefined. You should rely on the context's userData instead.
// 4. The fallback logic for isVerified is convoluted and not robust. You should use the context's userData directly after calling getUserData.
// 5. The input for dateofBirth is missing in the sign up form, but it is required by the backend.
// 6. The route for reset password is misspelled: '/reset-passsword' should probably be '/reset-password'.
// 7. The context import is named `AppContent` but the context provider is `AppContextProvider`. The naming is a bit confusing but not technically wrong.

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Background from '@/components/Background'

function Login() {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData, userData } = useContext(AppContent)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateofBirth, setDateofBirth] = useState('')
  const [username, setUsername] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', {
          name, email, password, mobileNumber, dateofBirth, username
        }, { withCredentials: true })

        if (data.success) {
          setIsLoggedin(true)
          await getUserData()
          navigate('/email-verify')
        } else {
          toast.error(data.message)
        }
      } else {
        // Allow login with email, username, or mobile number
        const loginPayload = {}
        if (email) loginPayload.email = email
        if (username) loginPayload.username = username
        if (mobileNumber) loginPayload.mobileNumber = mobileNumber
        loginPayload.password = password

        const { data } = await axios.post(backendUrl + '/api/auth/login', loginPayload, { withCredentials: true })

        if (data.success) {
          setIsLoggedin(true)
          await getUserData()
          // Use userData from context after getUserData updates it
          setTimeout(() => {
            const verified = userData?.isVerified
            if (verified) {
              navigate('/dashboard')
            } else {
              navigate('/email-verify')
            }
          }, 100) // Small delay to allow context to update
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side (Image or Color) */}
      <div className="hidden md:block md:w-1/2 relative">
        <Background />
        <div className="absolute gap-5 inset-0 flex flex-col items-center justify-center">
          <img
            className="w-20 absolute top-6 left-6 z-20"
            src="https://www.ecellsmvit.in/images/ecellwhite.png"
            alt=""
          />
          <h1 className="z-10 text-white text-5xl font-black drop-shadow-lg">
            {state === 'Sign Up' ? 'CREATE ACCOUNT' : 'LOGIN'}
          </h1>
          <p className="z-10 text-white text-2xl font-medium drop-shadow-lg">
            {state === 'Sign Up' ? 'CONNECT WITH STUDENT,ALUMNI AND ECELL MEMBER' : 'TO ACCESS ECELL CONNECT'}
          </p>
        </div>
      </div>
      {/* Right Side (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#ffffff] min-h-screen">
        <div className="w-full max-w-md ">
          <h2 className="text-2xl font-bold mb-2 text-center"></h2>
          <p className="mb-6 text-center text-2xl font-bold" style={{ color: '#4B43D9' }}>
            {state === 'Sign Up' ? 'SIGNUP ' : 'LOGIN'}
          </p>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
            {state === 'Sign Up' && (
              <>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
                />

                <input
                  type="number"
                  required
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
                  className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
                />

                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
                />

                <input
                  type="date"
                  required
                  placeholder="Date of Birth"
                  value={dateofBirth}
                  onChange={e => setDateofBirth(e.target.value)}
                  className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
                />
              </>
            )}

            <input
              type="email"
              required={state === 'Sign Up'}
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
            />

            {state === 'Login' && (
              <>
                <input
                  type="text"
                  placeholder="Username (optional)"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Mobile Number (optional)"
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
                  className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
                />
              </>
            )}

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-style-adv border-2 border-[#4B43D9] rounded-full p-2 w-full"
            />

            <p
              onClick={() => navigate('/reset-password')}
              className="text-blue-600 hover:underline cursor-pointer text-sm text-right"
            >
              Forgot Password?
            </p>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#4B43D9] text-white py-2 rounded-full w-32 hover:bg-[#3a33b0] transition"
              >
                {state}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-gray-700">
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Login')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
