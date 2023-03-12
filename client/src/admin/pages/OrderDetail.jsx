import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const header = ['PRODUCT NAME', 'PRICE', 'QUANTITY', 'TOTAL'];

const OrderDetail = () => {
    const {orderID} = useParams();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [cusID, setCusId] = useState(0);

    const getOrder = async () => {
        const res = await axios.get('http://localhost:8000/api/order/'+ orderID);
        setData(res.data.list);
        setTotal(res.data.list[0].total);
        setCusId(res.data.list[0].cus_id);
    }
    useEffect(()=>{
        getOrder();
    },[]);

    let subtotal = 0;
    let dis = 0;

    return (
        <div className='lg:py-7 lg:px-10 p-5'>
            <div>
                <h1 className='text-3xl font-bold text-black_500'>Order #{orderID}</h1>
                <h1 className='text-base text-gray-600 mt-1'>Customer ID : <span className='text-primary font-semibold cursor-pointer hover:underline'>{cusID}</span></h1>
            </div>
            <div className="flex flex-col gap-8 md:flex-row mt-7">
                <div className="flex-[4]">
                    <div className="w-full pb-2 overflow-x-auto overflow-y-none scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-current scrollbar-thumb-rounded-xl ">
                        <table className='w-[800px] md:w-full'>
                            <thead className='border-solid border-b border-t border-gray-300'>
                                <tr>
                                    {header.map((item, index) => (
                                        <th key={index} className={`${index === 0 ? 'w-[300px]' : null} text-start text-gray-600 text-sm py-2 px-3`}>{item}</th>
                                    ))}
                                    <th className='text-end text-gray-600 text-sm py-2 px-3 pr-4'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                        subtotal += new Number(new Number(item.qty) * new Number(item.sale_price));
                                        dis += item.qty*(item.sale_price*item.discount/100);
                                        return <tr className='group relative border-solid border-b border-gray-300' >

                                            <td className='py-2 px-3 flex items-center gap-1'>
                                                <img src={item.image1} alt="" className='w-[45px] h-[45px] border-solid border border-gray-300 rounded-md object-cover' />
                                                <p className='w-[230px] text-ph font-semibold truncate text-primary py-2 px-3'>{item.name}</p>
                                            </td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3'>${item.sale_price}</td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3'>
                                                <p>{item.qty}</p>
                                            </td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.sale_price*item.qty}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between mt-2 border-b border-solid border-gray-300 pb-4">
                        <p className='text-base text-gray-800 font-semibold'>Items subtotal:</p>
                        <span className='text-lg text-gray-800 font-semibold'>${subtotal}</span>
                    </div>
                </div>
                <div className="flex-[2]">
                    <div className="border-solid border border-gray-300 rounded-lg p-4 bg-white mt-2 md:mt-0">
                        <h1 className='text-xl font-semibold text-gray-800'>Summary</h1>
                        <div className="flex justify-between items-center mt-4">
                            <p className='text-base text-gray-900'>Items subtotal:</p>
                            <span className='text-lg text-gray-800'>${subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className='text-base text-gray-900'>Discount:</p>
                            <span className='text-lg text-red-500'>-${dis}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className='text-base text-gray-900'>Tax:</p>
                            <span className='text-lg text-gray-800'>$0</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className='text-base text-gray-900'>Subtotal:</p>
                            <span className='text-lg text-gray-800'>${subtotal}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4 border-t pt-4 border-gray-300 border-dashed">
                            <p className='text-xl text-gray-800 font-semibold'>Total:</p>
                            <span className='text-xl text-gray-800 font-semibold'>${total}</span>
                        </div>
                    </div>

                    <div className="border-solid border border-gray-300 rounded-lg p-4 bg-white mt-2 md:mt-8">
                        <h1 className='text-xl font-semibold text-gray-800'>Order Status</h1>
                        <select name="" id="" className='w-full mt-2 text-[14px] cursor-pointer selection:bg-current' >
                            <option value="">Processing</option>
                            <option value="">Canceled</option>
                            <option value="">Completed</option>
                        </select>
                        <div className="flex justify-end mt-4">
                            <button className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Update status</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;