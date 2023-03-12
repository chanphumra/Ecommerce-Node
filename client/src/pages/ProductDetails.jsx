import React, { useEffect } from 'react'
import { BiHeart } from 'react-icons/bi'
import { FaShoppingCart } from 'react-icons/fa'
import { HiMinusSm } from 'react-icons/hi'
import { BiPlus } from 'react-icons/bi'
import SimilaProduct from '../components/SimilaProduct'
import { useLocation, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {toast, Slide} from 'react-toastify'

const ITEM_PER_PAGE = 12;

const ProductDetails = (props) => {

    const location = useLocation();
    const item = location.state?.item;

    const [count, setCount, carts, setCarts] = useOutletContext();
    const [page, setPage] = useState(0);
    const [product, setProduct] = useState([]);
    const [list, setList] = useState([])
    const [qty, setQty] = useState(1);

    const cart = JSON.parse(localStorage.getItem('carts')) || { products: [], subtotal: 0, discount_price: 0, total: 0 };

    const addToCart = (item) => {
        const product = {
            id: item.p_id,
            name: item.p_name,
            sale_price: new Number(item.sale_price),
            discount: new Number(item.discount),
            qty: new Number(qty),
            image: item.image1
        };

        const index = cart.products.findIndex(p => p.id == product.id);
        if (index >= 0) { // exist in cart
            const existProduct = cart.products[index];
            existProduct.qty += qty;
            cart.subtotal += qty * product.sale_price;
            cart.discount_price += (product.sale_price * product.discount / 100) * qty;
            cart.total = (cart.subtotal - cart.discount_price);
        }
        else {
            product.qty = qty;
            cart.products.push(product);
            cart.subtotal += qty *product.sale_price;
            cart.discount_price += (product.sale_price * product.discount / 100) * qty;
            cart.total = (cart.subtotal - cart.discount_price);
        }

        localStorage.setItem('carts', JSON.stringify(cart));
        setCarts(cart);
        setCount(cart.products.length);

        toast.success('Add 1 product to cart', {
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
    };

    const getProduct = async () => {
        await axios.get(
            'http://localhost:8000/api/product/details/' + item.p_id
        ).then(res => {
            const data = res.data.list[0];
            const list = res.data.list;
            console.log(data)
            setProduct(data);
            setList(list);
            setPage(Math.ceil(data.length / ITEM_PER_PAGE));
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        getProduct();
    }, []);


    const [image, setImage] = useState();
    return (
        <>
            <div className='mycontainer flex flex-col lg:flex-row gap-5 lg:gap-0'>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col lg:flex-row gap-5 w-full">
                        <div className='flex flex-row lg:flex-col gap-5'>
                            <img src={product.image1} alt="" className='w-[80px] h-[80px] object-cover rounded-lg border border-solid border-gray-300 cursor-pointer' onClick={() => setImage(product.image1)} />
                            <img src={product.image2} alt="" className='w-[80px] h-[80px] object-cover rounded-lg border border-solid border-gray-300 cursor-pointer' onClick={() => setImage(product.image2)} />
                            <img src={product.image3} alt="" className='w-[80px] h-[80px] object-cover rounded-lg border border-solid border-gray-300 cursor-pointer' onClick={() => setImage(product.image3)} />
                        </div>
                        <img src={image == null ? product.image1 : image} alt="" className='w-full lg:w-[450px] h-[450px] object-cover rounded-lg border border-solid border-gray-300 cursor-pointer' />
                    </div>
                    <div className="flex justify-between items-center w-full lg:w-[550px] gap-5">
                        <button className='flex justify-center items-center gap-2 w-full text-sm font-semibold rounded-full py-3 text-[#8884d8] hover:text-white bg-transparent hover:bg-[#8884d8] border border-solid border-[#8884d8]'>
                            <BiHeart className='w-[18px] h-[18px]' />
                            <p>Add to wishlist</p>
                        </button>
                        <button onClick={()=> addToCart(item)} className='flex justify-center items-center gap-2 w-full text-sm font-semibold bg-[#8884d8] text-white rounded-full border border-solid border-[#8884d8] py-3 hover:opacity-95'>
                            <FaShoppingCart />
                            <p>Add to cart</p>
                        </button>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <h1 className='w-full text-xl lg:text-3xl font-semibold text-ellipsis text-black_500'>{product.p_name}</h1>
                    <div className="flex items-end gap-3">
                        <p className='text-4xl font-semibold text-gray-800'>${product.sale_price - (product.sale_price * product.discount / 100)}</p>
                        <p className='text-3xl line-through font-semibold text-gray-600'>${product.sale_price}</p>
                        <p className='text-2xl font-semibold text-[#8884d8]'>{product.discount} %Off</p>
                    </div>
                    <button className={`text-sm ${item.qty > 0 ? 'bg-[#25B003]' : 'bg-red-500'} text-white py-[2px] w-[90px] rounded-xl`}>{`${item.qty > 0 ? 'In stock' : 'Out Stock'}`}</button>
                    <p className='text-gray-600'>{product.p_description}</p>
                    <div className="flex gap-5">

                        <div className="flex gap-2 items-center">
                            <p className='text-base text-gray-700'>Size :</p>
                            <select name="" id="" className='selection:bg-current pr-10 rounded-lg border-gray-300 px-3 py-2 border-solid border focus:border-[#8884d8] focus:ring-[#8884d8] sm:text-sm'>
                                {
                                    list.map((list, index) => (
                                        list.size != 'none' && <option key={index} value={list.id}>{list.size}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className='text-base text-gray-700'>Color :</p>
                            <select name="" id="" className='pr-10 rounded-lg border-gray-300 px-3 py-2 border-solid border focus:border-[#8884d8] focus:ring-[#8884d8] sm:text-sm'>
                                {
                                    list.map((list, index) => (
                                        list.color != 'none' && <option key={index} value={list.id}>{list.color}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className='text-base text-gray-700'>Quantity :</p>
                        <div className="flex gap-5 items-center">
                            <div onClick={() => setQty(preQty => preQty > 1 ? preQty - 1 : preQty)} className="p-2 border border-solid border-gray-300 rounded-lg cursor-pointer hover:bg-[#8884d8] hover:text-white">
                                <HiMinusSm className='w-5 h-5' />
                            </div>
                            <p className='text-base text-gray-700'>{qty}</p>
                            <div onClick={() => setQty(preQty => preQty + 1)} className="p-2 border border-solid border-gray-300 rounded-lg cursor-pointer hover:bg-[#8884d8] hover:text-white">
                                <BiPlus className='w-5 h-5' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mycontainer">
                {/* <SimilaProduct /> */}
            </div>
        </>

    )
}

export default ProductDetails;