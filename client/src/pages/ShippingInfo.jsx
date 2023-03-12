import React, { useRef } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

// const carts = JSON.parse(localStorage.getItem('carts')) || { products: [], subtotal: 0, discount_price: 0, total: 0 };

const ShippingInfo = () => {

    const [count, setCount, carts, setCarts] = useOutletContext();
    const navigate = useNavigate();

    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const address1Ref = useRef('');
    const address2Ref = useRef('');
    const provinceRef = useRef('');
    const countryRef = useRef('');

    const gotoCheckout = () => {

        const data = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            phone : phoneRef.current.value,
            address1 : address1Ref.current.value,
            address2 : address2Ref.current.value,
            province : provinceRef.current.value,
            country : countryRef.current.value,
        }

        navigate('/checkout?page_name=checkout', { state: { data } });
    }

    return (
        <>
            <div className='mycontainer min-h-[90vh]'>
                <h1 className='text-3xl font-bold text-black_500'>Check out</h1>
                <div className="flex flex-col gap-8 md:gap-[100px] md:flex-row mt-7">
                    <div className="flex-[4]">
                        <h1 className='text-2xl font-bold text-black_500'>Shopping Info</h1>

                        <div className='mt-5'>
                            <p className='text-base font-semibold'>Full name</p>
                            <input ref={nameRef} type="text" name="" id="" placeholder='Full name' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                        </div>

                        <div className='mt-5'>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                                <div className='w-full'>
                                    <p className='text-base font-semibold'>Email</p>
                                    <input ref={emailRef} type="email" name="" id="" placeholder='Email' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                                </div>
                                <div className='w-full'>
                                    <p className='text-base font-semibold'>Phone</p>
                                    <input ref={phoneRef} type="text" name="" id="" placeholder='+1234567890' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <p className='text-base font-semibold'>Address line 1</p>
                            <input type="text" ref={address1Ref} name="" id="" placeholder='Address line 1' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                        </div>

                        <div className='mt-5'>
                            <p className='text-base font-semibold'>Address line 2</p>
                            <input ref={address2Ref} type="text" name="" id="" placeholder='Address line 2' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                        </div>

                        <div className='mt-5'>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                                <div className='w-full'>
                                    <p className='text-base font-semibold'>Province</p>
                                    <input ref={provinceRef} type="text" name="" id="" placeholder='Province' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                                </div>
                                <div className='w-full'>
                                    <p className='text-base font-semibold'>Country</p>
                                    <input ref={countryRef} type="text" name="" id="" placeholder='Country' className='w-full rounded-md mt-1 border-gray-300 px-3 py-2 border-solid border focus:ring-[#8884d8] sm:text-sm focus:border-[#8884d8]' />
                                </div>
                            </div>
                        </div>
                        <button onClick={gotoCheckout} className='hidden md:block px-7 py-2 mt-8 bg-[#8884d8] text-white rounded-lg text-base cursor-pointer'>Next step</button>
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
                            <div className="flex justify-between items-center mt-4 border-t pt-4 border-gray-300 border-dashed">
                                <p className='text-xl text-gray-800 font-semibold'>Total:</p>
                                <span className='text-xl text-gray-800 font-semibold'>${carts.total}</span>
                            </div>
                        </div>
                        <div onClick={gotoCheckout} className="flex justify-end">
                            <button className='md:hidden px-7 py-2 mt-8 bg-[#8884d8] text-white rounded-lg text-base cursor-pointer'>Next step</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingInfo;