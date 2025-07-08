import { useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Background from '@/components/Background'

// Configure axios defaults
axios.defaults.timeout = 10000 // 10 seconds timeout
axios.defaults.withCredentials = true

// Create axios instance with default config
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Debounce helper
const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Form validation rules
const VALIDATION_RULES = {
  name: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message: 'Name must be 2-50 characters long and contain only letters'
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    message: 'Password must be at least 8 characters with letters and numbers'
  },
  mobileNumber: {
    pattern: /^[1-9]\d{9}$/,
    message: 'Please enter a valid 10-digit mobile number'
  },
  username: {
    pattern: /^[a-zA-Z0-9_]{3,30}$/,
    message: 'Username must be 3-30 characters with letters, numbers, and underscores'
  }
}

function Login() {
  // Refs for cleanup
  const mounted = useRef(true)
  const controller = useRef(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mounted.current = false
      if (controller.current) {
        controller.current.abort()
      }
    }
  }, [])
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent)

  const [state, setState] = useState('Sign Up')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    dateOfBirth: '',
    username: ''
  })
  const [errors, setErrors] = useState({})

  // Debounced validation
  const debouncedValidate = useCallback(
    debounce(() => {
      validateForm()
    }, 500),
    [validateForm]
  )

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value.trim() }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Trigger debounced validation
    debouncedValidate()
  }, [errors, debouncedValidate])

  // Validate form data
  const validateForm = useCallback(() => {
    const newErrors = {}
    
    // Required field validation for Sign Up
    if (state === 'Sign Up') {
      const requiredFields = ['name', 'email', 'password', 'mobileNumber', 'username', 'dateOfBirth']
      requiredFields.forEach(field => {
        if (!formData[field]?.trim()) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        }
      })
    }

    // Required field validation for Login
    if (state === 'Login') {
      if (!formData.password?.trim()) {
        newErrors.password = 'Password is required'
      }
      // At least one identifier is required
      if (!formData.email?.trim() && !formData.username?.trim() && !formData.mobileNumber?.trim()) {
        newErrors.email = 'Please provide email, username, or mobile number'
      }
    }

    // Pattern validation for non-empty fields
    Object.keys(formData).forEach(field => {
      if (formData[field]?.trim() && VALIDATION_RULES[field]) {
        if (!VALIDATION_RULES[field].pattern.test(formData[field].trim())) {
          newErrors[field] = VALIDATION_RULES[field].message
        }
      }
    })

    // Date validation
    if (state === 'Sign Up' && formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      const minAge = new Date()
      minAge.setFullYear(minAge.getFullYear() - 13) // Minimum age requirement

      if (birthDate >= today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future'
      } else if (birthDate > minAge) {
        newErrors.dateOfBirth = 'You must be at least 13 years old'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, state])

  // Clear form when switching between Login/Sign Up
  const handleStateChange = useCallback((newState) => {
    setState(newState)
    setFormData({
      name: '',
      email: '',
      password: '',
      mobileNumber: '',
      dateOfBirth: '',
      username: ''
    })
    setErrors({})
  }, [])

  // Helper to fetch user data and return it
  const fetchUserData = async () => {
    try {
      const res = await api.get(`${backendUrl}/api/user/data`, {
        signal: controller.current.signal
      })
      return mounted.current ? res.data?.user : null
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was aborted, ignore error
        return null
      }
      console.error('Error fetching user data:', err)
      return null
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Create new abort controller for this request
    if (controller.current) {
      controller.current.abort()
    }
    controller.current = new AbortController()

    try {
      if (state === 'Sign Up') {
        const { data } = await api.post(backendUrl + '/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobileNumber: formData.mobileNumber,
          dateOfBirth: formData.dateOfBirth,
          username: formData.username
        }, { withCredentials: true })

        if (data.success) {
          setIsLoggedIn(true)
          await getUserData()
          if (formData.email) localStorage.setItem('verify_email', formData.email)
          navigate('/email-verify')
        } else {
          toast.error(data.message)
        }
      } else {
        // Allow login with email, username, or mobile number
        const loginPayload = {
          password: formData.password
        }
        
        // Add identifier fields if they exist
        if (formData.email) loginPayload.email = formData.email
        if (formData.username) loginPayload.username = formData.username
        if (formData.mobileNumber) loginPayload.mobileNumber = formData.mobileNumber

        // Validate that at least one identifier is provided
        if (!formData.email && !formData.username && !formData.mobileNumber) {
          setErrors({ email: 'Please provide email, username, or mobile number' })
          return
        }

        const { data } = await api.post(backendUrl + '/api/auth/login', loginPayload, {
          signal: controller.current.signal
        })

        if (data.success) {
          setIsLoggedIn(true)
          // Always fetch user data after login and use the returned value
          const user = await fetchUserData()
          await getUserData() // still update context

          // Store email in localStorage for verification page fallback
          let verifyEmail = formData.email
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
      let errorMessage = error?.response?.data?.message || error.message
      
      // Handle specific error cases
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your internet connection.'
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many attempts. Please try again later.'
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid credentials. Please check your login details.'
      } else if (error.response?.status === 400 && error.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = error.response.data.errors
        setErrors(prev => ({ ...prev, ...backendErrors }))
        errorMessage = 'Please correct the errors in the form.'
      }

      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
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
          <form 
            onSubmit={onSubmitHandler} 
            className="flex flex-col gap-4"
            aria-busy={isLoading}
            aria-live="polite"
          >
            {state === 'Sign Up' && (
              <>
                <div className="flex flex-col gap-1">
                  <div role="group" aria-labelledby="name-label">
                    <label id="name-label" className="sr-only">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`input-style-adv border-2 ${errors.name ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.name && <span id="name-error" className="text-red-500 text-sm px-3" role="alert">{errors.name}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div role="group" aria-labelledby="mobile-label">
                    <label id="mobile-label" className="sr-only">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      aria-invalid={!!errors.mobileNumber}
                      aria-describedby={errors.mobileNumber ? 'mobile-error' : undefined}
                      className={`input-style-adv border-2 ${errors.mobileNumber ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.mobileNumber && <span id="mobile-error" className="text-red-500 text-sm px-3" role="alert">{errors.mobileNumber}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div role="group" aria-labelledby="username-label">
                    <label id="username-label" className="sr-only">Username</label>
                    <input
                      type="text"
                      name="username"
                      required
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      aria-invalid={!!errors.username}
                      aria-describedby={errors.username ? 'username-error' : undefined}
                      className={`input-style-adv border-2 ${errors.username ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.username && <span id="username-error" className="text-red-500 text-sm px-3" role="alert">{errors.username}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div role="group" aria-labelledby="dob-label">
                    <label id="dob-label" className="sr-only">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      placeholder="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      max={new Date().toISOString().split('T')[0]}
                      aria-invalid={!!errors.dateOfBirth}
                      aria-describedby={errors.dateOfBirth ? 'dob-error' : undefined}
                      className={`input-style-adv border-2 ${errors.dateOfBirth ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.dateOfBirth && <span id="dob-error" className="text-red-500 text-sm px-3" role="alert">{errors.dateOfBirth}</span>}
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1">
              <div role="group" aria-labelledby="email-label">
                <label id="email-label" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  required={state === 'Sign Up'}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`input-style-adv border-2 ${errors.email ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.email && <span id="email-error" className="text-red-500 text-sm px-3" role="alert">{errors.email}</span>}
              </div>
            </div>

            {state === 'Login' && (
              <>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username (optional)"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`input-style-adv border-2 ${errors.username ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full`}
                  />
                  {errors.username && <span className="text-red-500 text-sm px-3">{errors.username}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number (optional)"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className={`input-style-adv border-2 ${errors.mobileNumber ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full`}
                  />
                  {errors.mobileNumber && <span className="text-red-500 text-sm px-3">{errors.mobileNumber}</span>}
                </div>
              </>
            )}

            <div className="flex flex-col gap-1">
              <div role="group" aria-labelledby="password-label">
                <label id="password-label" className="sr-only">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`input-style-adv border-2 ${errors.password ? 'border-red-500' : 'border-[#4B43D9]'} rounded-full p-2 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.password && <span id="password-error" className="text-red-500 text-sm px-3" role="alert">{errors.password}</span>}
              </div>
            </div>

            <p
              onClick={() => navigate('/reset-password')}
              className="text-blue-600 hover:underline cursor-pointer text-sm text-right"
            >
              Forgot Password?
            </p>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                aria-disabled={isLoading}
                className={`bg-[#4B43D9] text-white py-2 rounded-full w-32 hover:bg-[#3a33b0] transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : state}
                </span>
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
