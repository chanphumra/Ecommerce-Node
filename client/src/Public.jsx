import React,{useEffect, useState} from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import Home from './pages/Home';
import Chat from './chat/Chat';

const Public = () => {
    let page_name = new URLSearchParams(useLocation().search).get('page_name') || "home";
    const navigate = useNavigate();
    const [openChat, setOpenChat] = useState(false);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('carts')) || {products: [], subtotal: 0, discount_price: 0, total: 0});
    const [count, setCount] = useState(0);

    useEffect(()=>{
        setCount(carts.products.length);
        sessionStorage.removeItem('adminEmail');
    }, []);

    return (
        <>
            <Header count={count} setCount={setCount}/>
            {page_name === "home" ? <Home setCount={setCount} carts={carts} setCarts={setCarts}/> : <Outlet context={[count, setCount, carts, setCarts]}/>}
            <Footer />
            <div onClick={() => setOpenChat(open => !open)} className='fixed z-50 bottom-[20px] right-[30px] w-[50px] h-[50px] leading-[55px] cursor-pointer bg-white rounded-full shadow-lg border border-solid border-gray-300 text-center'>
                <i className="fa-regular fa-message text-primary text-2xl"></i>
            </div>
            {openChat ? <Chat setOpenChat={setOpenChat}/>: null}
        </>
    )
}

export default Public;