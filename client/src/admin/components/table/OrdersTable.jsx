import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiCheck } from 'react-icons/bi'
import { IoMdTrash } from 'react-icons/io'
import { RiSearchLine } from 'react-icons/ri'
import axios from 'axios'

const header = ['ORDER', 'TOTAL', 'CUSTOMER', 'PAYMENT METHOD', 'DATE'];

const ITEM_PER_PAGE = 10;

const OrdersTable = () => {
    const [page, setPage] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState([]);
    const getOrder = async () => {
        const res = await axios.get('http://localhost:8000/api/order');
        setOrder(res.data.list.reverse());
        setPage(Math.ceil(res.data.list.length / ITEM_PER_PAGE));
    }

    useEffect(() => {
        getOrder();
    });

    return (
        <>
            <div className="flex gap-4 flex-col lg:flex-row lg:items-center justify-between px-5 lg:px-10 mb-4">
                <div className='relative'>
                    <input type="text" name="" id="" placeholder='Search orders' className='text-sm pl-10 w-full lg:w-[300px] h-[40px] rounded-md border-gray-300 border-solid border focus:border-current focus:ring-current' />
                    <RiSearchLine className='absolute top-[50%] left-3 translate-y-[-50%] w-4 h-4' />
                </div>
            </div>

            <div className='bg-white relative border-solid border-t border-b border-gray-200 border-t-gray-300 px-5 lg:px-10'>
                <div className="w-full pb-2 overflow-x-auto overflow-y-none scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-current scrollbar-thumb-rounded-xl ">
                    <table className='w-[800px] md:w-full'>
                        <thead className='border-solid border-b border-gray-300'>
                            <tr>
                                <th className='text-start text-gray-600 text-md w-[50px] py-2 px-3'>
                                    <input type="checkbox" name="" id="" className='w-4 h-4 border-solid border border-gray-500 rounded-[4px] checked:rounded-[4px]' />
                                </th>
                                {header.map((item) => (
                                    <th key={item} className='text-start text-gray-600 text-sm py-2 px-3'>{item}</th>
                                ))}
                                <th className='text-endt text-gray-600 text-sm py-2 px-3 pr-4'>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.map((item, index) => {
                                    if (index >= (activePage - 1) * ITEM_PER_PAGE && index < activePage * ITEM_PER_PAGE) {
                                        return <tr key={index} className='group relative border-solid border-b border-gray-300' >
                                            <td className='text-sm text-gray-700 py-2 px-3'>
                                                <input type="checkbox" name="" id="" className='w-4 h-4 border-solid border border-gray-500 rounded-[4px] checked:rounded-[4px]' />
                                            </td>
                                            <td className='text-ph font-semibold text-primary hover:underline cursor-pointer py-2 px-3'>
                                                <Link to={`/admin/orderdetails/${item.id}?page_name=orders`}>#{item.id}</Link>
                                            </td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3'>${item.total}</td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3 flex items-center gap-1'>
                                                <img src={item.image} alt="" className='w-[40px] h-[40px] border-solid border border-gray-300 rounded-full object-cover' />
                                                <p className='text-ph font-semibold text-gray-700 py-2 px-3 hover:underline hover:text-primary cursor-pointer'>{item.name}</p>
                                            </td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.payment_method}</td>
                                            <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{ }</td>
                                            <td className='text-lg w-4 text-gray-700 py-2 px-3 pr-5'>
                                                <FiMoreHorizontal className='font-semibold' />
                                            </td>

                                            <div className='hidden group-hover:flex absolute right-0 top-[50%] translate-y-[-50%] pr-[10px]  gap-1'>
                                                <div className='inline-flex px-[10px] py-[6px] bg-body border-solid border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200'>
                                                    <BiCheck />
                                                </div>
                                                <div className='inline-flex px-[10px] py-[6px] bg-body border-solid border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200'>
                                                    <IoMdTrash />
                                                </div>
                                            </div>
                                        </tr>
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* pagination */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-3 sm:px-2">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a onClick={() => { activePage > 1 && setActivePage(pre => pre - 1) }} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white border-solid px-4 py-2 text-sm font-medium text-gray-700 hover:bg-body cursor-pointer">
                            Previous
                        </a>
                        <a onClick={() => { activePage < page && setActivePage(pre => pre + 1) }} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white border-solid px-4 py-2 text-sm font-medium text-gray-700 hover:bg-body cursor-pointer">
                            Next
                        </a>
                    </div>

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{`${order.length > 0 ? (activePage - 1) * ITEM_PER_PAGE + 1 : 0}`}</span> to <span className="font-medium">{(order.length - (activePage - 1) * ITEM_PER_PAGE) > ITEM_PER_PAGE ? activePage * ITEM_PER_PAGE : order.length}</span> of{' '}
                                <span className="font-medium">{order.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="flex gap-2 rounded-md" aria-label="Pagination">
                                <a onClick={() => { activePage > 1 && setActivePage(pre => pre - 1) }} className="relative cursor-pointer inline-flex items-center rounded-l-md  bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span className="sr-only">Previous</span>
                                    <GrFormPrevious className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                </a>

                                {
                                    Array.from({ length: page }).map((item, index) => (
                                        <a onClick={() => setActivePage(index + 1)} key={index} className={`${index + 1 === activePage ? "bg-primary border-primary text-white hover:bg-primary" : 'border-gray-300 text-gray-500 bg-white hover:bg-gray-50'} relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                            {index + 1}
                                        </a>
                                    ))
                                }

                                <a onClick={() => { activePage < page && setActivePage(pre => pre + 1) }} className="relative cursor-pointer inline-flex items-center rounded-r-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span className="sr-only">Next</span>
                                    <GrFormNext className="h-4 w-4" color='' aria-hidden="true" />
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersTable;