import Categories from "./components/Categories"
import Navlink from "./components/Navlink"
import { useState } from "react";

const Navbar = () => {

  const [openCategory, setOpenCategory] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className='mycontainer relative flex justify-between items-center py-1 z-[40]'>
        <Categories openCategory={openCategory} setOpenCategory={setOpenCategory} setOpenMenu={setOpenMenu}/>
        <Navlink openMenu={openMenu} setOpenMenu={setOpenMenu} setOpenCategory={setOpenCategory}/>
      </div>
    </>
  )
}

export default Navbar