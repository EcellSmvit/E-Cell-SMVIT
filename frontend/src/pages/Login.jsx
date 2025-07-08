import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Background from '@/components/Background'
// import ThreeScene from '@/components/ThreeScene'
// import EmailVerify from '@/pages/EmailVerify'

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true

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
        const { data } = await axios.post(backendUrl + '/api/auth/login', {
          email, password
        }, { withCredentials: true })

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
          <h2 className="text-2xl font-bold mb-2 text-center">
            
          </h2>
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
              </>
            )}

            <input
              type="email"
              required
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
              onClick={() => navigate('/reset-passsword')}
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
