import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {toast, Slide} from 'react-toastify';

const ResetPassword = () => {

    const emailRef = useRef("");
    const [logo, setLogo] = useState();
    const [name, setName] = useState();
    const navigate = useNavigate();

    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }

    const checkEmail = async () => {
        const email = emailRef.current.value;
        if(email == "") return toast.warn('please enter email addreess', {
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
        const res = await axios.get('http://localhost:8000/api/customer/email/' + email);
        if(res.data.user.length <= 0) return toast.warn("email doesn't exist", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            theme: "light",
        });;
        navigate('/newpassword', { state: { email: emailRef.current.value, id: res.data.user[0].id } });
    }

    useEffect(()=>{
        getProfile();
    },[]);

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
                                Reset your password
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-4 text-sm font-medium text-gray-900">Enter your user account's verified email address and we will send you a opt code.</label>
                                    <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " placeholder="Enter your email address" required="" />
                                </div>
                                <button onClick={checkEmail} type="submit" className="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword;