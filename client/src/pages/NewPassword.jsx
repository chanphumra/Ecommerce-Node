import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {toast, Slide} from 'react-toastify';

const NewPassword = () => {

    const passwordRef = useRef();
    const [logo, setLogo] = useState();
    const [name, setName] = useState();

    const location = useLocation();
    const email = location.state?.email;
    const id = location.state?.id;

    const navigate = useNavigate();
    
    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }

    async function changePassword() {
        const password = passwordRef.current.value;
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
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        await axios.post('http://localhost:8000/api/customer/sendotp', {email, OTP});
        sessionStorage.setItem("OTP", OTP);
        navigate('/verifychangepassword', { state: {id, email, password} });
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
                                    <input ref={passwordRef} type="password" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " placeholder="Enter new password" required="" />
                                </div>
                                <button onClick={changePassword} type="submit" className="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewPassword;