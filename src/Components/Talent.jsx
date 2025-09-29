import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';


const Talent = () => {
    const talentFeatures = [
        "The best for every budget",
        "Quality work, done quickly",
        "Protected payments, every time",
        "24/7 support"
    ];

    const talentImage = "https://images.unsplash.com/photo-1573496800440-5c9c48a8d0f0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <section className="bg-white text-white py-20 overflow-hidden">
            <div className="container mx-auto">
                <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
                    <div className="py-10">
                        <p className="text-base font-semibold text-green-400 uppercase mb-2">
                            For clients.
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 text-black">
                            Find talent your way
                        </h2>
                        <p className="text-lg text-black mb-8 max-w-md text-black">
                            Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
                        </p>
                        <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-green-400 transition duration-150">
                            <FaEnvelope className="w-5 h-5 text-gray-900" />
                            <span>Contact Us</span>
                        </button>
                    </div>
                    <div className="relative mt-10 lg:mt-0">
                        <div className="rounded-xl overflow-hidden h-[450px] shadow-2xl">
                            <img
                                src={talentImage}
                                alt="Woman working on laptop with talent features"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/174a44/ffffff?text=Image+Placeholder"; }}
                            />
                        </div>

                        <div className="absolute top-1/2 left-1/2 lg:-left-16 transform -translate-y-1/2 -translate-x-1/2 lg:translate-x-0 p-8 rounded-xl shadow-2xl bg-[#224D41] w-full max-w-xs md:max-w-sm transition-all duration-300">
                            <ul className="space-y-4">
                                {talentFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-3 text-white">
                                        <FaCheck className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Talent;
