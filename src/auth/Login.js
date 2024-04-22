import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios'; 
import Swal from 'sweetalert2';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [role, setRole] = useState("admin");
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
          username: username,
          password: password,
          role: role,
        }
    
        try {
          const response = await axios.post(`http://localhost:7000/login`, data);
    
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil Login",
              showConfirmButton: false,
              timer: 1500,
            });
            // Redirecting user to login page
            setTimeout(() => {
              window.location.href = "/supervisor";
            }, 1500);

            localStorage.setItem("id", response.data.userData.id);
            localStorage.setItem("role", response.data.userData.role);
            localStorage.setItem("token", response.data.token); 
          }
        } catch (error) {
          console.error("Error during registration:", error);
          setShow(false);
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="bg-blue-200 dark:bg-blue-200 min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-blue-600 dark:border-blue-500">
                    <div className="p-8 space-y-4 md:space-y-6">
                        <a className="flex items-center mb-6 text-2xl text-xl font-bold text-gray-900 dark:text-white">
                            <img 
                                className="w-8 h-8 mr-2 rounded-full overflow-hidden" 
                                src="https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg" 
                                alt="Logo" 
                                style={{ objectFit: 'cover' }} 
                            />
                             Sign in to your account  
                        </a>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} method='POST'>
                            <div className="relative">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <div className="flex items-center">
                                        <FaUser className="w-4 h-4 mr-2" />
                                        Your Username
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder=""
                                    autoComplete="off"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <div className="flex items-center">
                                        <FaLock className="w-4 h-4 mr-2" />
                                        Password
                                    </div>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder=""
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="show-password"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            onChange={togglePasswordVisibility}
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="show-password" className="text-gray-500 dark:text-gray-300">show password</label>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</a>
                            </p>
                            <button
                                type="submit"
                                className="text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 float-right"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="hidden md:block" style={{ backgroundColor: 'blue' }}>
                        <img
                            className="object-cover w-full h-full"
                            src="https://static.vecteezy.com/system/resources/thumbnails/002/027/488/small_2x/illustration-of-sign-in-page-login-website-page-and-form-people-with-smartphone-screen-vector.jpg"
                            alt="illustration"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;