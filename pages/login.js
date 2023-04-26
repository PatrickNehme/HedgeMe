import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookie from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/dashboard/login-user', {
        email,
        password,
      });

      Cookie.set('token', response.data.token);
      router.push('/dashboard/AccountInformationPage');
    } catch (error) {
      console.error(error);
    }
  };
  return (

   <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs border border-gray-300">
          <div className="w-60 h-20 overflow-hidden relative">
            <Link href="/">
                <img
                  src="logo.PNG"
                  alt="HedgeMe"
                  className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                  style={{ objectPosition: 'center 65%' }}
                />
            </Link>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 w-5 mr-2" />
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLock} className="text-gray-400 w-5 mr-2" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-1 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" style={{backgroundColor: "#5383c7"}}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
