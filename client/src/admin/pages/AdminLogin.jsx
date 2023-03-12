import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {toast, Slide} from 'react-toastify'
import axios from "axios"
import React from "react"
import Logo from '../asset/image/logo.png'

const AdminLogin = () => {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const rememberRef = useRef(false);
    const navigate = useNavigate();
    const [logo, setLogo] = useState();
    const [name, setName] = useState();

    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }

    const Login = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(email === "" || password === "") return toast.warn('please check information again', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            theme: "light",
        });

        const url = "http://localhost:8000/api/admin/login";
        const res = await axios.post(url, {email, password});
        if (res.data.success) {
            sessionStorage.setItem('adminEmail', res.data.admin.email);
            toast.success('welcome back admin', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
                theme: "light",
            });
            navigate('/admin')
        }
        else {
            toast.warn(res.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide,
                theme: "light",
            });
        }
    }

    useEffect(()=>{
        getProfile();
    },[]);

    return (
        <>
            <section className={`bg-gray-50 h-screen bg-no-repeat bg-opacity-0 bg-[url('/src/admin/asset/image/background.jpg')]`} style={{ backgroundSize: "100% 100%" }}>
                <div className="bg-black bg-opacity-20 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        {name}
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Login as administator
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " placeholder="example@gmail.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " required="" />
                                </div>
                                {/* <div className="flex gap-2 items-center">
                                    <input ref={rememberRef} type="checkbox" id="remember" className="border border-solid border-gray-300 rounded-sm cursor-pointer focus:ring-primary" />
                                    <label htmlFor="remember" className="cursor-pointer text-sm"> Remember me</label>
                                </div> */}
                                <button onClick={Login} type="submit" className="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminLogin