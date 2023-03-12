import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import parse from 'html-react-parser'
import { io } from 'socket.io-client'

const Chat = () => {

    const [customer, setCustomer] = useState([]);
    const [click, setClick] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [imageChat, setImageChat] = useState('');
    const [nameChat, setNameChat] = useState('');
    const [chats, setChats] = useState([]);
    const messageRef = useRef();
    const messageEndRef = useRef();

    /* ----------- socked io --------------*/
    const socket = io('http://localhost:8000');

    useEffect(() => {
        socket.on('connect', () => {
            const data = { isAdmin: 1, userId: 1, sockedId: socket.id };
            socket.emit("addUsers", data);
        });
    }, []);

    useEffect(() => {
        socket.on('recv_message', data => {
            setChats((pre) => [...pre, data]);
        })
    }, [socket]);

    const sendMessage = async () => {
        if (messageRef.current.value === "" || messageRef.current.value === null) return;

        // insert to database
        const data = { senderId: 1, receiverId: selectedId, message: messageRef.current.value, chat_at: Date.now(), sender: 1 };
        await axios.post('http://localhost:8000/api/chat', data);

        // add message to chat area
        setChats((pre) => [...pre, data]);

        // send message to socket server
        socket.emit('send_message', data);

        // clear box message
        messageRef.current.value = null;
    }

    /* ----------- application --------------*/
    const getCustomer = async () => {
        const res = await axios.get('http://localhost:8000/api/customer');
        setCustomer(res.data.list);
    }

    const getMessage = async (selectId) => {
        setClick(true);
        // get message from database
        const res = await axios.get(`http://localhost:8000/api/chat/${1}/${selectId}`);
        const chat = res.data.list;
        setChats(chat);
    }

    useEffect(() => {
        getCustomer();
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [chats]);

    return (
        <div className='h-[91vh] w-full bg-white pl-0'>
            <div className="flex flex-row w-full h-full">
                <div className="flex-[2] flex flex-col h-full border-solid border-r border-gray-300">
                    <h1 className='text-center pl-2 text-xl font-bold text-black_500 pt-3 pb-4'>Chats</h1>
                    <div className='h-full overflow-x-hidden overscroll-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-[#cfcfcf] scrollbar-thumb-rounded-xl'>
                        {
                            customer.map((item, index) => (
                                <div onClick={() => { getMessage(item.id); setSelectedId(item.id); setImageChat(item.image); setNameChat(item.name) }} key={index} className={`${selectedId === item.id ? 'bg-body' : ''} flex gap-4 items-center cursor-pointer hover:bg-body py-[6px] pl-2`}>
                                    <img src={item.image} alt="" className='w-[40px] h-[40px] rounded-full object-cover ' />
                                    <h1>{item.name}</h1>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className="flex-[5] h-full">
                    {
                        click ? <div className='h-full flex flex-col'>
                            {/* header */}
                            <div className='flex justify-between items-center border-solid border-b border-gray-300 py-2 px-4'>
                                <div className="flex gap-4 items-center">
                                    <img src={imageChat} alt="" className='w-[40px] h-[40px] rounded-full object-cover ' />
                                    <h1>{nameChat}</h1>
                                </div>
                            </div>
                            {/* chat area */}
                            <div className="flex flex-col bg-body h-full py-2 px-4 overflow-x-hidden overscroll-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-track-rounded-xl scrollbar-thumb-[#cfcfcf] scrollbar-thumb-rounded-xl">
                                {
                                    chats.length > 0 && chats.some(ch => ch.senderId === selectedId || ch.sender === 1) ? chats.map((item, index) => {
                                        if (item.senderId === selectedId || item.sender === 1) {
                                            if (item.sender === 1)
                                                return <div key={index} className="flex justify-end mt-3">
                                                    <div className='max-w-[240px] rounded-l-xl rounded-tr-xl bg-current shadow-sm px-2 py-1 break-words'>
                                                        <p className='text-[14px] text-white'>{parse(item.message)}</p>
                                                    </div>
                                                </div>
                                            else
                                                return <div key={index} className="flex justify-start items-end mt-3 gap-2">
                                                    <img src={imageChat} alt="" className='w-[40px] h-[40px] rounded-full object-cover border-solid border border-gray-300' />
                                                    <div className='max-w-[240px] rounded-r-xl rounded-tl-xl bg-white shadow-sm px-2 py-1 break-words'>
                                                        <p className='text-[14px] text-gray-700'>{parse(item.message)}</p>
                                                    </div>
                                                </div>
                                        }
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
                        </div> :
                            <p className='bg-body w-full h-full text-center flex justify-center items-center text-base'>No message are available. Once you send message they wil appear here.</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default Chat;