import React, { useEffect, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const Paypal = (props) => {

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('carts'));
    const data = props.data;
    const [user, setUser] = useState({ id: 0, image: '', name: '' });
    const [isUser, setIsUser] = useState(false);
    const [count, setCount, carts, setCarts] = useOutletContext();

    const getUsers = async () => {

        if (localStorage.getItem('userToken')) {
            // remove session
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userPassword');
            // get user
            const token = localStorage.getItem('userToken');
            const url = 'http://localhost:8000/api/customer/check';
            const res = await axios.get(url, { headers: { authorization: token } })
            setUser(res.data.user); setIsUser(true);
            return;
        }
        else if (sessionStorage.getItem('userEmail')) {
            // remove token
            localStorage.removeItem('userToken');
            // get user
            const email = sessionStorage.getItem('userEmail');
            const url = 'http://localhost:8000/api/customer/email/' + email;
            const res = await axios.get(url);
            setUser(res.data.user[0]); setIsUser(true);
            return;
        }
        setIsUser(false);
    }

    const sendMessageTelegram = async (id) => {
        let text = `<b>Summary Order #${id}</b>` + '\n\n';
        for (let index = 0; index < cart.products.length; index++) {
            const product = cart.products[index];
            text += (index + 1) + ". " + product.name + "      x" + product.qty + "      $" + product.sale_price + "\n";
        }
        text += "-----------------------------------------" + "\n";
        text += "subtotal:              $" + cart.subtotal + "\n";
        text += "discount:             $" + cart.discount_price + "\n";
        text += "total:                     $" + cart.total + "\n";
        await axios.post("http://localhost:8000/api/telegram", { text: text });
    }

    const clearStock = async () => {
        const cus_id = user.id;

        const res = await axios.post('http://localhost:8000/api/order', {
            cus_id: cus_id,
            payment_method: 'Paypal',
            fullname: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address1,
            status: 'Panding',
            total: cart.total,
        });

        const o_id = res.data.order_id;
        // send message telegram
        sendMessageTelegram(o_id);
        // clear stock
        let message = `<div className='w-[224px]'><p className='text-[16px] font-semibold mb-3'>Summary Order #${o_id}</p>`;

        for (let index = 0; index < cart.products.length; index++) {
            const product = cart.products[index];
            const url1 = 'http://localhost:8000/api/product/clear/' + product.id;
            const qty = product.qty;
            const res1 = await axios.put(url1, { qty: qty });

            const url2 = 'http://localhost:8000/api/order/details';
            await axios.post(url2, { o_id: o_id, p_id: product.id, qty: product.qty });

            // store message
            message += `<div className="flex justify-between items-center w-full mt-2">
                <div className="flex gap-[2px] items-center">
                    <img src="${product.image}" alt="" className='w-[30px] h-[30px] object-cover' />
                    <p className='w-[120px] truncate text-[14px]'>${product.name}</p>
                </div>
                <p className='text-[14px]'>x${product.qty}</p>
                <p className='text-[14px]'>${product.sale_price}$</p>
            </div>`;
        }
        message += `<div className='flex justify-between items-center mt-2 pt-2 border-t border-dashed border-gray-300'>
            <p className='text-[14px] font-semibold'>Subtotal</p>
            <p className='text-[14px]'>${cart.subtotal}$</p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-[14px] font-semibold'>Discount</p>
                <p className='text-[14px] text-red-500'>-${cart.discount_price}$</p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-[14px] font-semibold'>Total</p>
                <p className='text-[14px]'>${cart.total}$</p>
            </div>
        </div>`;
        // insert to chat table
        const chat = {
            senderId: 1,
            receiverId: cus_id,
            message: message,
            sender: 1
        }
        await axios.post('http://localhost:8000/api/chat', chat);

        // set to default
        localStorage.removeItem('carts');
        setCarts({ products: [], subtotal: 0, discount_price: 0, total: 0 });
        setCount(0);
    }

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: cart.total,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then(() => {
            clearStock();
            navigate('/');
            //  window.location.reload(false);
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="checkout">
                {isPending ? <p>LOADING...</p> : (
                    <>
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default Paypal