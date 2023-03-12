import React, { useState } from "react";
import {Link} from 'react-router-dom'
import BestSellerIcon from '../assets/icons/bestseller.png'

const SimilaProduct = () => {

    const [more, setMore] = useState(false);
    const [open, setOpen] = useState(0);

    return (
        <div className="mt-10">
            <div className="flex justify-between items-end">
                <div className="flex items-center">
                    <img src={BestSellerIcon} alt="" className='w-8 h-8 mr-1' />
                    <span className='text-2xl font-[700] text-gray-800 capitalize'>Similar Product</span>
                </div>
                <p className="text-sm hover:underline cursor-pointer text-[#8884d8]" onClick={() => setMore(pre => !pre)}>{`${more ? "See less" : "See more"}`}</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-5">
                {
                    productItems.map((item) => (
                        <div key={item.id}>
                            <div className="bg-white cursor-pointer p-3 relative rounded-[8px] shadow-[0_1px_3px_rgb(3,0,71,0.09)] group">
                                {item.discount > 0 && <span className="bg-[#8884d8] absolute top-4 left-3 text-white rounded-[10px] text-[0.65rem] px-2 p-1">{item.discount}% Off</span>}
                                <div className="">
                                    <Link to='/productdetails/123?page_name=productdetails'>
                                        <img src={""} alt='' className='w-full h-[300px] object-cover mt-1' />
                                    </Link>
                                    <div className="absolute top-0 right-0 opacity-0 transition duration-100 m-2 group-hover:opacity-100 flex justify-center items-center flex-col text-gray-400">
                                        <i className=" fa-regular fa-eye p-3 transition duration-200 hover:bg-gray-100 rounded-full" onClick={() => setOpen(item.id)}></i>
                                        <i className='fa-regular fa-heart p-3 transition duration-200 hover:bg-gray-100 rounded-full'></i>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <h3 className='text-md mb-2 text-gray-500 cursor-pointer truncate'>{item.name}</h3>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm">
                                            <h4 className='text-[#8884d8] text-base font-semibold'>${item.price - (item.price * item.discount / 100)}</h4>
                                            {item.discount > 0 && <h4 className='text-gray-500 del line-through'>${item.price}</h4>}
                                        </div>
                                        <button type='button' className='text w-[30px] p-[2px] border border-solid border-[#8884d8] rounded  cursor-pointer transition duration-500 hover:bg-gray-50'>
                                            <i className='fa fa-plus w-full text-black text-sm'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex items-center justify-center transition-all duration-700 fixed top-0 left-0 z-50 overflow-hidden ${open == item.id ? 'w-full h-full opacity-100 block bg-opacity-5 bg-black' : ' w-full h-0'}`}>
                                <div className='relative bg-white rounded w-[55rem] h-[30rem] p-5 flex justify-center items-center gap-5'>
                                    <i className='absolute top-3 right-3 fa-solid fa-x text-sm font-extrabold cursor-pointer bg-[#F6F9FC] h-10 w-10 leading-10 text-center rounded-full' onClick={() => setOpen(false)}></i>
                                    <div className="w-[50%] h-[95%]">
                                        <img src={""} alt='' className='w-full h-full object-cover' />
                                    </div>
                                    <div className="w-[50%] h-[95%] flex flex-col justify-center">
                                        <h2 className='text-2xl font-semibold'>{item.name}</h2>
                                        <p className='uppercase font-semibold text-gray-500 text-sm my-3'>Category: </p>
                                        <h2 className='uppercase font-semibold text-[#8884d8] text-2xl my-3'>${item.price - (item.price * item.discount / 100)}</h2>
                                        
                                        <p className='text-gray-500 text-sm my-3 border-b border-solid border-gray-300 pb-5'>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus liberpuro ate vol faucibus adipiscing.</p>
                                        <button className='capitalize text-white bg-[#8884d8] py-2 rounded shadow-[0px_4px_16px_rgb(43,52,69,0.10)]'>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    );
}

export default SimilaProduct;