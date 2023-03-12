import React from 'react';
import { useState, useEffect } from 'react';
import Header from './layout/Header';
import Body from './layout/Body';
import { BrowserRouter, HashRouter, useNavigate } from 'react-router-dom';

// custom hook
function useWindowSize() {

    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth]);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);
    return size;
}

const Admin = () => {
    const [open, setOpen] = useState(false);
    const [height, width] = useWindowSize();
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(width > 1024);
        if(!sessionStorage.getItem('adminEmail')){
            navigate('/admin/login');
        }
    }, [width]);

    return (
        <>
            <Header setOpen={setOpen} />
            <Body open={open} setOpen={setOpen} />
        </>
    )
}

export default Admin;