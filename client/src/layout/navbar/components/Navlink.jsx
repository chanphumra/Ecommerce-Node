import { useEffect, useState } from "react";
import { Link , useLocation} from "react-router-dom";

const link = [
    {
        title: 'Home',
        path: '/',
        page_name: 'home',
    },
    {
        title: 'Product',
        path: '/product',
        page_name: 'product',
    },
    // {
    //     title: 'Category',
    //     path: '/product_by_category',
    //     page_name: 'product_by_category',
    // },
    {
        title: 'Contact Us',
        path: '/contact_us',
        page_name: 'contact_us',
    },
    {
        title: 'About Us',
        path: '/about_us',
        page_name: 'about_us',
    }
]

// const Navlist = (props) => {
//     const navlinks = props.list;
//     return (
//         <>
            
//         </>
//     )
// }
// custom hook
function useWindowSize() {

    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
      const handleResize = () =>{
        setSize([window.innerHeight, window.innerWidth]);
      }
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }, []);
    return size;
}

const Navlink = (props) => {
    let page_name = new URLSearchParams(useLocation().search).get('page_name') || "home";

    const [height, width] = useWindowSize();
    useEffect(() => {
        if(width < 1024 && props.openMenu){
            props.setOpenMenu(true);
        }
        else{
            props.setOpenMenu(false); 
        }
    }, [width]);

  return (
    <>
        <div className='flex px-1'>
            <div className={`flex flex-col gap-[20px] right-[5%] top-[112%] lg:flex-row absolute lg:static items-start lg:items-end justify-end rounded-lg overflow-hidden bg-white ${props.openMenu ? 'border-solid border border-gray-300 shadow-md h-auto p-5 pr-[100px]': 'h-0 p-0 lg:h-auto'}`}>
                {
                    link.map((item, index)=>{
                        return (
                            <Link key={index} to={`${item.page_name != "home" ? `${item.path}?page_name=${item.page_name}` : '/'}`}>
                                <p className={`text-base font-semibold ${item.page_name === page_name ? "text-[#8884d8]": "text-gray-800"} `}>{item.title}</p>
                            </Link>
                        );
                    })
                }
            </div>
            <button onClick={() =>{props.setOpenMenu(open => !open); if(!props.openMenu) props.setOpenCategory(false)}}>
                <i className="fa-solid fa-bars text-xl lg:hidden"></i>
            </button>
        </div>
    </>
  )
}

export default Navlink