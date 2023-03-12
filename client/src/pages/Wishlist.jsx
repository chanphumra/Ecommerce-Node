import React from 'react';
import { IoMdTrash } from 'react-icons/io'
import { GrFormPrevious,GrFormNext } from 'react-icons/gr';
import { IoCart } from 'react-icons/io5'

const header = ['PRODUCTS', 'COLOR', 'SIZE', 'PRICE'];
const data = [
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },
    {
        "productID": "1",
        "productImage": "",
        "productName": "",
        "color": "",
        "size": "",
        "price": "",
    },

];

const Wishlist = () => {
    return (
        <>
            <div className='mycontainer min-h-[90vh]'>
                <h1 className='text-3xl font-bold text-black_500'>Wishlist <span>(43)</span></h1>
                <div className="w-full mt-7 pb-2 md:pb-0 overflow-x-auto overflow-y-none scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-[#8884d8] scrollbar-thumb-rounded-xl ">
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
                                data.map((item, index) => {
                                    return <tr key={index} className='group relative border-solid border-b border-gray-300' >

                                        <td className='py-2 px-3 flex items-center gap-1'>
                                            <img src={item.productImage} alt="" className='w-[45px] h-[45px] border-solid border border-gray-300 rounded-md object-cover' />
                                            <p className='w-[230px] text-ph font-semibold truncate text-primary py-2 px-3'>{item.productName}</p>
                                        </td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.color}</td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.size}</td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>${item.price}</td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.quantity}</td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.total}</td>
                                        <td className='w-[200px]'>
                                            <div className="flex items-center gap-4 justify-end">
                                                <IoMdTrash className='w-[20px] h-[20px] text-gray-600 cursor-pointer hover:text-gray-800'/>
                                                <button className='flex items-center gap-2 bg-[#8884d8] px-4 py-2 rounded-lg cursor-pointer'>
                                                    <IoCart className='text-white'/>
                                                    <h1 className='text-[12px] text-white'>Add to cart</h1>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* pagination */}
                <div className="flex items-center justify-between border-solid border-b-2 pb-4 border-gray-200 rounded-lg px-2 py-3 sm:px-2 mt-1">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white border-solid px-4 py-2 text-sm font-medium text-gray-700 hover:bg-body cursor-pointer">
                            Previous
                        </a>
                        <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white border-solid px-4 py-2 text-sm font-medium text-gray-700 hover:bg-body cursor-pointer">
                            Next
                        </a>
                    </div>

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
                                <span className="font-medium">8</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="flex gap-2 rounded-md" aria-label="Pagination">
                                <a className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span className="sr-only">Previous</span>
                                    <GrFormPrevious className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                </a>

                                <a className={`border-gray-300 text-gray-500 hover:bg-gray-50 relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                    1
                                </a>
                                <a className={`border-gray-300 text-gray-500 hover:bg-gray-50 relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                    2
                                </a>
                                <a className={`border-gray-300 text-gray-500 hover:bg-gray-50 relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                    3
                                </a>

                                <a className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
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

export default Wishlist;