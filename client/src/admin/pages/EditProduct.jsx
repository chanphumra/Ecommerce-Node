import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { MdCloudUpload } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, Slide } from 'react-toastify';

const default_size = ['36', '37', '38', '39', '40', '41', '42'];
const default_color = ['red', 'blue', 'black', 'white', 'yellow', 'green'];

const EditProduct = () => {

    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [products, setProducts] = useState([]);
    const [maincategory, setMaincategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [image, setImage] = useState([]);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const sale_priceRef = useRef();
    const qtyRef = useRef();
    const discountRef = useRef();
    const imageRef = useRef();
    const mainRef = useRef('');
    const subRef = useRef('');
    const { id } = useParams();
    const navigate = useNavigate();

    function addSize(newSize) {
        setSize([...size, newSize]);
        setSize(cur => cur.sort());
    }

    function deleteSize(delSize) {
        setSize(cur => cur.filter((size) => size !== delSize));
        setSize(cur => cur.sort());
    }

    function addColor(newColor) {
        setColor([...color, newColor]);
        setColor(cur => cur.sort());
    }

    function deleteColor(delColor) {
        setColor(cur => cur.filter((color) => color !== delColor));
        setColor(cur => cur.sort());
    }

    const getProduct = async () => {
        const res = await axios.get('http://localhost:8000/api/product/' + id);
        const data = res.data.list;
        nameRef.current.value = data[0].name;
        descriptionRef.current.value = data[0].description;
        priceRef.current.value = data[0].price;
        sale_priceRef.current.value = data[0].sale_price;
        qtyRef.current.value = data[0].qty;
        discountRef.current.value = data[0].discount;
        const img = [data[0].image1, data[0].image2, data[0].image3];
        setImage(img);
    }

    const previewImage = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setImage(imageArray);
    }

    const getMainCategory = async () => {
        await axios.get(
            'http://localhost:8000/api/maincategory'
        ).then(res => {
            const data = res.data.list;
            setMaincategory(data);
            getSubcategory({ id: data[0].id })
        }).catch(err => {
            console.log(err);
        });
    }

    const getSubcategory = async (props) => {
        await axios.get(
            'http://localhost:8000/api/subcategory/main/' + props.id
        ).then(res => {
            const data = res.data.list;
            setSubcategory(data);
        }).catch(err => {
            console.log(err);
        });
    }

    const updateProduct = async () => {
        try {
            const sub_id = subRef.current.value;
            const name = nameRef.current.value;
            const description = descriptionRef.current.value;
            const price = priceRef.current.value;
            const sale_price = sale_priceRef.current.value;
            const qty = qtyRef.current.value;
            const discount = discountRef.current.value;
            const images = imageRef.current.files;

            if(name != '' && description != '' && price != '' && sale_price !='' && qty != '' && image.length >= 3){
                if(mainRef.current.value == '' || subRef.current.value == ''){
                    alert('no category');
                    return;
                }
                let sizes = '';
                let colors = '';
                const data = {
                    sub_id: sub_id,
                    name: name,
                    description: description,
                    price: price,
                    sale_price: sale_price,
                    qty: qty,
                    discount: discount,
                    images: images
                }

                const formdata = new FormData();
                formdata.append('sub_id', data.sub_id);
                formdata.append('name', data.name);
                formdata.append('description', data.description);
                formdata.append('price', data.price);
                formdata.append('qty', data.qty);
                formdata.append('sale_price', data.sale_price);
                formdata.append('discount', data.discount);
                formdata.append('color', data.color);
                for (let index = 0; index < data.images.length; index++) {
                    const element = data.images[index];
                    formdata.append('images', element);
                }

                const url = 'http://localhost:8000/api/product/' + id;
                const res = await axios.put(url, formdata);
                console.log(res);
                //console.log(formdata.name);
                nameRef.current.value = descriptionRef.current.value = priceRef.current.value = sale_priceRef.current.value = qtyRef.current.value = discountRef.current.value =imageRef.current.value = null;
                setImage([]);
                toast.success('Product edit successfully', {
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
                navigate('/admin/show_product?page_name=show_product');
            }
            else{
                toast.warn('Please check information again!!', {
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getProductDetails = async () => {
        const res = await axios.get('http://localhost:8000/api/product/details/' + id);
        const data = res.data.list;
        setProducts(data);
    }

    useEffect(() => {
        getProduct();
        getMainCategory();
        getSubcategory(7);
        getProductDetails();
    }, []);

    products.map((item, index) => {
        if (item.color != 'none')
            return <div key={index} className="bg-primary text-white h-[20px] rounded-md text-xs px-2 py-1 flex items-center gap-1">
                <p>{item.color}</p>
                <IoIosClose className='cursor-pointer text-lg' onClick={() => deleteColor(item)} />
            </div>
    })

    return (
        <div className='lg:py-7 lg:px-10 p-5'>
            <div className="flex justify-between items-end">
                <h1 className='text-3xl font-bold text-black_500'>Edit product</h1>
                <button onClick={()=>{updateProduct()}} className='px-4 py-2 rounded-md bg-primary text-white text-sm cursor-pointer'>Publish product</button>
            </div>
            <div className="mt-10 flex flex-col gap-8 md:flex-row">
                <div className='flex-[4]'>
                    <h1 className='text-xl font-semibold text-gray-800'>Product Title</h1>
                    <div className="mt-3">
                        <input ref={nameRef} type="text" name="" id="" className='input text-sm w-full' placeholder='Write title here...' />
                    </div>
                    <div className="mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Product Description</h1>
                        <div className='mt-3'>
                            <textarea ref={descriptionRef} name="" id="" placeholder='Write a description here...' className='text-sm h-[200px] input w-full resize-none'></textarea>
                        </div>
                    </div>

                    <div className="mt-7">
                        <h1 className='text-xl font-semibold text-gray-800'>Display images <span className='text-[12px] text-red-500'> ( 3 images require )</span></h1>
                        {image && image.map((item, index) => (
                            <div key={index} className="inline-flex gap-4 mt-2 mr-2">
                                <div className='relative w-20 h-20 p-[2px] rounded-lg border-solid border border-gray-300 overflow-hidden'>
                                    <img src={item} alt="" className='w-full h-full rounded-lg object-cover' />
                                </div>
                            </div>
                        ))}

                        <div className="relative h-[200px] mt-3 border-dashed border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center">
                            <MdCloudUpload className='text-primary text-[46px]' />
                            <p className='text-[15px] text-gray-600'>Browse product image</p>
                            <input ref={imageRef} onChange={previewImage} className='absolute w-full h-full opacity-0 cursor-pointer' type="file" name="" id="" accept="image/*" multiple />
                        </div>
                    </div>

                    <div className="border border-solid border-gray-300 rounded-lg p-4 mt-8 bg-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className='w-full'>
                                <p className='mb-2 text-gray-800 text-[15px] font-semibold'>Regular price</p>
                                <input ref={priceRef} type="text" placeholder='$$$' className='input w-full' />
                            </div>
                            <div className='w-full'>
                                <p className='mb-2 text-gray-800 text-[15px] font-semibold'>Sale price</p>
                                <input ref={sale_priceRef} type="text" placeholder='$$$' className='input w-full' />
                            </div>
                        </div>
                        <div className='w-full mt-4'>
                            <p className='mb-2 text-gray-800 text-[15px] font-semibold'>Add to stock</p>
                            <input ref={qtyRef} type="text" placeholder='Quantity' className='input w-full' />
                        </div>
                        <div className='w-full mt-4'>
                            <p className='mb-2 text-gray-800 text-[15px] font-semibold'>Discount</p>
                            <input ref={discountRef} type="text" placeholder='0.00%' className='input w-full' />
                        </div>
                    </div>
                </div>

                <div className='flex-[2]'>
                    <div className="border-solid border border-gray-300 rounded-lg p-4 h-[305px] bg-white mt-2 md:mt-10">
                        <h1 className='text-xl font-semibold text-gray-800'>Category</h1>
                        <div className="flex justify-between items-center">
                            <p className='text-[15px] mt-4 font-semibold'>Main category</p>
                            <Link to={"/admin/add_category?page_name=add_category"}>
                                <p className='text-sm cursor-pointer mt-4 font-semibold text-primary hover:underline'>Add new category</p>
                            </Link>
                        </div>
                        <select ref={mainRef} name="" id="" className={`w-full mt-2 text-[14px] cursor-pointer`} onChange={(e) => (getSubcategory({ id: e.target.value }))}>
                            {
                                maincategory.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                        <p className='text-[15px] mt-8 font-semibold'>Sub category</p>
                        <select ref={subRef} name="" id="" className={`w-full mt-2 text-[14px] cursor-pointer`} >
                            {
                                subcategory.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="border-solid border border-gray-300 rounded-lg p-4 bg-white mt-2 md:mt-8">
                        <h1 className='text-xl font-semibold text-gray-800'>Color & Size</h1>
                        <div className="flex justify-between items-center">
                            <p className='text-[15px] mt-4 font-semibold'>Color</p>
                            <Link to={"/add_category?page_name=add_category"}>
                                <p className='text-sm cursor-pointer mt-4 font-semibold text-primary hover:underline'>Add new color</p>
                            </Link>
                        </div>
                        <button className='group flex flex-row flex-wrap gap-1 relative w-full h-[85px] rounded-lg mt-2 p-2 cursor-pointer border-2 border-solid border-gray-300 hover:border-primary'>
                            {products.map((item, index) => {
                                if (item.color != 'none')
                                    return <div key={index} className="bg-primary text-white h-[20px] rounded-md text-xs px-2 py-1 flex items-center gap-1">
                                        <p>{item.color}</p>
                                        <IoIosClose className='cursor-pointer text-lg' onClick={() => deleteColor(item.color)} />
                                    </div>
                            })}
                            <div className="hidden group-focus:block absolute z-50 bg-white top-[103%] border-2 border-solid border-primary rounded-b-md rounded-t-sm shadow-md overflow-hidden left-0 right-0">
                                {
                                    default_color.map((item, index) => {
                                        if (!color.includes(item))
                                            return <p key={index} onClick={() => addColor(item)} className='text-start text-sm px-2 py-[2px] text-gray-700 hover:bg-primary hover:text-white'>{item}</p>
                                    })
                                }
                                <p className='text-sm px-2 py-[2px] text-gray-700'>{`${default_color.length === color.length ? "No choices to choose" : ''}`}</p>
                            </div>
                        </button>

                        <div className="flex justify-between items-center">
                            <p className='text-[15px] mt-4 font-semibold'>Size</p>
                            <Link to={"/add_category?page_name=add_category"}>
                                <p className='text-sm cursor-pointer mt-4 font-semibold text-primary hover:underline'>Add new size</p>
                            </Link>
                        </div>
                        <button className='group flex flex-row flex-wrap gap-1 relative w-full h-[85px] rounded-lg mt-2 p-2 cursor-pointer border-2 border-solid border-gray-300 hover:border-primary'>
                            {products.map((item, index) => {
                                if (item.size != 'none')
                                    return <div key={index} className="bg-primary text-white h-[20px] rounded-md text-xs px-2 py-1 flex items-center gap-1">
                                        <p>{item.size}</p>
                                        <IoIosClose className='cursor-pointer text-lg' onClick={() => deleteColor(item.size)} />
                                    </div>
                            })}
                            <div className="hidden group-focus:block absolute z-50 bg-white top-[103%] border-2 border-solid border-primary rounded-b-md rounded-t-sm shadow-md overflow-hidden left-0 right-0">
                                {
                                    default_size.map((item, index) => {
                                        if (!size.includes(item))
                                            return <p key={index} onClick={() => addSize(item)} className='text-start text-sm px-2 py-[2px] text-gray-700 hover:bg-primary hover:text-white'>{item}</p>
                                    })
                                }
                                <p className='text-sm px-2 py-[2px] text-gray-700'>{`${default_size.length === size.length ? "No choices to choose" : ''}`}</p>
                            </div>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditProduct;