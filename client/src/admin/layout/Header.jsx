import React, {useState, useEffect } from 'react'
import { IoMenu } from 'react-icons/io5'
import { BsChat } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Header = ({ setOpen }) => {

    const [logo, setLogo] = useState();
    const [name, setName] = useState();
    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }
    useEffect(()=>{
        getProfile();
    },[]);

    return (
        <div className='sticky z-50 top-0 flex justify-between items-center w-full bg-white border-solid border-gray-300 border-b py-3 px-5 lg:px-10'>
            <div className="flex items-center gap-3">
                <IoMenu onClick={() => { setOpen(pre => !pre) }} className='lg:hidden text-2xl text-gray-500 mr-2 cursor-pointer' />
                <img src={logo} alt="" className='w-10 h-10 object-cover' />
                <h1 className='font-semibold text-xl lg:text-2xl text-gray-500'>{name}</h1>
            </div>
            <div className='flex gap-4 items-center'>
                <Link to='/admin/chat?page_name=chat'>
                    <div className='border border-solid border-gray-300 w-10 h-10 rounded-full object-cover cursor-pointer bg-body flex items-center justify-center'>
                        <BsChat className='text-lg font-semibold cursor-pointer text-gray-500'/>
                    </div>
                </Link>
                <img src="" alt="" className='w-10 h-10 rounded-full object-cover cursor-pointer' />
            </div>
        </div>
    )
}

export default Header;