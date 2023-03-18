import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, Slide } from 'react-toastify'
import React from "react"

const Login = () => {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const rememberRef = useRef(false);
    const navigate = useNavigate();

    const [logo, setLogo] = useState();
    const [name, setName] = useState();

    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }

    const checkUser = async () => {

        if (localStorage.getItem('userToken')) {
            toast.info('you are already login', {
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
            navigate('/');
        }
        else if (sessionStorage.getItem('userEmail')) {
            toast.info('you are already login', {
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
            navigate('/');
        }
    }

    const Logins = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const remember = rememberRef.current.checked;

        if (email === "" || password === "") return toast.warn('check your information again', {
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

        const url = "http://localhost:8000/api/customer/login";

        const res = await axios.post(url, { email, password });
        if (!res.data.success) return toast.warn('email or password incorrect', {
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
        toast.success('welcome back ' + res.data.user.name, {
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
        if (remember) {
            // remove session
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userPassword');
            // store token to localStorage
            localStorage.setItem('userToken', res.data.access_token);
        }
        else {
            // remove token
            localStorage.removeItem('userToken');
            // store session
            sessionStorage.setItem('userEmail', res.data.user.email);
            sessionStorage.setItem('userPassword', res.data.user.password);
        }
        navigate('/');
    }

    useEffect(() => {
        getProfile();
        checkUser();
    }, []);

    return (
        <>
            <section className={`bg-gray-50 h-screen bg-no-repeat bg-opacity-0 bg-[url('./src/assets/images/bg.png')]`} style={{ backgroundSize: "100% 100%" }}>
                <div className="bg-black bg-opacity-20 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        {name}
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
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
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <input ref={rememberRef} type="checkbox" id="remember" className="border border-solid border-gray-300 rounded-sm cursor-pointer focus:ring-primary" />
                                        <label htmlFor="remember" className="cursor-pointer text-sm"> Remember me</label>
                                    </div>
                                    <Link to='/resetpassword' className="text-sm font-medium text-primary cursor-pointer hover:underline">Forgot password?</Link>
                                </div>
                                <button onClick={Logins} type="submit" className="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="text-sm font-normal text-gray-500">
                                    Don’t have an account yet?
                                    <Link to='/register' href="#" className="font-medium text-primary hover:underline ml-1">Register now</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;