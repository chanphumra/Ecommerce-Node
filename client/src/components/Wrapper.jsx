const Wrapper = () => {
  const wrapperItems = [
    {
      icon: <i className='fa-solid fa-truck-fast'></i>,
      title: "Worldwide Delivery",
      desc: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      icon: <i className='fa-solid fa-id-card'></i>,
      title: "Safe Payment",
      desc: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      icon: <i className='fa-solid fa-shield'></i>,
      title: "Shop With Confidence ",
      desc: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      icon: <i className='fa-solid fa-headset'></i>,
      title: "24/7 Support ",
      desc: "We offer competitive prices on our 100 million plus product any range.",
    },
  ]
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-9 mt-20">
        {
          wrapperItems.map(wrapperItem => {
            return (
              <div className="text-center p-10 bg-white rounded-lg shadow-[0_1px_3px_rgb(3,0,71,0.09)]" key={wrapperItem.title}>
                <div className="w-[70px] h-[70px] leading-[75px] m-auto bg-body  rounded-full">
                  <i className='text-2xl text-[#4a4a4a]'>{wrapperItem.icon}</i>
                </div>
                <h3 className='font-medium text-xl mt-4'>{wrapperItem.title}</h3>
                <p className='my-4 text-gray-600'>{wrapperItem.desc}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Wrapper