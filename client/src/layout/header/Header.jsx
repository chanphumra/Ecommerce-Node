import React from 'react'
import Navbar from '../navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri'
import { useState, useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsBag } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md'
import axios from 'axios';

const Header = (props) => {

  const navigate = useNavigate();

  const [user, setUser] = useState({ id: 0, image: '', name: '' });
  const [isUser, setIsUser] = useState(false);
  const [logo, setLogo] = useState();
  const [name, setName] = useState();

  const getProfile = async () => {
    const res = await axios.get('http://localhost:8000/api/profile');
    const data = res.data.list[0];
    setLogo(data.image); setName(data.name);
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
      setUser(res.data.user); setIsUser(true);
      return;
    }
    else if (sessionStorage.getItem('userEmail')) {
      // remove token
      localStorage.removeItem('userToken');
      // get user
      const email = sessionStorage.getItem('userEmail');
      const url = 'http://localhost:8000/api/customer/email/' + email;
      const res = await axios.get(url);
      setUser(res.data.user[0]); setIsUser(true);
      return;
    }
    setIsUser(false);
  }

  const gotoCart = () => {
    navigate('/cart?page_name=cart ');
    window.location.reload(false);
  }

  const Logout = () => {
    // remove token
    localStorage.removeItem('userToken');
    // remove session
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userPassword');
    navigate("/login");
  }

  useEffect(() => {
    getUsers();
    getProfile();
  }, []);
  
  return (
    <>
      <div className="bg-white border-b border-solid border-grey-500">
        <section className='search mycontainer bg-[#f6f9fc] flex flex-wrap md:flex-nowrap gap-4 md:gap-8 justify-between items-center m-auto py-2 z-50'>

          <Link to="/">
            <div className="flex items-center gap-4">
              <div className="logo w-[40px]">
                <img src={logo} alt="" className='w-full h-[40px] object-cover' />
              </div>
              <p className='text-gray-700 font-semibold text-xl md:text-2xl'>{name}</p>
            </div>
          </Link>

          {/* search */}
          <div className="order-last relative md:order-none w-full md:w-[500px] flex items-center">
            <RiSearchLine className='absolute top-[50%] left-3 translate-y-[-50%] w-4 h-4 text-gray-500' />
            <input type="text" name="" id="" placeholder='Search product here...' className='w-full rounded-full pl-10 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
          </div>

          <div className="flex items-center">
            {/* <div className="relative mr-3">
              <Link to='/wishlist?page_name=wishlist'>
                <i className='fa-solid fa-heart w-10 h-10 md:w-[46px] md:h-[46px] bg-[#f3f5f9] rounded-full text-center leading-10 md:leading-[46px]'></i>
                <span className='absolute -top-1 right-0  w-4 h-4 md:w-5 md:h-5 leading-4 md:leading-5 rounded-full text-center bg-[#8884d8] text-[13px] text-white'>0</span>
              </Link>
            </div> */}
            <div className="relative mr-3 cursor-pointer" onClick={gotoCart}>
              <i className='fa-solid fa-cart-shopping w-10 h-10 md:w-[46px] md:h-[46px] bg-[#f3f5f9] rounded-full text-center leading-10 md:leading-[46px]'></i>
              <span className='absolute -top-1 right-0  w-4 h-4 md:w-5 md:h-5 leading-4 md:leading-5 rounded-full text-center bg-[#8884d8] text-[13px] text-white'>{props.count}</span>
            </div>
            {
              isUser ?
                <button className='relative group cursor-default  w-10 h-10 md:w-[46px] md:h-[46px]'>
                  <img src={user.image} className='fa fa-user w-10 h-10 md:w-[46px] md:h-[46px] bg-[#f3f5f9] rounded-full text-center leading-10 md:leading-[46px] cursor-pointer object-cover' />
                  <div className="py-5 px-4 group-focus:block hidden absolute bg-white top-[57px] right-0 shadow-sm rounded z-50 w-[300px] border border-solid border-gray-300">
                    <img src={user.image} className='fa fa-user w-10 h-10 md:w-[46px] md:h-[46px] bg-[#f3f5f9] rounded-full text-center leading-10 md:leading-[46px] cursor-pointer object-cover' />
                    <p className='text-base font-semibold truncate'>{user.name}</p>
                    <div className="flex gap-2 items-center mt-5 cursor-pointer hover:underline">
                      <BiUser className='text-lg ' />
                      <p onClick={() => navigate('/userprofile?page_name=userprofile')} className='text-sm font-semibold text-gray-800'>Profile</p>
                    </div>
                    <div className="flex gap-2 items-center mt-3 cursor-pointer hover:underline">
                      <BsBag className='text-lg font-semibold' />
                      <p onClick={() => navigate('/order?page_name=order')} className='text-sm font-semibold text-gray-800'>Orders</p>
                    </div>
                    <div className="border-t border-solid border-gray-300 mt-7">
                      <div onClick={Logout} className="cursor-pointer flex gap-2 items-center justify-center bg-body border-solid border border-gray-300 rounded-md py-2 mt-3">
                        <MdLogout className='text-lg font-semibold' />
                        <p className='text-sm font-semibold'>Logout</p>
                      </div>
                    </div>

                  </div>
                </button>
                :
                <Link to='/login'>
                  <i className='fa fa-user w-10 h-10 md:w-[46px] md:h-[46px] bg-[#f3f5f9] rounded-full text-center leading-10 md:leading-[46px] cursor-pointer'></i>
                </Link>
            }
          </div>
        </section>
        <Navbar />
      </div>
    </>
  )
}

export default Header