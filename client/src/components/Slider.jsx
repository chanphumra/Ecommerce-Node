import React, { useRef, useState,useEffect } from "react";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import slide1 from './images/nike-black.png'

import { Autoplay, Pagination, Navigation } from "swiper";

const Slider = () => {

  const [slideshow, setSlideshow] = useState([]);

  const getAllSlideshow = async () => {
    const res = await axios.get('http://localhost:8000/api/slideshow');
    const data = await res.data.list;
    setSlideshow(data);
  }
  useEffect(() => {
    getAllSlideshow();
  }, []);

  return (
    <>
      <div className="mycontainer m-auto mt-4 py-0 rounded-lg overflow-hidden">
          <Swiper
            style={{
              "--swiper-navigation-color": "#8884d8",
              "--swiper-pagination-color": "#8884d8",
            }}
            loop={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-[600px] bg-white rounded-lg overflow-hidden"
          >
            {
              slideshow.map((item, index) => {
                if(item.enable == 1)
                  return <SwiperSlide className="h-full" key={index}>
                    <div className='flex items-center flex-col lg:flex-row h-full w-full'>
                      <div className="flex items-center justify-center w-full lg:w-1/2 h-[35%] lg:h-full">
                        <div className="ml-7 md:ml-14">
                          <h1 className='capitalize text-2xl lg:text-5xl font-bold'>{item.title}</h1>
                          <h4 className="text-gray-500 my-5 md:my-7">{item.text}</h4>
                          <Link to={item.link} className='capitalize bg-[#8884d8] text-white py-3 px-7 rounded'>Shop now</Link>
                        </div>
                      </div>
                      <div className="image w-full lg:w-1/2 h-[65%] lg:h-full">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </SwiperSlide>
              })
            }
          </Swiper>
        </div>
    </>
  )
}

export default Slider