import { Link } from "react-router-dom"
const Banner = () => {
    
    return (
        <>
            <div className='grid grid-cols-6 mt-9 gap-5'>
                <div className="col-span-6 lg:col-span-2 rounded-lg overflow-hidden">
                    <div className="relative bg-black p-5 h-[350px] flex items-end">
                        <div className='absolute top-0 left-0 w-full h-full'>
                            <img className='w-full h-full object-cover' src={""} alt="" />
                        </div>
                        <span className='absolute top-5 left-5 text-white text-2xl uppercase font-bold bg-[#8884d8] px-3 py-2 rounded'>30% off</span>
                        <div className="mx-auto z-[50]">
                            <h3 className='text-white text-xl uppercase my-3 font-bold'>Flash deal</h3>
                            <Link to=''>
                                <div className='h-10 leading-10 px-4 rounded items-end block text-center bg-[#8884d8] text-white'>Shop now</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 lg:col-span-4 rounded-lg overflow-hidden">
                    <   div className="relative bg-black p-5 h-[350px] flex justify-center items-center">
                        <div className='absolute top-0 left-0 w-full h-full'>
                            <img className='object-cover w-full h-full' src={""} alt="" />
                        </div>
                        <span className='absolute top-5 left-5 text-white text-2xl uppercase font-bold bg-[#8884d8] px-3 py-2 rounded'>30% off</span>
                        <div className='z-[50]'>
                            <h3 className='text-white text-xl uppercase my-3 font-bold'>Flash deal</h3>
                            <Link to=''>
                                <div className='h-10 leading-10 px-4 items-end block text-center bg-[#8884d8] text-white rounded'>Shop now</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner