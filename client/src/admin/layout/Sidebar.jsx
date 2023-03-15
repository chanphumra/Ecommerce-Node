import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams, } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2'
import { RiPieChartLine } from 'react-icons/ri'
import { IoBagOutline, IoCartOutline } from 'react-icons/io5'
import { BiCategory, BiSlideshow } from 'react-icons/bi'
import { SlSettings } from 'react-icons/sl'
import { FiUser } from 'react-icons/fi'

const menu = [
    {
        title: 'Dashboard',
        path: '/admin',
        page_name: 'dashboard',
        icon: <RiPieChartLine />,
        hasSub: false
    },
    {
        title: 'Orders',
        path: '/admin/orders',
        page_name: 'orders',
        icon: <IoBagOutline />,
        hasSub: false
    },
    {
        title: "Customers",
        children: [
            {
                title: 'Add Customer',
                path: '/admin/add_customer',
                page_name: 'add_customer',
            },
            {
                title: 'Customer',
                path: '/admin/show_customer',
                page_name: 'show_customer',
            }
        ],
        icon: <FiUser />,
        hasSub: true
    },
    {
        title: "Categories",
        children: [
            {
                title: 'Add Category',
                path: '/admin/add_category',
                page_name: 'add_category',
            },
            {
                title: 'Category',
                path: '/admin/show_category',
                page_name: 'show_category',
            }
        ],
        icon: <BiCategory />,
        hasSub: true
    },
    {
        title: "Products",
        children: [
            {
                title: 'Add Product',
                path: '/admin/add_product',
                page_name: 'add_product',
            },
            {
                title: 'Product',
                path: '/admin/show_product',
                page_name: 'show_product',
            }
        ],
        icon: <IoCartOutline />,
        hasSub: true
    },
    {
        title: "Slideshow",
        children: [
            {
                title: 'Add Slideshow',
                path: '/admin/add_slideshow',
                page_name: 'add_slideshow',
            },
            {
                title: 'Slideshow',
                path: '/admin/show_slideshow',
                page_name: 'show_slideshow',
            }
        ],
        icon: <BiSlideshow />,
        hasSub: true
    },
    {
        title: "Site Setting",
        children: [
            {
                title: 'Site Profile',
                path: '/admin/site_profile',
                page_name: 'site_profile',
            },
            {
                title: 'Footer',
                path: '/admin/footer',
                page_name: 'footer',
            }
        ],
        icon: <SlSettings />,
        hasSub: true
    },
];


const MenuItem = (props) => {
    const hasSub = props.hasSub;
    const [open, setOpen] = useState(false);
    let page_name = new URLSearchParams(useLocation().search).get('page_name') || "dashboard";

    // set active title sub menu when we close it if we stay in same page_title
    const [active, setActive] = useState(false);
    const SetActiveTitle = (props) => {
        useEffect(() => {
            for (let index = 0; index < props.list_page_name.length; index++) {
                const element = props.list_page_name[index].page_name;
                if (element == page_name && !open) {
                    setActive(true);
                    break;
                }
                else {
                    setActive(false);
                }
            }
            if (open) setActive(false);
        });
    }
    
    const Menu = () => {
        return (
            <>
                <Link to={`${props.path != "/admin" ? `${props.path}?page_name=${props.page_name}` : '/admin'}`} onClick={() => { props.setOpen(false) }}>
                    <div className='flex items-center py-[6px] px-4 rounded-md lg:hover:bg-hover_menu'>
                        <h1 className='mr-2'>{props.icon}</h1>
                        <p className={`${page_name == props.page_name ? 'text-primary' : 'text-black'} text-ph font-semibold`}>{props.title}</p>
                    </div>
                </Link>
            </>
        );
    }

    const MenuWithSub = () => {
        return (
            <>
                {/* title menu */}
                <div onClick={()=>setOpen(pre => !pre)} className="flex justify-between items-center cursor-pointer py-[6px] px-4 pr-1 rounded-md lg:hover:bg-hover_menu">
                    <div className='flex items-center'>
                        <h1 className='mr-2'>{props.icon}</h1>
                        <p className={`${(active) ? 'text-primary' : ''} text-ph font-semibold`}>{props.title}</p>
                    </div>
                    <HiChevronRight className={`text-sm font-extrabold ${open ? 'rotate-90' : 'rotate-0'}`} />
                </div>

                {/* sub menu */}
                <div className={`overflow-hidden transition-all ${open ? 'h-auto' : 'h-0 py-0'}`}>
                    {props.children.map((item) => (
                        <Link key={item.title} to={`${item.path}?page_name=${item.page_name}`} onClick={() => (props.setOpen(false))}>
                            <div className={`py-[6px] px-4 pr-1 rounded-md lg:hover:bg-hover_menu`}>
                                <p className={`${page_name == item.page_name ? 'text-primary' : 'text-black'} text-ph font-semibold pl-12`}>{item.title}</p>
                            </div>
                        </Link>
                    ))}
                    <SetActiveTitle list_page_name={props.children} />
                </div>
            </>
        );
    }

    return (
        <div>{hasSub ? <MenuWithSub /> : <Menu />}</div>
    );
}


const Sidebar = ({ open, setOpen }) => {

    const [close, setClose] = useState(true)
    return (
        <div className={`overflow-hidden p-3 flex flex-col fixed z-10 left-0 w-full lg:w-[250px] bg-white lg:border-solid lg:border-gray-300 lg:border-r h-0 lg:h-[100%] lg:overflow-y-auto overflow-x-hidden transition-all lg:transition-none ease-linear ${(open) ? 'h-[90%]' : 'py-0 lg:p-3 h-0'}`}>

            {menu.map((item) => (

                <div key={item.title}>
                    <MenuItem open={open} setOpen={setOpen} key={item.title} title={item.title} hasSub={item.hasSub} path={item.path} page_name={item.page_name} icon={item.icon} children={item.children} close={close} setClose={setClose} />
                </div>

            ))}
        </div>
    )
}

export default Sidebar;