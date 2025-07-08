import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Background from '@/components/Background'

function Login() {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateofBirth, setDateofBirth] = useState('')
  const [username, setUsername] = useState('')

  // Clear login fields when switching between Login/Sign Up
  const handleStateChange = (newState) => {
    setState(newState)
    setName('')
    setEmail('')
    setPassword('')
    setMobileNumber('')
    setDateofBirth('')
    setUsername('')
  }

  // Helper to fetch user data and return it
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true })
      return res.data?.user
    } catch (err) {
      return null
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', {
          name, email, password, mobileNumber, dateofBirth, username
        }, { withCredentials: true })

        if (data.success) {
          setIsLoggedIn(true)
          await getUserData()
          if (email) localStorage.setItem('verify_email', email)
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
          setIsLoggedIn(true)
          // Always fetch user data after login and use the returned value
          const user = await fetchUserData()
          await getUserData() // still update context

          // Store email in localStorage for verification page fallback
          let verifyEmail = email
          if (!verifyEmail && user?.email) verifyEmail = user.email
          if (verifyEmail) localStorage.setItem('verify_email', verifyEmail)

          // Use the freshly fetched user data to determine where to navigate
          if (user && user.isVerified) {
            navigate('/dashboard')
          } else {
            navigate('/email-verify')
          }
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
                  onClick={() => handleStateChange('Login')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <span
                  onClick={() => handleStateChange('Sign Up')}
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
