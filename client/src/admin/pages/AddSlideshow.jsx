import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { MdCloudUpload } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { toast, Slide } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddSlideshow = () => {

    const titleRef = useRef();
    const textRef = useRef();
    const linkRef = useRef();
    const imageRef = useRef();
    const enableRef = useRef(false);
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

    const create = async () => {
        const title = titleRef.current.value;
        const text = textRef.current.value;
        const link = linkRef.current.value;
        const imageslide = imageRef.current.files[0];
        const enable = enableRef.current.checked ? 1 : 0 ;

        if(title != '' && text != '' && link != '' && image != ''){
            const url = 'http://localhost:8000/api/slideshow';
            const formdata = new FormData();
            formdata.append('title', title);
            formdata.append('text', text);
            formdata.append('link', link);
            formdata.append('image', imageslide);
            formdata.append('enable', enable);
            formdata.append('orders', 0);
            
            const res = await axios.post(url, formdata);
            console.log(res);
            titleRef.current.value = textRef.current.value = linkRef.current.value = imageRef.current.value = null;
            enableRef.current.checked = false;
            setImage('');
            toast.success('Slideshow add successfully', {
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
            navigate('/admin/show_slideshow?page_name=show_slideshow');
        }
        else{
            toast.warn('Please check information again!!', {
                position: "top-center",
                autoClose: 600,
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

    return (
        <div className='lg:py-7 lg:px-10 p-5'>
            <div className="flex justify-between items-end">
                <h1 className='text-3xl font-bold text-black_500'>Add a slideshow</h1>
                <button onClick={() => create()} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Publish slideshow</button>
            </div>
            <div className="mt-10 flex flex-col gap-8 md:flex-row">
                <div className='flex-[4]'>
                    <div className="flex justify-between">
                        <h1 className='text-xl font-semibold text-gray-800'>Title</h1>
                        <div className="flex gap-2 items-center" >
                            <input ref={enableRef} type="checkbox" name="" id="enable" className='w-4 h-4 cursor-pointer ml-2  border-solid border border-gray-500 rounded-[4px] checked:rounded-[4px]' />
                            <label htmlFor="enable" className='text-md cursor-pointer'>Enable</label>
                        </div>
                    </div>
                    <div className="mt-3">
                        <input ref={titleRef} type="text" name="" id="" className='input text-sm w-full' placeholder='Write title here...' />
                    </div>
                    <div className="mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Description</h1>
                        <div className='mt-3'>
                            <textarea ref={textRef} name="" id="" placeholder='Write a description here...' className='text-sm h-[200px] input w-full resize-none'></textarea>
                        </div>
                    </div>
                    <div className="flex justify-between mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Link</h1>
                    </div>
                    <div className="mt-3">
                        <input ref={linkRef} type="text" name="" id="" className='input text-sm w-full' placeholder='Write link here...' />
                    </div>

                    <div className="mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Display images</h1>
                        {
                            image != '' &&
                            <div className="inline-flex gap-4 mt-7">
                                <div className='relative w-20 h-20 p-[2px] rounded-lg border-solid border border-gray-300 overflow-hidden'>
                                    <div onClick={() => { setImage(''); imageRef.current.value = null; }} className='absolute right-[2px] top-[2px] cursor-pointer'>
                                        <IoClose color='white' className='bg-red-500 w-4 h-4 rounded-full p-[0.1rem]' />
                                    </div>
                                    <img src={image} alt="" className='w-full h-full rounded-lg object-cover' />
                                </div>
                            </div>
                        }

                        <div className="relative h-[200px] mt-3 border-dashed border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center">
                            <MdCloudUpload className='text-primary text-[46px]' />
                            <p className='text-[15px] text-gray-600'>Browse slideshow image</p>
                            <input onChange={previewImage} ref={imageRef} className='absolute w-full h-full opacity-0 cursor-pointer' type="file" name="" id="" accept="image/*" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddSlideshow;