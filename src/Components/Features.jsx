import React from 'react';
import { FaUserPlus, FaUsers, FaCreditCard, FaHeadset } from 'react-icons/fa';

// Custom Tailwind color utility for the icons
const ICON_COLOR_CLASS = "text-[#224D41]";

const featuresData = [
    {
        icon: <FaUserPlus className={`w-10 h-10 ${ICON_COLOR_CLASS}`} />,
        title: "Post a job",
        description: "It's free and easy to post a job. Simply fill in a title and description."
    },
    {
        icon: <FaUsers className={`w-10 h-10 ${ICON_COLOR_CLASS}`} />,
        title: "Choose freelancers",
        description: "Browse a pool of freelancers and choose the right one for the job."
    },
    {
        icon: <FaCreditCard className={`w-10 h-10 ${ICON_COLOR_CLASS}`} />,
        title: "Pay safely",
        description: "Make secure payments and protect your transactions."
    },
    {
        icon: <FaHeadset className={`w-10 h-10 ${ICON_COLOR_CLASS}`} />,
        title: "We're here to help",
        description: "Need assistance? Our support team is available to help you."
    }
];

const FeatureCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center p-6 text-center">
        <div className="mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
);

const Features = () => {
    return (
        // Outermost container: Full width white background and top-left rounded corner.
        <div className="bg-white py-16 rounded-tl-[60px] overflow-hidden">
            {/* Inner container: Using Tailwind's container class for perfect alignment */}
            <div className="container mx-auto">
                <div className="mb-12 text-left">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Need something done?
                    </h2>
                    <p className="mt-2 text-base text-gray-500">
                        Most viewed and all-time top-selling services
                    </p>
                </div>
                {/* Responsive grid for the feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
