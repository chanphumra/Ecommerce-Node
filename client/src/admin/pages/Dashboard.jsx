import axios from 'axios'
import React, { useEffect, useState } from 'react'
import img1 from '../asset/icon/1.png'
import img2 from '../asset/icon/2.png'
import img3 from '../asset/icon/3.png'
import NewCustomerChart from '../components/chart/NewCustomerChart'
import TotalOrderChart from '../components/chart/TotalOrderChart'
import TotalSellChart from '../components/chart/TotalSellChart'
import LastReviewTable from '../components/table/LastReviewTable'

const Dashbord = () => {

  const [products, setProducts] = useState([]);
  const [outStock, setOutStock] = useState(0);

  const getProducts = async () => {
    const res = await axios.get('http://localhost:8000/api/product');
    const data = res.data.list;
    setProducts(data);
    setOutStock(data.filter(pro => pro.qty <= 0).length);
  }

  useEffect(()=>{
    getProducts();
  },[]);

  return (
    <>
      <div className='lg:py-7 lg:px-10 p-5'>
        <h1 className='text-3xl font-bold text-black_500'>Dashboard</h1>
        <div className="flex items-start md:items-center flex-col md:flex-row gap-5 mt-10 pb-6">

          <div className="flex gap-4 w-auto">
            <img src={img1} alt="" className='w-[50px] h-[50px]' />
            <div className="">
              <h1 className='font-semibold text-lg text-black_500'>{products.length} new orders</h1>
              <p className='text-gray-500 text-ph -mt-1'>Awating processing</p>
            </div>
          </div>
          <div className="flex gap-4 w-auto">
            <img src={img2} alt="" className='w-[50px] h-[50px]' />
            <div className="">
              <h1 className='font-semibold text-lg text-black_500'>5 orders</h1>
              <p className='text-gray-500 text-ph -mt-1'>On hold</p>
            </div>
          </div>
          <div className="flex gap-4 w-auto">
            <img src={img3} alt="" className='w-[50px] h-[50px]' />
            <div className="">
              <h1 className='font-semibold text-lg text-black_500'>{outStock} products</h1>
              <p className='text-gray-500 text-ph -mt-1'>Out of stock</p>
            </div>
          </div>
        </div>

        {/* Total Sells Chart */}
        {/* <TotalSellChart /> */}
        {/* Total Order Chart */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <TotalOrderChart />
          <NewCustomerChart />
        </div> */}
      </div>

      {/* Last Product Review */}
      <div className="bg-white border-solid border-t border-gray-300 ">

        <LastReviewTable />
      </div>
    </>
  )
}

export default Dashbord;