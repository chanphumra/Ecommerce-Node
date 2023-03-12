import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast, Slide} from 'react-toastify' 

const SiteProfile = () => {
    const nameRef = useRef();
    const imageRef = useRef();
    const cityRef = useRef();
    const countryRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const previewImage = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setImage(imageArray[0]);
    }

    const getProfile = async () =>{
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        nameRef.current.value = data.name;
        cityRef.current.value = data.city;
        countryRef.current.value = data.country;
        phoneRef.current.value = data.phone;
        emailRef.current.value = data.email;
        setImage(data.image);
    }

    const update = async () =>{
        const name = nameRef.current.value;
        const city = cityRef.current.value;
        const country = countryRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const image = imageRef.current.files[0];

        const res = await axios.put('http://localhost:8000/api/profile',{name,city,country,phone,email,image}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        window.location.reload(false);
    }

    useEffect(()=>{
        getProfile();
    }, []);

    return (
        <>
            <div className='lg:py-7 lg:px-10 p-5'>
                <div className="flex justify-between items-end">
                    <h1 className='text-3xl font-bold text-black_500'>Profile Setting</h1>
                    <button onClick={update} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Save Change</button>
                </div>
                <div className="flex mt-14 gap-8 flex-col md:flex-row">
                    <div className="flex-[2] bg-white p-5 rounded-lg shadow-md">
                        <div className='relative w-[150px] h-[150px] rounded-full border border-solid border-gray-300 bg-white shadow-sm'>
                            <img src={image} alt="" className='w-full h-full rounded-full object-cover p-1' />
                            <i className="absolute fa-solid fa-pen-to-square w-[40px] h-[40px] leading-[40px] text-center text-primary cursor-pointer bg-white rounded-full right-0 bottom-[5px] shadow-sm border border-solid border-gray-300"></i>
                            <input onChange={previewImage} ref={imageRef} type='file' className="opacity-0 absolute fa-solid fa-pen-to-square w-[40px] h-[40px] leading-[40px] text-center text-primary cursor-pointer bg-white rounded-full right-0 bottom-[5px] shadow-md border border-solid border-gray-300" />
                        </div>
                        <div className="mt-5">
                            <p className='mb-2'>Company name</p>
                            <input ref={nameRef} type="text" className='input w-full' placeholder='company name' />
                        </div>
                    </div>
                    <div className="flex-[4] bg-white p-5 rounded-lg shadow-md">
                        <h1 className='text-xl font-semibold'>General information</h1>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full mt-5">
                            <div className="w-full">
                                <p className='mb-2'>City</p>
                                <input ref={cityRef} type="text" className='input w-full' placeholder='phnom penh' />
                            </div>
                            <div className="w-full">
                                <p className='mb-2'>Country</p>
                                <input ref={countryRef} type="text" className='input w-full' placeholder='cambodia' />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full mt-3">
                            <div className="w-full">
                                <p className='mb-2'>Phone</p>
                                <input ref={phoneRef} type="text" className='input w-full' placeholder='+1234567890' />
                            </div>
                            <div className="w-full">
                                <p className='mb-2'>Email</p>
                                <input ref={emailRef} type="text" className='input w-full' placeholder='company@gmail.com' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteProfile;