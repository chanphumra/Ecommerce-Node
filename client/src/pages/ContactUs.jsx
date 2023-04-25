import React from 'react'

const ContactUs = () => {
    return (
        <div class="mycontainer h-[85vh]">
        <div class="h-full m-auto flex flex-col items-center justify-center">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Contact for get more information
                    </h1>
                    <div class="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input type="text" name="name" id="name"
                                class="border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                placeholder="yourname" required />
                        </div>
                        <div>
                            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="email" name="email" id="email"
                                class="border border-solid border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                placeholder="example@gmail.com" required />
                        </div>
                        <div>
                            <label htmlFor="message" class="block mb-2 text-sm font-medium text-gray-900">Message</label>
                            <textarea name="" id="message" placeholder='Write message here...'
                                class='text-sm h-[200px] input w-full resize-none'></textarea>
                        </div>
                        <button class="w-full text-white bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Message</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ContactUs