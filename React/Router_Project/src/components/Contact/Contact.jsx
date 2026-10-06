import React, { useState } from 'react'

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        e.target.reset();
    }

    return (
        <div className="py-16 bg-white">
            <div className="max-w-xl mx-auto px-6 text-left">
                <h1 className="text-3xl sm:text-4xl text-gray-900 font-extrabold">Get in touch</h1>
                <p className="mt-2 text-gray-600">Fill in the form and I'll get back to you.</p>

                {submitted && (
                    <p className="mt-6 p-3 rounded-lg bg-green-100 text-green-800">
                        Thanks! Your message has been sent.
                    </p>
                )}

                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows="4"
                        required
                        className="py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition ease-in-out duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
