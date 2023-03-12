import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import BestSeller from '../components/BestSeller'
import BigDiscount from '../components/BigDiscount'
import NewArrivals from '../components/NewArrivals'
import Slider from '../components/Slider'
import Wrapper from '../components/Wrapper'

const Home = (props) => {
  return (
    <>
        <Slider />
        <div className="mycontainer m-auto">
            {/* <Banner /> */}
            <NewArrivals setCount={props.setCount} setCarts={props.setCarts}/>
            <BigDiscount setCount={props.setCount} setCarts={props.setCarts}/>
            {/* <BestSeller /> */}
            <Wrapper />
        </div>
    </>
  )
}

export default Home