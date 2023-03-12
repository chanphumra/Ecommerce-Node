const HeaderTitle = (props) => {
  return (
    <>
      <div className="flex items-center">
        <i className={`${props.icon} mx-2 text-[#e94560] text-lg`}></i>
        <span className='text-2xl font-[700] text-gray-800 capitalize'>{props.title}</span>
      </div>
    </>
  )
}

export default HeaderTitle