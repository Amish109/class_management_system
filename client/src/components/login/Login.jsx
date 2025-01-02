// src/LoginForm.jsx
import React from 'react';
import { login } from '../../function';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate=useNavigate();
  const handleSubmit =async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const data= await login(username,password);
    console.log("LoginData",data);
    if(!data?.success){
        alert(data?.error.toString());
    } else{
        alert(data?.response_message);
        localStorage.setItem("access_token",JSON.stringify(data?.data?.jwt_token));
        localStorage.setItem("user_data",JSON.stringify(data?.data?.user_data));
        setTimeout(() => {
            navigate("/")
        }, 1000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
