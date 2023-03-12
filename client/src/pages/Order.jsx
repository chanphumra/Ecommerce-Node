import React, { useState, useEffect } from 'react';
import OrdersTable from '../components/table/OrdersTable';
import Empty from '../assets/images/empty.png';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Order = () => {
    const [order, setOrder] = useState([]);

    const getOrder = async () => {
        // get customer
        let cus_id = 0;
        if (localStorage.getItem('userToken')) {
            // remove session
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userPassword');
            // get user
            const token = localStorage.getItem('userToken');
            const url = 'http://localhost:8000/api/customer/check';
            const res = await axios.get(url, { headers: { authorization: token } })
            cus_id = res.data.user.id;
        }
        else if (sessionStorage.getItem('userEmail')) {
            // remove token
            localStorage.removeItem('userToken');
            // get user
            const email = sessionStorage.getItem('userEmail');
            const url = 'http://localhost:8000/api/customer/email/' + email;
            const res = await axios.get(url);
            cus_id = res.data.user[0].id;
        }
        const res = await axios.get('http://localhost:8000/api/order/order/' + cus_id);
        setOrder(res.data.list);
    }

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
            {
                order.length > 0 ? <div className='mycontainer min-h-[90vh]'>
                    <h1 className='text-3xl font-bold text-black_500'>Your Orders</h1>
                    <div className='mt-5'>
                        <OrdersTable />
                    </div>
                </div> :
                    <div className='mycontainer h-[80vh] flex justify-center items-center flex-col bg-body'>
                        <img src={Empty} alt="" className='w-[300px] h-[300px]' />
                        <h1 className='text-lg md:text-4xl font-semibold mt-10 '>Your Order is <span className='text-primary'>Empty!</span></h1>
                        <Link to='/'>
                            <button className='text-lg md:text-xl font-semibold text-white bg-primary px-[50px] py-2 rounded-full mt-10'>Back to shop</button>
                        </Link>
                    </div>
            }
        </>
    )
}

export default Order;