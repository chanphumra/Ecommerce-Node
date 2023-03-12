import { React, useRef, useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {

    const [description, setDescription] = useState();

    const [title2, setTitle2] = useState();
    const [text2_1, setText2_1] = useState();
    const [text2_2, setText2_2] = useState();
    const [text2_3, setText2_3] = useState();
    const [text2_4, setText2_4] = useState();

    const [title3, setTitle3] = useState();
    const [text3_1, setText3_1] = useState();
    const [text3_2, setText3_2] = useState();
    const [text3_3, setText3_3] = useState();
    const [text3_4, setText3_4] = useState();

    const [title4, setTitle4] = useState();
    const [text4_1, setText4_1] = useState();
    const [text4_2, setText4_2] = useState();
    const [text4_3, setText4_3] = useState();
    const [text4_4, setText4_4] = useState();

    const [logo, setLogo] = useState();
    const [name, setName] = useState();

    const getProfile = async () => {
        const res = await axios.get('http://localhost:8000/api/profile');
        const data = res.data.list[0];
        setLogo(data.image); setName(data.name);
    }

    const getData = async () => {
        const res = await axios.get('http://localhost:8000/api/footer');
        const data1 = res.data.list[0];
        const data2 = res.data.list[1];
        const data3 = res.data.list[2];
        const data4 = res.data.list[3];

        // column 1
        setDescription(data1.description);

        // column 2
        setTitle2(data2.title);
        setText2_1(data2.text1);
        setText2_2(data2.text2);
        setText2_3(data2.text3);
        setText2_4(data2.text4);

        // column 3
        setTitle3(data3.title);
        setText3_1(data3.text1);
        setText3_2(data3.text2);
        setText3_3(data3.text3);
        setText3_4(data3.text4);

        // column 4
        setTitle4(data4.title);
        setText4_1(data4.text1);
        setText4_2(data4.text2);
        setText4_3(data4.text3);
        setText4_4(data4.text4);
    }

    useEffect(() => {
        getProfile();
        getData();
    }, []);

    return (
        <>
            <div className='bg-[#222035] mt-10'>
                <div className='mycontainer text-gray-400'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">

                        <div className='flex flex-col gap-4'>
                            <div className="flex items-center gap-4">
                                <div className="logo w-[40px]">
                                    <img src={logo} alt="" className='w-full h-[40px] object-cover' />
                                </div>
                                <p className='text-white font-semibold text-xl md:text-2xl'>{name}</p>
                            </div>
                            <div className='text-gray-300 whitespace-normal'>{description}</div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='font-semibold text-lg text-[#f2f4f6] uppercase'>{title2}</h1>
                            <div className="flex flex-col gap-1">
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text2_1}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text2_2}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text2_3}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text2_4}</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='font-semibold text-lg text-[#f2f4f6] uppercase'>{title3}</h1>
                            <div className="flex flex-col gap-1">
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text3_1}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text3_2}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text3_3}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text3_4}</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='font-semibold text-lg text-[#f2f4f6] uppercase'>{title4}</h1>
                            <div className="flex flex-col gap-1">
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text4_1}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text4_2}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text4_3}</p>
                                <p className='text-base text-gray-300 hover:text-gray-100 cursor-pointer'>{text4_4}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer