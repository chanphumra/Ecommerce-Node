import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { MdCloudUpload } from 'react-icons/md'
import {IoClose} from 'react-icons/io5'
import { toast, Slide } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {

    const [mainCheck, setMainCheck] = useState(true);
    const [mainCategory, setMainCategory] = useState([]);
    const [image, setImage] = useState('');
    const main_idRef = useRef(0);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const navigate = useNavigate();

    const previewImage = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setImage(imageArray[0]);
    }

    const getMainCategory = async () => {
        const url = 'http://localhost:8000/api/maincategory';
        await axios.get(
            url
        ).then(res => {
            setMainCategory(res.data.list);
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        getMainCategory();
    }, [])

    const create = async () => {
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const image = imageRef.current.files[0];
        const main_id = main_idRef.current.value;
        const url = mainCheck ? 'http://localhost:8000/api/maincategory' : 'http://localhost:8000/api/subcategory';

        if (name != null && description != null && image != null) {

            const data = {
                main_id: main_id,
                name: name,
                description: description,
                image: image
            };
            if (!mainCheck && main_id === '') { alert('no main id'); return; }

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch(err => {
                console.log(err);
            });
            nameRef.current.value = descriptionRef.current.value = imageRef.current.value = null; setImage('');
            toast.success('Category add successfully', {
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
            navigate('/admin/show_category?page_name=show_category');
        }
        else {
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
                <h1 className='text-3xl font-bold text-black_500'>Add a category</h1>
                <button onClick={() => create()} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Publish category</button>
            </div>
            <div className="mt-10 flex flex-col gap-8 md:flex-row">
                <div className='flex-[4]'>
                    <div className="flex justify-between">
                        <h1 className='text-xl font-semibold text-gray-800'>Category Title</h1>
                        <div className='flex gap-2 items-center'>
                            <input checked={mainCheck} type="checkbox" name="" id="main-category" className='w-4 h-4 border-solid border border-gray-500 rounded-[4px] checked:rounded-[4px] cursor-pointer' onChange={e => setMainCheck(e.target.checked)} />
                            <label htmlFor="main-category" className='text-[15px] cursor-pointer'>Main category</label>
                        </div>
                    </div>
                    <div className="mt-3">
                        <input ref={nameRef} type="text" name="" id="" className='input text-sm w-full' placeholder='Write title here...' />
                    </div>
                    <div className="mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Category Description</h1>
                        <div className='mt-3'>
                            <textarea ref={descriptionRef} name="" id="" placeholder='Write a description here...' className='text-sm h-[200px] input w-full resize-none'></textarea>
                        </div>
                    </div>

                    <div className="mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Display images</h1>
                        {
                            image != '' &&
                            <div className="inline-flex gap-4 mt-2">
                                <div className='relative w-20 h-20 p-[2px] rounded-lg border-solid border border-gray-300 overflow-hidden'>
                                    <div onClick={()=>{setImage(''); imageRef.current.value=null;}} className='absolute right-[2px] top-[2px] cursor-pointer'>
                                        <IoClose color='white' className='bg-red-500 w-4 h-4 rounded-full p-[0.1rem]' />
                                    </div>
                                    <img src={image} alt="" className='w-full h-full rounded-lg object-cover' />
                                </div>
                            </div>
                        }

                        <div className="relative h-[200px] mt-3 border-dashed border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center">
                            <MdCloudUpload className='text-primary text-[46px]' />
                            <p className='text-[15px] text-gray-600'>Browse category image</p>
                            <input onChange={previewImage} ref={imageRef} className='absolute w-full h-full opacity-0 cursor-pointer' type="file" name="" id="" accept="image/*" />
                        </div>
                    </div>
                </div>

                <div className='flex-[2]'>
                    <div className="border-solid border border-gray-300 rounded-lg p-4 h-[305px] bg-white mt-2 md:mt-10">
                        <h1 className='text-xl font-semibold text-gray-800'>Organize</h1>
                        <p className='text-[15px] mt-4 font-semibold'>Main category</p>
                        <select ref={main_idRef} name="" id="" className={`w-full mt-2 text-[14px] cursor-pointer ${mainCheck ? "pointer-events-none bg-body" : null}`} >
                            {
                                mainCategory.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddCategory;