import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from '../components/PublicSection/Background';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const navigate = useNavigate();
  const { backendUrl, setIsLogin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          username,
          email,
          password,
          mobileNumber,
        });

        if (data.success) {
          toast.success("Signup successful!");
          setIsLogin(true);
          const user = await getUserData();

          if (!user) {
            toast.error("Failed to fetch user data.");
            return;
          }

          if (user.isAccountVerified === true) {
            navigate('/dashboard');
          } else {
            navigate('/verify-email');
          }

        } else {
          toast.error(data.message);
        }

      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          toast.success("Login successful!");
          setIsLogin(true);
          const user = await getUserData();

          if (!user) {
            toast.error("Failed to fetch user data.");
            return;
          }
          
          if (user.isAccountVerified === true) {
            navigate('/dashboard');
          } else {
            navigate('/verify-email');
          }
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
      <div className="w-[50vw] h-[100vh] relative bg-gradient-to-br from-blue-900 to-indigo-800">
        <img
          className="absolute top-4 left-4 z-10 w-24"
          src="https://www.ecellsmvit.in/images/ecellwhite.png"
          alt="E-Cell SMVIT Logo"
        />
        <Background />
        <div className="absolute top-1/2 left-1/2 z-10 px-4 w-full text-center transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="mb-4 text-4xl font-bold text-white drop-shadow-lg">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back!'}
          </h2>
          <p className="mb-6 text-lg text-blue-100">
            {state === 'Sign Up'
              ? 'Join the E-Cell SMVIT community and unlock new opportunities!'
              : 'Login to your account and continue your entrepreneurial journey.'}
          </p>
        </div>
      </div>

      <div className="w-[50vw] h-[100vh] flex flex-col justify-center items-center bg-gray-100">
        <div className="p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-[#4E47E5] text-center">
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            {state === 'Sign Up' && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#4E47E5] rounded-2xl bg-white text-[#4E47E5]"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#4E47E5] rounded-2xl bg-white text-[#4E47E5]"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#4E47E5] rounded-2xl bg-white text-[#4E47E5]"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#4E47E5] rounded-2xl bg-white text-[#4E47E5]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#4E47E5] rounded-2xl bg-white text-[#4E47E5]"
            />

            <div className="flex justify-end">
              <p
                onClick={() => navigate('/reset-passsword')}
                className="text-sm text-[#4E47E5] hover:underline cursor-pointer"
              >
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-2 bg-[#4E47E5] text-white font-semibold rounded-2xl hover:bg-[#3a36b6] transition-colors"
            >
              {state}
            </button>
          </form>

          <div className="mt-6 text-center">
            {state === 'Sign Up' ? (
              <p className="text-[#4E47E5]">
                Already have an account?{' '}
                <span onClick={() => setState('Login')} className="font-semibold cursor-pointer hover:underline">
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-[#4E47E5]">
                Don't have an account?{' '}
                <span onClick={() => setState('Sign Up')} className="font-semibold cursor-pointer hover:underline">
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
