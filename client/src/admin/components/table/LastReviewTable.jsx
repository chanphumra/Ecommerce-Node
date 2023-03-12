import React, { useEffect, useState } from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import data from '../../data/LastReviewProduct.json'

const header = ['PRODUCT', 'REVIEW COUNT', 'PRODUCT IN STOCK'];

const ITEM_PER_PAGE = 5;

const LastReviewTable = () => {
    const [page, setPage] = useState(0);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        // getPages 
        setPage(Math.ceil(data.length / ITEM_PER_PAGE));
    });

    return (
        <>
            <div className='lg:py-7 lg:px-10 p-3'>
                <h1 className='text-2xl font-bold text-black_500'>Last Reviews</h1>
                <p className='text-gray-500 text-base -mt-1'>Popular product reviews</p>
            </div>
            <div className='w-full bg-white mt-3 px-5 lg:px-10 pb-2'>
                <div className="w-full pb-2 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-current scrollbar-thumb-rounded-xl ">
                    <table className='w-[800px] md:w-full'>
                        <thead className='border-solid border-b border-t border-gray-300'>
                            <tr>
                                <th className='text-start text-gray-600 text-md w-[50px] py-2 px-3'>#</th>
                                <th className='text-start text-gray-600 text-sm w-[300px] md:w-[400px] py-2 px-3'>{header[0]}</th>
                                <th className='text-start text-gray-600 text-sm py-2 px-3'>{header[1]}</th>
                                <th className='text-start text-gray-600 text-sm py-2 px-3'>{header[2]}</th>
                                <th className='text-end text-gray-600 text-sm py-2 px-3 pr-4'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                if (index >= (activePage - 1) * ITEM_PER_PAGE && index < activePage * ITEM_PER_PAGE) {
                                    return <tr className='border-solid border-b border-gray-300' key={index}>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{index + 1}</td>
                                        <td className='py-2 px-3 flex items-center gap-1 '>
                                            <img src={item.image} alt="" className='w-[45px] h-[45px] border-solid border border-gray-300 rounded-md object-cover' />
                                            <p className='w-[200px] md:w-[300px] truncate text-ph font-semibold text-primary py-2 px-3'>{item.name}</p>
                                        </td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.count}</td>
                                        <td className='text-ph font-semibold text-gray-700 py-2 px-3'>{item.stock}</td>
                                        <td className='text-end py-2 px-3 pr-4'>
                                            <button className='text-ph font-medium text-green-700 bg-view border-solid border border-gray-300 py-1 px-4 rounded-md cursor-pointer'>View</button>
                                        </td>
                                    </tr>;
                                }
                            })}
                        </tbody>
                    </table>
                </div>

                {/* pagination */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-3 sm:px-2">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a onClick={()=>{activePage>1 && setActivePage(pre=>pre-1)}} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white border-solid px-4 py-2 text-sm font-medium text-gray-700 hover:bg-body cursor-pointer">
                            Previous
                        </a>
                        <a onClick={()=>{activePage<page && setActivePage(pre=>pre+1)}} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white border-solid px-4 py-2 text-sm font-medium text-gray-700 hover:bg-body cursor-pointer">
                            Next
                        </a>
                    </div>

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(activePage - 1) * ITEM_PER_PAGE+1}</span> to <span className="font-medium">{(data.length - (activePage-1)*ITEM_PER_PAGE) > ITEM_PER_PAGE ? activePage * ITEM_PER_PAGE : data.length}</span> of{' '}
                                <span className="font-medium">{data.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="inline-flex gap-2 rounded-md" aria-label="Pagination">
                                <a onClick={()=>{activePage>1 && setActivePage(pre=>pre-1)}} className="relative cursor-pointer inline-flex items-center rounded-l-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
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

                                <a onClick={()=>{activePage<page && setActivePage(pre=>pre+1)}} className="relative cursor-pointer inline-flex items-center rounded-r-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
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

export default LastReviewTable;