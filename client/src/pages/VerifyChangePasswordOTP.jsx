import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Navigate, useLocation } from "react-router-dom"
import React from "react"
import { toast, Slide } from 'react-toastify';

const VerifyChangePasswordOTP = () => {

    const [timerCount, setTimer] = useState(60);
    const [disable, setDisable] = useState(true);
    const location = useLocation();
    const id = location.state?.id;
    const email = location.state?.email;
    const password = location.state?.password;
    const navigate = useNavigate();

    const num1 = useRef('');
    const num2 = useRef('');
    const num3 = useRef('');
    const num4 = useRef('');

    const verifyEmail = async () => {
        if (num1.current.value === '' && num2.current.value === '' && num3.current.value === '' && num4.current.value === '')
            return;
        const OTP_INPUT = num1.current.value + num2.current.value + num3.current.value + num4.current.value;
        const OTP = sessionStorage.getItem("OTP") || "";

        if (OTP === OTP_INPUT ) {
            // update database
            await axios.put('http://localhost:8000/api/customer/password/' + id, {password});
            toast.success('Change password successfully', {
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
            sessionStorage.removeItem("OTP");
            navigate('/login');
        }
        else {
            toast.warn('Incorrect OTP', {
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
        }
    }

    const expired = async () => {
        setDisable(false);
        sessionStorage.removeItem("OTP");
        toast.info('OTP was expired', {
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
    }

    const resendOTP = async () => {
        if(disable) return;
        num1.current.value = num2.current.value = num3.current.value = num4.current.value = null
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        await axios.post('http://localhost:8000/api/customer/sendotp', {email, OTP});
        sessionStorage.setItem("OTP", OTP);
        setDisable(true); setTimer(60);
    }

    useEffect(() => {
       // if (!email) { navigate('/login'); return; }
        let interval = setInterval(() => {
          setTimer((lastTimerCount) => {
            lastTimerCount == 1 && clearInterval(interval);
            if (lastTimerCount == 1) expired();
            if (lastTimerCount <= 0) return lastTimerCount;
            return lastTimerCount - 1;
          });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
      }, [disable]);

    return (
        <>
            <section className={`bg-gray-50 h-screen bg-no-repeat bg-opacity-0 bg-[url('./src/assets/images/bg.png')]`} style={{ backgroundSize: "100% 100%" }}>
                <div className="bg-black bg-opacity-20 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex flex-col items-center justify-center text-center space-y-2">
                                <div className="font-semibold text-3xl">
                                    <p>Email Verification</p>
                                </div>
                                <div className="flex flex-row text-sm font-medium text-gray-400">
                                    <p>We have sent a code to your email {email ? email : ''}</p>
                                </div>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        <div className="w-16 h-16 ">
                                            <input ref={num1} maxLength={1} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none input text-xl" type="text" name="" id="" />
                                        </div>
                                        <div className="w-16 h-16 ">
                                            <input ref={num2} maxLength={1} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none input text-xl" type="text" name="" id="" />
                                        </div>
                                        <div className="w-16 h-16 ">
                                            <input ref={num3} maxLength={1} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none input text-xl" type="text" name="" id="" />
                                        </div>
                                        <div className="w-16 h-16 ">
                                            <input ref={num4} maxLength={1} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none input text-xl" type="text" name="" id="" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button onClick={verifyEmail} className="flex flex-row items-center justify-center text-center w-full border rounded-lg outline-none py-3 bg-primary border-none text-white text-base shadow-sm">
                                                Verify Account
                                            </button>
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p> <span onClick={resendOTP} className={`${disable ? "": "cursor-pointer hover:underline"} flex flex-row items-center text-primary`} target="_blank" rel="noopener noreferrer">{disable ? `OTP expired in ${timerCount}s` : "Resend OTP"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VerifyChangePasswordOTP;