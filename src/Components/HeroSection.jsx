import React from 'react';
import { LuSearch } from 'react-icons/lu';  // Import React Icon for Search

const HeroSection = () => {
  // Placeholder image for the right side
  const placeholderImage = "https://demoapus1.com/freeio/wp-content/uploads/2022/09/h12.png";
  
  // Stats data
  const stats = [
    { value: '960M', label: 'Total Freelancer' },
    { value: '850M', label: 'Positive Review' },
    { value: '98M', label: 'Order received' },
    { value: '250M', label: 'Projects Completed' },
  ];

  // Card data (Floating elements on the image)
  const floatingCards = [
    {
      title: 'Proof of quality',
      description: 'Lorem Ipsum Amet',
      icon: '🧠',
      top: 'lg:top-1/4',
      left: 'lg:left-0',
      bg: 'bg-white',
    },
    {
      title: 'Safe and secure',
      description: 'Lorem Ipsum Dolor Amet',
      icon: '🛡️',
      top: 'lg:bottom-1/4',
      right: 'lg:right-0',
      bg: 'bg-white',
    },
  ];

  // Dummy user images for the professional count
  const dummyUsers = [
    "https://placehold.co/40x40/f87171/ffffff?text=A",
    "https://placehold.co/40x40/fb923c/ffffff?text=B",
    "https://placehold.co/40x40/facc15/ffffff?text=C",
    "https://placehold.co/40x40/4ade80/ffffff?text=D",
  ];

  const FloatingCard = ({ title, description, icon, top, left, right, bg }) => (
    <div className={`absolute p-5 rounded-xl shadow-2xl w-full max-w-xs transition-all duration-300 transform hover:scale-[1.01] ${top} ${left} ${right} ${bg} hidden lg:block`}>
      <div className="flex items-start space-x-3">
        <div className="p-2  text-2xl leading-none">
          {icon}
        </div>
        <div>
          <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-[#1a3a37] text-white pt-10 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Column: Content, Search, and Stats --- */}
          <div className="py-10 lg:py-20">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Find the perfect <span className="text-yellow-300">freelance services</span> for your business
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-10 max-w-md">
              Work with talented people at the most affordable price to get the most out of your time and cost.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-gray-700 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <p className="text-3xl font-extrabold text-yellow-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* --- Right Column: Image and Floating Cards --- */}
          <div className="relative h-[450px] lg:h-[650px] mt-10 lg:mt-0">
            <div>
              <img 
                src={placeholderImage} 
                alt="Professionals working on their tasks" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>

            {/* Floating Cards (Desktop only) */}
            {floatingCards.map((card, index) => (
              <FloatingCard key={index} {...card} />
            ))}
            
            {/* Professional Count Banner */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 bg-white rounded-full shadow-2xl flex items-center space-x-3">
              <div className="flex -space-x-2">
                {dummyUsers.map((url, index) => (
                  <img 
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                    src={url} 
                    alt={`User ${index + 1}`} 
                  />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 text-xs font-bold flex items-center justify-center text-gray-700">
                  +5M
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                58M+ Professionals
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
