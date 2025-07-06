import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

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
          navigate('/dashboard')
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
    <div className='bg-white'>
      <div>
        
        {/* Logo */}
        

        {/* Header */}
        <div >
          <h2>
            {state === 'Sign Up' ? 'Create account' : 'Welcome back'}
          </h2>
          <p>
            {state === 'Sign Up' ? 'Let’s get started' : 'Please login to your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
          {state === 'Sign Up' && (
            <>
              <input type="text" required placeholder="Full Name" value={name}
                onChange={e => setName(e.target.value)}
                className="input-style-adv" />

              <input type="number" required placeholder="Mobile Number" value={mobileNumber}
                onChange={e => setmobileNumber(e.target.value)}
                className="input-style-adv" />

              <input type="text" required placeholder="Username" value={username}
                onChange={e => setUsername(e.target.value)}
                className="input-style-adv" />

              <input type="date" value={dateofBirth}
                onChange={e => setdateofBirth(e.target.value)}
                className="input-style-adv" />
            </>
          )}

          <input type="email" required placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-style-adv" />

          <input type="password" required placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-style-adv" />

          <p
            onClick={() => navigate('/reset-passsword')}
            
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            
          >
            {state}
          </button>
        </form>

        {/* Footer */}
        <div>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span onClick={() => setState('Sign Up')} >
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
