import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {toast, Slide} from 'react-toastify'
import validator from 'validator';
import axios from 'axios';
import Avatar from '../assets/images/avatar.png'

const Register = () => {

    const [first, setFirst] = useState(true);
    const [image, setImage] = useState(Avatar);

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmpasswordRef = useRef('');
    const imageRef = useRef('');
    const navigate = useNavigate();
    const [logo, setLogo] = useState();
    const [name, setName] = useState();

    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }

    const previewImage = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setImage(imageArray[0]);
    }

    const next = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirm = confirmpasswordRef.current.value;

        if(name === "" || email === "" || password === "" || confirm === ""){
            return toast.warn('Please check information again !!', {
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
        if(!validator.isEmail(email)){
            return toast.warn('Please enter a valid email', {
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
        if(password != confirm){
            return toast.warn("Password don't mutch !!", {
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
        setFirst(false);
    }

    const SendVerify = async (e) => {
        if(imageRef.current.files.length == 0) {
            return toast.warn("Please select profile picture", {
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
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const image = imageRef.current.files[0];
        const OTP = Math.floor(Math.random() * 9000 + 1000);

        const url = "http://localhost:8000/api/customer/register";

        let formData = new FormData();
        formData.append("usernameReg", name);
        formData.append("emailReg", email);
        formData.append("passwordReg", password);
        formData.append('verify', 0);
        formData.append("image", image);
        formData.append('OTP', OTP);
        
        const res = await axios.post(url, formData);
        if(!res.data.success){
            return toast.warn(res.data.message, {
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
        navigate('/verifyemail', { state: { email } });
    }

    useEffect(()=>{
        getProfile();
    },[]);

    return (
        <>
            <section className={`${first ? "":"hidden"} bg-gray-50 h-screen bg-no-repeat bg-opacity-0 bg-[url('./src/assets/images/bg.png')]`} style={{ backgroundSize: "100% 100%" }}>
                <div className="bg-black bg-opacity-20 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        {name}
                    </a>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input ref={nameRef} type="text" name="username" id="username" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " placeholder="username" required="" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " placeholder="example@gmail.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " required="" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                    <input ref={confirmpasswordRef} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " required="" />
                                </div>
                                <button onClick={next} type="submit" className="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Next</button>
                                <p className="text-sm font-normal text-gray-500">
                                    Already have an account?
                                    <Link to='/login' href="#" className="font-medium text-primary hover:underline"> Sign in here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${first ? "hidden":""} bg-gray-50 h-screen bg-no-repeat bg-opacity-0 bg-[url('./src/assets/images/bg.png')]`} style={{ backgroundSize: "100% 100%" }}>
                <div className="bg-black bg-opacity-20 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-white">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        {name}
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div className="w-full flex justify-center py-5">
                                    <div className='relative w-[150px] h-[150px] rounded-full border border-solid border-gray-300 bg-white shadow-sm'>
                                        <img src={image} alt="" className='w-full h-full rounded-full object-cover p-1' />
                                        <i className="absolute fa-solid fa-pen-to-square w-[40px] h-[40px] leading-[40px] text-center text-primary cursor-pointer bg-white rounded-full right-0 bottom-[5px] shadow-sm border border-solid border-gray-300"></i>
                                        <input onChange={previewImage} ref={imageRef} type='file' className="opacity-0 absolute fa-solid fa-pen-to-square w-[40px] h-[40px] leading-[40px] text-center text-primary cursor-pointer bg-white rounded-full right-0 bottom-[5px] shadow-md border border-solid border-gray-300" />
                                    </div>
                                </div>
                                <button onClick={SendVerify} type="submit" className="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                <p className="text-sm font-normal text-gray-500">
                                    Already have an account?
                                    <Link to='/login' href="#" className="font-medium text-primary hover:underline"> Sign in here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register