import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {toast, Slide} from 'react-toastify'

const FooterSetting = () => {

    const descriptionRef = useRef();

    const title2Ref = useRef();
    const text2_1Ref = useRef();
    const text2_2Ref = useRef();
    const text2_3Ref = useRef();
    const text2_4Ref = useRef();

    const title3Ref = useRef();
    const text3_1Ref = useRef();
    const text3_2Ref = useRef();
    const text3_3Ref = useRef();
    const text3_4Ref = useRef();

    const title4Ref = useRef();
    const text4_1Ref = useRef();
    const text4_2Ref = useRef();
    const text4_3Ref = useRef();
    const text4_4Ref = useRef();

    const getData = async () => {
        const res = await axios.get('http://localhost:8000/api/footer');
        const data1 = res.data.list[0];
        const data2 = res.data.list[1];
        const data3 = res.data.list[2];
        const data4 = res.data.list[3];

        // column 1
        descriptionRef.current.value = data1.description;

        // column 2
        title2Ref.current.value = data2.title;
        text2_1Ref.current.value = data2.text1;
        text2_2Ref.current.value = data2.text2;
        text2_3Ref.current.value = data2.text3;
        text2_4Ref.current.value = data2.text4;

        // column 3
        title3Ref.current.value = data3.title;
        text3_1Ref.current.value = data3.text1;
        text3_2Ref.current.value = data3.text2;
        text3_3Ref.current.value = data3.text3;
        text3_4Ref.current.value = data3.text4;

        // column 4
        title4Ref.current.value = data4.title;
        text4_1Ref.current.value = data4.text1;
        text4_2Ref.current.value = data4.text2;
        text4_3Ref.current.value = data4.text3;
        text4_4Ref.current.value = data4.text4;
    }

    const update = async () => {
        const datas = [
            {
                id: 1,
                description: descriptionRef.current.value,
                title: '',
                text1: '',
                text2: '',
                text3: '',
                text4: '',
            },
            {
                id: 2,
                description: "",
                title: title2Ref.current.value,
                text1: text2_1Ref.current.value,
                text2: text2_2Ref.current.value,
                text3: text2_3Ref.current.value,
                text4: text2_4Ref.current.value,
            },
            {
                id: 3,
                description: "",
                title: title3Ref.current.value,
                text1: text3_1Ref.current.value,
                text2: text3_2Ref.current.value,
                text3: text3_3Ref.current.value,
                text4: text3_4Ref.current.value,
            },
            {
                id: 4,
                description: "",
                title: title4Ref.current.value,
                text1: text4_1Ref.current.value,
                text2: text4_2Ref.current.value,
                text3: text4_3Ref.current.value,
                text4: text4_4Ref.current.value,
            },
        ];
        for (let index = 0; index < datas.length; index++) {
            const data = datas[index];
            const url = 'http://localhost:8000/api/footer';
            await axios.put(url, data);
        }
        toast.success('Update successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            theme: "light",
        });
    }

    useEffect(()=>{
        getData();
    },[]);

    return (
        <>
            <div className='lg:py-7 lg:px-10 p-5'>
                <div className="flex justify-between items-end">
                    <h1 className='text-3xl font-bold text-black_500'>Footer Setting</h1>
                    <button onClick={update} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Save Change</button>
                </div>
                <div className="grid grid-cols md:grid-cols-2 mt-8 gap-4">
                    <div className='p-4 bg-white rounded-lg shadow-md'>
                        <h1 className='text-lg font-semibold mb-4'>Column 1</h1>
                        <p className='text-base'>Description</p>
                        <input ref={descriptionRef} type="text" className='input w-full mt-2' />
                    </div>
                    <div className='p-4 bg-white rounded-lg shadow-md'>
                        <h1 className='text-lg font-semibold mb-4'>Column 2</h1>
                        <p className='text-base'>Title</p>
                        <input ref={title2Ref} type="text" className='input w-full mt-2' />
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text1</p>
                                <input ref={text2_1Ref} type="text" className='input w-full mt-2' />
                            </div>
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text2</p>
                                <input ref={text2_2Ref} type="text" className='input w-full mt-2' />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text3</p>
                                <input ref={text2_3Ref} type="text" className='input w-full mt-2' />
                            </div>
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text4</p>
                                <input ref={text2_4Ref} type="text" className='input w-full mt-2' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4 bg-white rounded-lg shadow-md'>
                        <h1 className='text-lg font-semibold mb-4'>Column 3</h1>
                        <p className='text-base'>Title</p>
                        <input ref={title3Ref} type="text" className='input w-full mt-2' />
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text1</p>
                                <input ref={text3_1Ref} type="text" className='input w-full mt-2' />
                            </div>
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text2</p>
                                <input ref={text3_2Ref} type="text" className='input w-full mt-2' />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text3</p>
                                <input ref={text3_3Ref} type="text" className='input w-full mt-2' />
                            </div>
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text4</p>
                                <input ref={text3_4Ref} type="text" className='input w-full mt-2' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4 bg-white rounded-lg shadow-md'>
                        <h1 className='text-lg font-semibold mb-4'>Column 4</h1>
                        <p className='text-base'>Title</p>
                        <input ref={title4Ref} type="text" className='input w-full mt-2' />
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text1</p>
                                <input ref={text4_1Ref} type="text" className='input w-full mt-2' />
                            </div>
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text2</p>
                                <input ref={text4_2Ref} type="text" className='input w-full mt-2' />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text3</p>
                                <input ref={text4_3Ref} type="text" className='input w-full mt-2' />
                            </div>
                            <div className='w-full'>
                                <p className='text-base mt-2'>Text4</p>
                                <input ref={text4_4Ref} type="text" className='input w-full mt-2' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterSetting;