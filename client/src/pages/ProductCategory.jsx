import React, { useEffect, useState } from "react"
import axios from "axios"
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'

const ITEM_PER_PAGE = 20;
const ProductCategory = () => {

  const [count, setCount, carts, setCarts] = useOutletContext();
  const [page, setPage] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [open, setOpen] = useState();
  const [products, setProducts] = useState([]);
  const { subId, subName } = useParams();

  const cart = JSON.parse(localStorage.getItem('carts')) || { products: [], subtotal: 0, discount_price: 0, total: 0 };

  const addToCart = (item, qty) => {

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
      existProduct.qty += 1;
      cart.subtotal += product.sale_price;
      cart.discount_price += product.sale_price * product.discount / 100;
      cart.total = (cart.subtotal - cart.discount_price);
    }
    else {
      product.qty = 1;
      cart.products.push(product);
      cart.subtotal += product.sale_price;
      cart.discount_price += product.sale_price * product.discount / 100;
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

  const getProducts = async () => {
    await axios.get(
      'http://localhost:8000/api/product/details/get/all'
    ).then(res => {
      const data = res.data.list.filter(pro => pro.sub_id == subId);
      setProducts(data);
      setPage(Math.ceil(data.length / ITEM_PER_PAGE));
      setActivePage(1);
    }).catch(err => {
      console.log(err);
    });
  }
  useEffect(() => {
    getProducts();
  }, [subId]);

  return (
    <div className="mycontainer">
      <div>
        <h1 className='text-2xl font-[700] text-gray-800 capitalize'>Category: <span className="uppercase text-primary">{subName}</span></h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-5">
        {
          products.map((item, index) => {
            if (index >= (activePage - 1) * ITEM_PER_PAGE && index < activePage * ITEM_PER_PAGE)
              return <div key={item.p_id}>
                <div className="bg-white cursor-pointer p-3 relative rounded-[8px] shadow-[0_1px_3px_rgb(3,0,71,0.09)] group">
                  {item.discount > 0 && <span className="bg-[#8884d8] absolute top-4 left-3 text-white rounded-[10px] text-[0.65rem] px-2 p-1">{item.discount}% Off</span>}
                  <div className="">
                    <Link to='/productdetails?page_name=productdetails' state={{ item: item }}>
                      <img src={item.image1} alt='' className='w-full h-[300px] object-cover mt-1' />
                    </Link>
                    <div className="absolute top-0 right-0 opacity-0 transition duration-100 m-2 group-hover:opacity-100 flex justify-center items-center flex-col text-gray-400">
                      <i className=" fa-regular fa-eye p-3 transition duration-200 hover:bg-gray-100 rounded-full" onClick={() => setOpen(item.p_id)}></i>
                      <i className='fa-regular fa-heart p-3 transition duration-200 hover:bg-gray-100 rounded-full'></i>
                    </div>
                  </div>
                  <div className="p-1">
                    <h3 className='text-md mb-2 text-gray-500 cursor-pointer truncate'>{item.p_name}</h3>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <h4 className='text-[#8884d8] text-base font-semibold'>${item.sale_price - (item.sale_price * item.discount / 100)}</h4>
                        {item.discount > 0 && <h4 className='text-gray-500 del line-through'>${item.sale_price}</h4>}
                      </div>
                      <button type='button' className='text w-[30px] p-[2px] border border-solid border-[#8884d8] rounded  cursor-pointer transition duration-500 hover:bg-gray-50'>
                        <i className='fa fa-plus w-full text-black text-sm' onClick={() => { addToCart(item, 1) }}></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center justify-center transition-all duration-700 fixed top-0 left-0 z-50 overflow-hidden ${open == item.p_id ? 'w-full h-full opacity-100 block bg-opacity-5 bg-black' : ' w-full h-0'}`}>
                  <div className='relative bg-white rounded w-[55rem] h-[30rem] p-5 flex justify-center items-center gap-5'>
                    <i className='absolute top-3 right-3 fa-solid fa-x text-sm font-extrabold cursor-pointer bg-[#F6F9FC] h-10 w-10 leading-10 text-center rounded-full' onClick={() => setOpen(false)}></i>
                    <div className="w-[50%] h-[95%]">
                      <img src={item.image1} alt='' className='w-full h-full object-cover' />
                    </div>
                    <div className="w-[50%] h-[95%] flex flex-col justify-center">
                      <h2 className='text-2xl font-semibold'>{item.p_name}</h2>
                      <p className='uppercase font-semibold text-gray-500 text-sm my-3'>Category: {item.sub_name}</p>
                      <h2 className='uppercase font-semibold text-[#8884d8] text-2xl my-3'>${item.sale_price - (item.sale_price * item.discount / 100)}</h2>

                      <p className='text-gray-500 text-sm my-3 border-b border-solid border-gray-300 pb-5'>{item.description}</p>
                      <button className='capitalize text-white bg-[#8884d8] py-2 rounded shadow-[0px_4px_16px_rgb(43,52,69,0.10)]' onClick={() => { addToCart(item, 1) }}>Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
          }
          )
        }
      </div>
      {/* pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-3 sm:px-2 mt-4">
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
              Showing <span className="font-medium">{`${products.length > 0 ? (activePage - 1) * ITEM_PER_PAGE + 1 : 0}`}</span> to <span className="font-medium">{(products.length - (activePage - 1) * ITEM_PER_PAGE) > ITEM_PER_PAGE ? activePage * ITEM_PER_PAGE : products.length}</span> of{' '}
              <span className="font-medium">{products.length}</span> results
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
  )
}

export default ProductCategory;