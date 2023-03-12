import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Slide } from 'react-toastify'

const SiteProfile = () => {
    const nameRef = useRef();
    const imageRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const [image, setImage] = useState('');
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    const previewImage = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setImage(imageArray[0]);
    }

    const getUsers = async () => {

        if (localStorage.getItem('userToken')) {
            // remove session
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userPassword');
            // get user
            const token = localStorage.getItem('userToken');
            const url = 'http://localhost:8000/api/customer/check';
            const res = await axios.get(url, { headers: { authorization: token } })
            const data = res.data.user;
            setImage(data.image); nameRef.current.value = data.name;
            setUserId(data.id);
        }
        else if (sessionStorage.getItem('userEmail')) {
            // remove token
            localStorage.removeItem('userToken');
            // get user
            const email = sessionStorage.getItem('userEmail');
            const url = 'http://localhost:8000/api/customer/email/' + email;
            const res = await axios.get(url);
            const data = res.data.user[0];
            setImage(data.image); nameRef.current.value = data.name;
            setUserId(data.id);
        }
    }

    const updateProfile = async () => {
        const name = nameRef.current.value;
        const image = imageRef.current.files[0];

        const res = await axios.put('http://localhost:8000/api/customer/profile/' + userId, { name, image }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        window.location.reload(false);
    }

    const updatePassword = async () => {
        const password = passwordRef.current.value;
        const cpassword = cpasswordRef.current.value;

        if (password == '' || cpassword == '') return toast.warn('Please check information again !!', {
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
        if (password != cpassword) return toast.warn("Password don't mutch !!", {
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
        await axios.put('http://localhost:8000/api/customer/password/' + userId, {password: password});
        toast.success("Password reset success", {
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
        passwordRef.current.value = cpasswordRef.current.value = null;
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className='mycontainer min-h-[90vh]'>
                <div className="flex justify-between items-end">
                    <h1 className='text-3xl font-bold text-black_500'>Profile Setting</h1>
                    <button onClick={updateProfile} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Save Change</button>
                </div>
                <div className="flex mt-14 gap-8 flex-col md:flex-row">
                    <div className="flex-[2] bg-white p-5 rounded-lg shadow-md">
                        <div className='relative w-[150px] h-[150px] rounded-full border border-solid border-gray-300 bg-white shadow-sm'>
                            <img src={image} alt="" className='w-full h-full rounded-full object-cover p-1' />
                            <i className="absolute fa-solid fa-pen-to-square w-[40px] h-[40px] leading-[40px] text-center text-primary cursor-pointer bg-white rounded-full right-0 bottom-[5px] shadow-sm border border-solid border-gray-300"></i>
                            <input onChange={previewImage} ref={imageRef} type='file' className="opacity-0 absolute fa-solid fa-pen-to-square w-[40px] h-[40px] leading-[40px] text-center text-primary cursor-pointer bg-white rounded-full right-0 bottom-[5px] shadow-md border border-solid border-gray-300" />
                        </div>
                        <div className="mt-5">
                            <p className='mb-2'>Username</p>
                            <input ref={nameRef} type="text" className='input w-full' placeholder='Username' />
                        </div>
                    </div>
                    <div className="flex-[4] bg-white p-5 rounded-lg shadow-md">
                        <h1 className='text-xl font-semibold'>Change Password</h1>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full mt-5">
                            <div className="w-full">
                                <p className='mb-2'>New Password</p>
                                <input ref={passwordRef} type="password" className='input w-full' placeholder="••••••••" />
                            </div>
                            <div className="w-full">
                                <p className='mb-2'>Confirm Password</p>
                                <input ref={cpasswordRef} type="password" className='input w-full' placeholder="••••••••" />
                            </div>
                        </div>
                        <div className="flex justify-end md:flex-row gap-4 md:gap-8 w-full mt-[85px]">
                            <button onClick={updatePassword} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteProfile;