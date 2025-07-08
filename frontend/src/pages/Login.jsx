import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Background from '@/components/Background'

function Login() {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setmobileNumber] = useState('')
  const [dateofBirth, setdateofBirth] = useState('')
  const [username, setUsername] = useState('')

  const handleStateChange = (newState) => {
    setState(newState)
    setName('')
    setEmail('')
    setPassword('')
    setmobileNumber('')
    setdateofBirth('')
    setUsername('')
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(
          backendUrl + 'api/auth/register',
          {
            name,
            email,
            password,
            mobileNumber,
            dateofBirth,
            username
          },
          { withCredentials: true }
        )

        if (data.success) {
          setIsLoggedin(true)
          await getUserData()
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(
          backendUrl + 'api/auth/login',
          {
            email,
            password
          },
          { withCredentials: true }
        )

        if (data.success) {
          setIsLoggedin(true)
          await getUserData()
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden relative md:block md:w-1/2">
        <Background />
        <div className="flex absolute inset-0 flex-col gap-5 justify-center items-center">
          <img
            className="absolute top-6 left-6 z-20 w-20"
            src="https://www.ecellsmvit.in/images/ecellwhite.png"
            alt="Ecell Logo"
          />
          <h1 className="z-10 text-5xl font-black text-white drop-shadow-lg">
            {state === 'Sign Up' ? 'CREATE ACCOUNT' : 'LOGIN'}
          </h1>
          <p className="z-10 text-2xl font-medium text-white drop-shadow-lg">
            {state === 'Sign Up'
              ? 'CONNECT WITH STUDENTS, ALUMNI AND ECELL MEMBERS'
              : 'TO ACCESS ECELL CONNECT'}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full min-h-screen bg-white md:w-1/2">
        <div className="w-full max-w-md">
          <p className="mb-6 text-2xl font-bold text-center" style={{ color: '#4B43D9' }}>
            {state === 'Sign Up' ? 'SIGN UP' : 'LOGIN'}
          </p>

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
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={e => setmobileNumber(e.target.value)}
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
                  value={dateofBirth}
                  onChange={e => setdateofBirth(e.target.value)}
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
              className="text-sm text-right text-blue-600 cursor-pointer hover:underline"
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

          <div className="mt-4 text-center text-gray-700">
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => handleStateChange('Login')}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <span
                  onClick={() => handleStateChange('Sign Up')}
                  className="text-blue-600 cursor-pointer hover:underline"
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
