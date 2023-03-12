import React, { useEffect, useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { toast, Slide } from 'react-toastify'
import { HiMinusSm } from 'react-icons/hi'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import Empty from '../assets/images/empty.png'
import axios from 'axios'

const header = ['PRODUCTS', 'PRICE', 'QUANTITY', 'TOTAL'];

const cart = JSON.parse(localStorage.getItem('carts')) || { products: [], subtotal: 0, discount_price: 0, total: 0 };

const Cart = () => {

    const navigate = useNavigate();
    const [count, setCount, carts, setCarts] = useOutletContext();
    const [user, setUser] = useState({ id: 0, image: '', name: '' });
    const [isUser, setIsUser] = useState(false);

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

    const CalculateQty = (product, index) => {

        const [qty, setQty] = useState(product.qty);

        const updatePluscart = () => {
            const newProduct = cart.products[index];
            newProduct.qty = qty + 1;
            cart.subtotal += newProduct.sale_price;
            cart.discount_price += newProduct.sale_price * newProduct.discount / 100;
            cart.total = (cart.subtotal - cart.discount_price);
            localStorage.setItem('carts', JSON.stringify(cart));
            setCarts(cart);
            setCount(cart.products.length);
        }

        const updateMinuscart = () => {
            const newProduct = cart.products[index];
            newProduct.qty = qty - 1;
            cart.subtotal -= newProduct.sale_price;
            cart.discount_price -= newProduct.sale_price * newProduct.discount / 100;
            cart.total = (cart.subtotal - cart.discount_price);
            if (qty === 1) { cart.products.splice(index, 1); window.location.reload(false) }
            localStorage.setItem('carts', JSON.stringify(cart));
            setCarts(cart);
            setCount(cart.products.length);
        }

        return <div className='flex items-center gap-3'>
            <HiMinusSm className='w-3 h-3 cursor-pointer text-black ' onClick={() => { setQty(pre => pre - 1); updateMinuscart(); }} />
            <p>{qty}</p>
            <BiPlus className='w-3 h-3 cursor-pointer text-black ' onClick={() => { setQty(pre => pre + 1); updatePluscart(); }} />
        </div>
    }

    const gotoShopping = () => {
        if (!isUser) {
            toast.warn('Please sign in to your account', {
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
            return;
        }
        navigate('/shippinginfo?page_name=shippinginfo')
    }

    const removeCart = (index) => {
        const newProduct = cart.products[index];
        cart.subtotal -= newProduct.qty * newProduct.sale_price;
        cart.discount_price -= newProduct.qty * newProduct.sale_price * newProduct.discount / 100;
        cart.total = (cart.subtotal - cart.discount_price);
        cart.products.splice(index, 1);
        localStorage.setItem('carts', JSON.stringify(cart));
        setCarts(cart);
        setCount(cart.products.length);
        window.location.reload(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return <>
        {
            carts.products.length > 0 ? <div className='mycontainer min-h-[90vh]'>
                <h1 className='text-3xl font-bold text-black_500'>Cart</h1>
                <div className="flex flex-col gap-10 md:flex-row mt-7">
                    <div className="flex-[4]">
                        <div className="w-full pb-2 overflow-x-auto overflow-y-none scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-[#8884d8] scrollbar-thumb-rounded-xl ">
                            <table className='w-[800px] md:w-full'>
                                <thead className='border-solid border-b border-t border-gray-300'>
                                    <tr>
                                        {header.map((item, index) => (
                                            <th key={index} className={`${index === 0 ? 'w-[300px]' : null} text-start text-gray-600 text-sm py-2 px-3`}>{item}</th>
                                        ))}
                                        <th className='text-end text-gray-600 text-sm py-2 px-3 pr-4 w-3'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        carts.products.map((item, index) => {
                                            return <tr key={index} className='group relative border-solid border-b border-gray-300' >
                                                <td className='py-2 px-3 flex items-center gap-1'>
                                                    <img src={item.image} alt="" className='w-[45px] h-[45px] border-solid border border-gray-300 rounded-md object-cover' />
                                                    <p className='w-[300px] text-ph font-semibold truncate text-[#8884d8] py-2 px-3'>{item.name}</p>
                                                </td>
                                                <td className='text-ph font-semibold text-gray-700 py-2 px-3'>${item.sale_price}</td>
                                                <td className='text-ph font-semibold text-gray-700 py-2 px-3 items-center'>
                                                    {CalculateQty(item, index)}
                                                </td>
                                                <td className='text-ph font-semibold text-gray-700 py-2 px-3'>${item.sale_price * item.qty}</td>
                                                <td><IoMdTrash onClick={() => removeCart(index)} className='w-[20px] h-[20px] text-gray-600 cursor-pointer hover:text-gray-800' /></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between mt-2 border-b border-solid border-gray-300 pb-4">
                            <p className='text-base text-gray-800 font-semibold'>Items subtotal:</p>
                            <span className='text-lg text-gray-800 font-semibold'>${cart.subtotal}</span>
                        </div>
                    </div>
                    <div className="flex-[2]">
                        <div className="border-solid border border-gray-300 rounded-lg p-4 bg-white mt-2 md:mt-0">
                            <h1 className='text-2xl font-bold text-black_500'>Summary</h1>
                            <div className="flex justify-between items-center mt-4">
                                <p className='text-base text-gray-900'>Items subtotal:</p>
                                <span className='text-lg text-gray-800'>${cart.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className='text-base text-gray-900'>Discount:</p>
                                <span className='text-lg text-red-500'>-${(cart.discount_price).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className='text-base text-gray-900'>Tax:</p>
                                <span className='text-lg text-gray-800'>$0</span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className='text-base text-gray-900'>Subtotal:</p>
                                <span className='text-lg text-gray-800'>${cart.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center mt-4 border-t pt-4 border-gray-300 border-dashed">
                                <p className='text-xl text-gray-800 font-semibold'>Total:</p>
                                <span className='text-xl text-gray-800 font-semibold'>${cart.total}</span>
                            </div>

                            <button onClick={gotoShopping} className='w-full py-2 mt-8 bg-[#8884d8] text-white rounded-lg text-base cursor-pointer'>Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </div> :
            <div className='mycontainer h-[80vh] flex justify-center items-center flex-col bg-body'>
                <img src={Empty} alt="" className='w-[300px] h-[300px]' />
                <h1 className='text-lg md:text-4xl font-semibold mt-10 '>Your Cart is <span className='text-primary'>Empty!</span></h1>
                <Link to='/'>
                    <button className='text-lg md:text-xl font-semibold text-white bg-primary px-[50px] py-2 rounded-full mt-10'>Back to shop</button>
                </Link>
            </div>
        }
    </>;
}

export default Cart;