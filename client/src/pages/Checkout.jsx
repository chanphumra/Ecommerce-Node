import React from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr'
import { BiHome } from 'react-icons/bi'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from '../paypal/Paypal'
const initialOptions = {
    "client-id": "AQWkrZ-K_tJ6LOb4smFBfS69sKsndyWpfnEQpQ_WPvdSQ7wkm9uut6dXk7PpOITDJ_n0BVrg2gXLea3c",
    currency: "USD",
};

//const carts = JSON.parse(localStorage.getItem('carts')) || { products: [], subtotal: 0, discount_price: 0, total: 0 };

const Checkout = () => {

    const [count, setCount, carts, setCarts] = useOutletContext();
    const location = useLocation();
    const data = location.state?.data;

    return (
        <>
            <div className='mycontainer min-h-[90vh]'>
                <h1 className='text-3xl font-bold text-black_500'>Check out</h1>
                <div className="flex flex-col gap-8 md:gap-[100px] md:flex-row mt-7">
                    <div className="flex-[4]">
                        <h1 className='text-2xl font-bold text-black_500 mb-8'>Shopping Details</h1>
                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <FiUser />
                                <p className='text-base font-semibold w-[300px]'>Name</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.name}</span>
                        </div>

                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <MdOutlineEmail />
                                <p className='text-base font-semibold w-[300px]'>Email</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.email}</span>
                        </div>

                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <FiPhone />
                                <p className='text-base font-semibold w-[300px]'>Phone</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.phone}</span>
                        </div>

                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <GrLocation />
                                <p className='text-base font-semibold w-[300px]'>Address 1</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.address1}</span>
                        </div>

                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <GrLocation />
                                <p className='text-base font-semibold w-[300px]'>Address 2</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.address2}</span>
                        </div>

                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <BiHome />
                                <p className='text-base font-semibold w-[300px]'>Province</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.province}</span>
                        </div>

                        <div className="mt-5 flex">
                            <div className='flex gap-2 items-center'>
                                <BiHome />
                                <p className='text-base font-semibold w-[300px]'>Country</p>
                            </div>
                            <span className='mr-10 font-bold'>:</span>
                            <span className='text-base font-semibold'>{data.country}</span>
                        </div>
                    </div>

                    <div className="flex-[2]">
                        <div className="border-solid border border-gray-300 rounded-lg p-4 bg-white mt-2 md:mt-0">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className='text-2xl font-bold text-black_500'>Summary</h1>
                                <Link to='/cart?page_name=cart'><span className='text-sm font-semibold text-[#8884d8] cursor-pointer hover:underline'>Edit cart</span></Link>
                            </div>

                            <div className="flex flex-col gap-2 pb-5 mb-5 border-dashed border-b border-gray-300">

                                {
                                    carts.products.map((item, index) => {
                                        return <div key={index} className="flex justify-between items-center mb-2">
                                            <div className='flex items-center gap-2'>
                                                <img src={item.image} alt="" className='w-[40px] h-[40px] object-cover rounded-md' />
                                                <p className='w-[170px] truncate'>{item.name}</p>
                                            </div>
                                            <span className='text-gray-600 text-sm font-semibold'>x{item.qty}</span>
                                            <span className='text-lg text-gray-800'>${item.sale_price}</span>
                                        </div>
                                    })
                                }
                            </div>

                            <div className="flex justify-between items-center mt-1">
                                <p className='text-base text-gray-900'>Items subtotal:</p>
                                <span className='text-lg text-gray-800'>${carts.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className='text-base text-gray-900'>Discount:</p>
                                <span className='text-lg text-red-500'>-${carts.discount_price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className='text-base text-gray-900'>Tax:</p>
                                <span className='text-lg text-gray-800'>$0</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className='text-base text-gray-900'>Subtotal:</p>
                                <span className='text-lg text-gray-800'>${carts.subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center my-4 border-t  pt-4 border-gray-300 border-dashed">
                                <p className='text-xl text-gray-800 font-semibold'>Total:</p>
                                <span className='text-xl text-gray-800 font-semibold'>${carts.total}</span>
                            </div>

                            {/* paypal */}
                            <PayPalScriptProvider options={initialOptions}>
                                <Paypal data={data}/>
                            </PayPalScriptProvider>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;