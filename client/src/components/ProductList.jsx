import { useState } from 'react'
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import HeaderTitle from './HeaderTitle'
import productItems from './ProductItem'

const ProductList = (props) => {
    const [open, setOpen] = useState();
    const categoryName = '';
    
    return (
        <>
            <div>
            <span className='text-2xl font-[700] text-gray-800 capitalize'>{props.title}</span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-5">
                {
                    productItems.map((item) => (
                        <div key={item.id}>
                            <div className="bg-white cursor-pointer p-3 relative rounded-[8px] shadow-[0_1px_3px_rgb(3,0,71,0.09)] group">
                                {item.discount > 0 && <span className="bg-[#D23F57] absolute top-4 left-3 text-white rounded-[10px] text-[0.65rem] px-2 p-1">{item.discount}% Off</span>}
                                <div className="">
                                    <img src={""} alt='' className='w-full h-[300px] object-cover mt-1' />
                                    <div className="absolute top-0 right-0 opacity-0 transition duration-100 m-2 group-hover:opacity-100 flex justify-center items-center flex-col text-gray-400">
                                        <i className=" fa-regular fa-eye p-3 transition duration-200 hover:bg-gray-100 rounded-full" onClick={() => setOpen(item.id)}>

                                        </i>
                                        <i className='fa-regular fa-heart p-3 transition duration-200 hover:bg-gray-100 rounded-full'></i>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <h3 className='text-md mb-2 text-gray-500 cursor-pointer'>{item.name}</h3>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-end gap-2 text-sm">
                                            <h4 className='text-[#e94560] text-base font-semibold'>${item.price - (item.price * item.discount / 100)}</h4>
                                            {item.discount > 0 && <h4 className='text-gray-500 del line-through'>${item.price}</h4>}
                                        </div>
                                        <button type='button' className='text w-[30px] p-[2px] border border-solid border-[#ff8da0] hover:border-[#ff3153] rounded  cursor-pointer transition duration-500 hover:bg-gray-50'>
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
                                        <h2 className='uppercase font-semibold text-[#e94560] text-2xl my-3'>${item.price - (item.price * item.discount / 100)}</h2>
                                        <div className="text-sm mb-2">
                                            <i className='fa fa-star text-[#ffcd4e] mr-1'></i>
                                            <i className='fa fa-star text-[#ffcd4e] mr-1'></i>
                                            <i className='fa fa-star text-[#ffcd4e] mr-1'></i>
                                            <i className='fa fa-star text-[#ffcd4e] mr-1'></i>
                                            <i className='fa fa-star text-[#ffcd4e] mr-1'></i>
                                        </div>
                                        <p className='text-gray-500 text-sm my-3 border-b border-solid border-gray-300 pb-5'>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus liberpuro ate vol faucibus adipiscing.</p>
                                        <button className='capitalize text-white bg-[#e94560] py-2 rounded shadow-[0px_4px_16px_rgb(43,52,69,0.10)]'>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
            {/* pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white rounded-lg px-2 py-3 sm:px-2 mt-4">
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
                            <a className="relative cursor-pointer inline-flex items-center rounded-l-md  bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                <span className="sr-only">Previous</span>
                                <GrFormPrevious className="h-4 w-4 text-gray-500" aria-hidden="true" />
                            </a>

                            <a className={`border-gray-300 text-gray-500 bg-white hover:bg-gray-50 relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                1
                            </a>
                            <a className={`border-gray-300 text-gray-500 bg-white hover:bg-gray-50 relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                2
                            </a>
                            <a className={`border-gray-300 text-gray-500 bg-white hover:bg-gray-50 relative rounded-md cursor-pointer inline-flex items-center border-solid border px-3 py-1 text-sm font-medium focus:z-20`}>
                                3
                            </a>

                            <a className="relative cursor-pointer inline-flex items-center rounded-r-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                <span className="sr-only">Next</span>
                                <GrFormNext className="h-4 w-4" color='' aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList;