import React, { useEffect, useState, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaTelegramPlane } from 'react-icons/fa'
import { toast, Slide } from 'react-toastify'
import { io } from 'socket.io-client'
import parse from 'html-react-parser';
import axios from 'axios'

const Chat = (props) => {
    const [logo, setLogo] = useState();
    const [name, setName] = useState();
    const [user, setUser] = useState({ id: 0, image: '', name: '' });
    const [isUser, setIsUser] = useState(false);
    const [chats, setChats] = useState([]);
    const messageEndRef = useRef();
    const messageRef = useRef();

    /* ----------- socked io --------------*/
    const socket = io('http://localhost:8000');

    useEffect(() => {
        socket.on('connect', async () => {
            // get profile
            const res = await axios.get('http://localhost:8000/api/profile');
            const data = res.data.list[0];
            setLogo(data.image); setName(data.name);

            // get user
            if (localStorage.getItem('userToken')) {
                // remove session
                sessionStorage.removeItem('userEmail');
                sessionStorage.removeItem('userPassword');
                // get user
                const token = localStorage.getItem('userToken');
                const url = 'http://localhost:8000/api/customer/check';
                const res = await axios.get(url, { headers: { authorization: token } });

                // get message from database
                const result = await axios.get(`http://localhost:8000/api/chat/${res.data.user.id}/${1}`);
                const chat = result.data.list;
                setChats(chat); setIsUser(true);
                // socket server
                const item = { isAdmin: 0, userId: res.data.user.id, sockedId: socket.id };
                socket.emit("addUsers", item);
                return;
            }
            else if (sessionStorage.getItem('userEmail')) {
                // remove token
                localStorage.removeItem('userToken');
                // get user
                const email = sessionStorage.getItem('userEmail');
                const url = 'http://localhost:8000/api/customer/email/' + email;
                const res = await axios.get(url);
                // get message from database
                const result = await axios.get(`http://localhost:8000/api/chat/${res.data.user[0].id}/${1}`);
                const chat = result.data.list;
                setChats(chat); setIsUser(true);
                // socked
                const item = { isAdmin: 0, userId: res.data.user[0].id, sockedId: socket.id };
                socket.emit("addUsers", item);
                return;
            }
            setIsUser(false);
        });
    }, []);

    useEffect(() => {
        socket.on('recv_message', data => {
            setChats((pre) => [...pre, data]);
        })
    }, [socket]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [chats]);

    const sendMessage = async () => {
        if (!isUser) return toast.info("can't chat, need have account first", {
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
        if (messageRef.current.value === "" || messageRef.current.value === null) return;

        // insert to database
        if (localStorage.getItem('userToken')) {
            // remove session
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userPassword');
            // get user
            const token = localStorage.getItem('userToken');
            const url = 'http://localhost:8000/api/customer/check';
            const res = await axios.get(url, { headers: { authorization: token } })

            const data = { senderId: res.data.user.id, receiverId: 1, message: messageRef.current.value, chat_at: Date.now(), sender: 0 };
            await axios.post('http://localhost:8000/api/chat', data);

            // add message to chat area
            setChats((pre) => [...pre, data]);

            // send message to socked server
            socket.emit('send_message', data);

        }
        else if (sessionStorage.getItem('userEmail')) {
            // remove token
            localStorage.removeItem('userToken');
            // get user
            const email = sessionStorage.getItem('userEmail');
            const url = 'http://localhost:8000/api/customer/email/' + email;
            const res = await axios.get(url);

            const data = { senderId: res.data.user[0].id, receiverId: 1, message: messageRef.current.value, chat_at: Date.now(), sender: 0 };
            await axios.post('http://localhost:8000/api/chat', data);

            // add message to chat area
            setChats((pre) => [...pre, data]);

            // send message to socked server
            socket.emit('send_message', data);

        }
        // clear box message
        messageRef.current.value = null;
    }

    return (
        <div className='fixed z-50 overflow-hidden bottom-[20px] right-[30px] w-[350px] h-[450px] shadow-xl bg-white rounded-lg border-solid border border-gray-300'>
            {/* header */}
            <div className='flex justify-between items-center border-solid border-b border-gray-300 py-2 px-4'>
                <div className="flex gap-4 items-center">
                    <img src={logo} alt="" className='w-[35px] h-[35px] object-cover ' />
                    <h1>{name}</h1>
                </div>
                <IoClose className='text-xl cursor-pointer' onClick={() => props.setOpenChat(false)} />
            </div>
            {/* chat area */}
            <div className="flex flex-col bg-body h-[335px] py-2 px-4 overflow-x-hidden overscroll-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-[#cfcfcf] scrollbar-thumb-rounded-xl">
                {
                    chats.length > 0 ? chats.map((item, index) => {
                        if (item.sender === 0)
                            return <div key={index} className="flex justify-end mt-3">
                                <div className='max-w-[240px] rounded-l-xl rounded-tr-xl bg-current shadow-sm px-2 py-1 break-words'>
                                    <p className='text-[14px] text-white'>{parse(item.message)}</p>
                                </div>
                            </div>
                        else
                            return <div key={index} className="flex justify-start items-end mt-3 gap-2">
                                <img src={logo} alt="" className='w-[40px] h-[40px] rounded-full object-cover bg-white' />
                                <div className='max-w-[240px] rounded-r-xl rounded-tl-xl bg-white shadow-sm px-2 py-1 break-words'>
                                    <p className='text-[14px] text-gray-700'>{parse(item.message)}</p>
                                </div>
                            </div>
                    }) :    
                    <p className='w-full h-full text-center flex justify-center items-center text-base'>No message are available. Once you send message they wil appear here.</p>
                }
                <div ref={messageEndRef} />
            </div>
            {/* input and send message */}
            <div className='w-full py-2 px-4 flex gap-[1px]'>
                <input onKeyDown={(e) => {if(e.key === 'Enter') sendMessage();}} ref={messageRef} placeholder='Type a message here..' type="text" className='w-full h-[40px] rounded-l-md border-gray-300 px-3 py-2 border-solid border focus:border-gray-300 focus:ring-gray-300 focus:ring-0 sm:text-sm' />
                <div onClick={sendMessage} className='w-[50px] h-[40px] rounded-r-md border-solid border border-gray-300 flex items-center justify-center cursor-pointer'>
                    <FaTelegramPlane className='w-[20px] h-[20px] ' />
                </div>
            </div>
        </div>
    )
}

export default Chat;