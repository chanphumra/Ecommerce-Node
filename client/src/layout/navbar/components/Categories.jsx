import React, { useEffect, useState } from "react";
import { BiCategory } from 'react-icons/bi'
import { Link, useLocation } from "react-router-dom";
import categoriesItems from "../data/CategoriesItems";
import axios from "axios";

const Categories = (props) => {
    let page_name = new URLSearchParams(useLocation().search).get('page_name') || "home";
    const [mainCategory, setMainCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const getData = async () => {
        const main = await axios.get('http://localhost:8000/api/maincategory');
        setMainCategory(main.data.list);

        const sub = await axios.get('http://localhost:8000/api/subcategory');
        setSubCategory(sub.data.list);
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <div className='relative cursor-pointer group'>
                <div className="flex items-center justify-between py-2 rounded" onClick={() => { props.setOpenCategory(open => !open); if (!props.openCategory) props.setOpenMenu(false) }}>
                    <div className="flex items-center">
                        <BiCategory className="font-bold mr-2 text-lg" />
                        <h4 className='text-base font-semibold'>Categories</h4>
                    </div>
                </div>
                <div className={`${props.openCategory ? 'h-[500px]' : ''} absolute top-[125%] left-0  w-[280px] md:w-[600px] overflow-y-auto md:overflow-hidden md:h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-30 shadow-md rounded-lg bg-white scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-[#cfcfcf] scrollbar-thumb-rounded-xl ${props.openCategory ? 'border border-solid border-gray-300' : ''}`}>

                    {
                        mainCategory.map((main, index) => (

                            <div key={index} className={`text-sm ${props.openCategory ? 'h-[160px] opacity-100' : 'h-[0px] opacity-0 overflow-hidden'}`}>
                                <div className="pt-5 pl-5">
                                    <div className="flex items-center gap-1">
                                        <img src={main.image} alt="" className="w-[25px] h-[25px]"/>
                                        <p className="text-base font-semibold">{main.name}</p>
                                    </div>

                                    <ul className='mt-3'>
                                        {
                                            subCategory.map((sub) => {
                                                if (main.id === sub.main_id)
                                                    return <li key={sub.id} className='pl-1 text-start my-2 text-[14px] font-semibold text-gray-800'>
                                                        <Link to={`productcategory/${sub.id}/${sub.name}?page_name=product`} className={`w-full block transition hover:underline hover:text-gray-600`} onClick={() => props.setOpenCategory(false)}>{sub.name}</Link>
                                                    </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}
export default Categories