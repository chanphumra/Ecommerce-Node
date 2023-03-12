import React from 'react'
import Content from './Content';
import Sidebar from './Sidebar';

const Body = ({open, setOpen}) => {
  return (
    <>
        <Sidebar open={open} setOpen={setOpen}/>
        <Content />
    </>
  )
}

export default Body;