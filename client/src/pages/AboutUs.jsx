import React from 'react';
import Phumra from '../assets/images/phumra.jpg';
import Narin from '../assets/images/narin.jpg';
import Senh from '../assets/images/senh.jpg';

const AboutUs = () => {
    return (
        <div className="mycontainer">
            <h1 className='text-4xl mt-10 font-semibold text-primary text-center mb-10'>Our Developer</h1>
            <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center mb-12">
                <img src={Phumra} alt="" className='shadow-sm w-full md:w-[250px] h-[400px] md:h-[300px]  p-2 rounded-lg border border-solid border-gray-300 ' />
                <div className='w-full md:w-[70%] order-first md:order-last'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Mr. Chan Phumra</h1>
                    <h1 className='text-2xl font-semibold text-gray-600 mb-1'>Web Developer</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil repudiandae voluptate repellat perspiciatis sint aliquid dolorum possimus id ipsum fugiat inventore ratione ex, animi facilis soluta doloribus nostrum minus.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center mb-12">
                <img src={Narin} alt="" className='shadow-sm w-full md:w-[250px] h-[400px] md:h-[300px]  p-2 rounded-lg border border-solid border-gray-300 ' />
                <div className='w-full md:w-[70%] order-first'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Mr. Rin Narin</h1>
                    <h1 className='text-2xl font-semibold text-gray-600 mb-1'>Web Developer</h1>
                    <p className='w-full overflow-hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil repudiandae voluptate repellat perspiciatis sint aliquid dolorum possimus id ipsum fugiat inventore ratione ex, animi facilis soluta doloribus nostrum minus.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center mb-12">
                <img src={Senh} alt="" className='shadow-sm w-full md:w-[250px] h-[400px] md:h-[300px]  p-2 rounded-lg border border-solid border-gray-300 ' />
                <div className='w-full md:w-[70%] order-first md:order-last'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Mr. Sat Thaisenh</h1>
                    <h1 className='text-2xl font-semibold text-gray-600 mb-1'>Web Developer</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil repudiandae voluptate repellat perspiciatis sint aliquid dolorum possimus id ipsum fugiat inventore ratione ex, animi facilis soluta doloribus nostrum minus.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center mb-12">
                <img src={""} alt="" className='shadow-sm w-full md:w-[250px] h-[400px] md:h-[300px]  p-2 rounded-lg border border-solid border-gray-300 ' />
                <div className='w-full md:w-[70%] order-first'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Mr. Meng Sereyvathana</h1>
                    <h1 className='text-2xl font-semibold text-gray-600 mb-1'>Web Developer</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil repudiandae voluptate repellat perspiciatis sint aliquid dolorum possimus id ipsum fugiat inventore ratione ex, animi facilis soluta doloribus nostrum minus.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;