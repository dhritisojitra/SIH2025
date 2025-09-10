import React, { useState } from 'react';
import { Leaf, Recycle, Zap, Droplets, TreePine, Globe, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react'; // Added social icons
import { Link } from "react-router-dom";
import EcoNavbar from '../components/NavBar'; // Assuming this path is correct

// SVG for the wooden spoon icon from the design
const WoodenSpoonIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#D4B996]">
        <path d="M35.4142 12.5858C37.3668 10.6332 37.3668 7.46738 35.4142 5.51472C33.4616 3.5621 30.2958 3.5621 28.3431 5.51472L18 15.8579L23.8579 21.7157L35.4142 12.5858Z" fill="currentColor" />
        <path d="M15.1716 18.6863L5.51472 28.3431C3.5621 30.2958 3.5621 33.4616 5.51472 35.4142C7.46738 37.3668 10.6332 37.3668 12.5858 35.4142L22.2426 25.7574L15.1716 18.6863Z" fill="#A0522D" />
        <path d="M21 24.5L15.5 19L19 15.5L24.5 21L21 24.5Z" fill="#D2B48C" />
    </svg>
);

// SVG for the mesh bag icon from the design
const MeshBagIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-700">
        <path d="M14 22C14 16.4772 18.4772 12 24 12C29.5228 12 34 16.4772 34 22" stroke="#5F6F52" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 22V32C14 35.3137 16.6863 38 20 38H28C31.3137 38 34 35.3137 34 32V22" stroke="#A9B8A5" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="26" x2="34" y2="26" stroke="#A9B8A5" strokeWidth="2" />
        <line x1="14" y1="30" x2="34" y2="30" stroke="#A9B8A5" strokeWidth="2" />
        <line x1="20" y1="22" x2="20" y2="38" stroke="#A9B8A5" strokeWidth="2" />
        <line x1="28" y1="22" x2="28" y2="38" stroke="#A9B8A5" strokeWidth="2" />
        <line x1="24" y1="22" x2="24" y2="38" stroke="#A9B8A5" strokeWidth="2" />
    </svg>
);

// Your existing Cards component, slightly restyled to fit the theme
const Cards = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const ecoCards = [
        { id: 1, title: "Eco Friendly", subtitle: "Sustainable Living", icon: <Leaf className="w-12 h-12" />, tip: "Did you know? Using a bamboo toothbrush can save 4.7 billion plastic toothbrushes from landfills annually! Make the switch today." },
        { id: 2, title: "Useful Items", subtitle: "Reuse & Repurpose", icon: <Recycle className="w-12 h-12" />, tip: "Transform glass jars into storage containers, planters, or lanterns. One jar can be reused hundreds of times and reduce waste significantly!" },
        { id: 3, title: "Energy Saving", subtitle: "Smart Consumption", icon: <Zap className="w-12 h-12" />, tip: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs. Switch and save money while protecting the planet!" },
        { id: 4, title: "Water Conservation", subtitle: "Every Drop Counts", icon: <Droplets className="w-12 h-12" />, tip: "A dripping faucet can waste over 3,000 gallons per year. Fix leaks immediately and install water-saving fixtures to conserve water." },
        { id: 5, title: "Green Living", subtitle: "Plant More Trees", icon: <TreePine className="w-12 h-12" />, tip: "One mature tree can absorb 48 pounds of CO2 per year and produce enough oxygen for two people! Plant a tree and breathe easier." },
        { id: 6, title: "Climate Action", subtitle: "Global Impact", icon: <Globe className="w-12 h-12" />, tip: "Recycling one aluminum can saves enough energy to power a TV for 3 hours. Small daily actions create massive environmental impact!" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoCards.map((card) => (
                <div
                    key={card.id}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <div
                        className="h-80 w-full rounded-2xl p-6 shadow-lg transition-all duration-500 transform relative overflow-hidden bg-[#FEFBF6]"
                        style={{
                            backgroundColor: hoveredCard === card.id ? '#6A7049' : '#FEFBF6',
                            transform: hoveredCard === card.id ? 'translateY(-8px)' : 'translateY(0)',
                            boxShadow: hoveredCard === card.id ? '0 10px 25px rgba(0, 0, 0, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        {hoveredCard === card.id ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-white">
                                <div className="text-6xl mb-4 animate-bounce">💡</div>
                                <h3 className="font-bold text-xl mb-2">Eco Tip</h3>
                                <p className="text-sm leading-relaxed opacity-90">{card.tip}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-[#4A6741]/10 text-[#4A6741]">
                                    {card.icon}
                                </div>
                                <h3 className="font-bold text-xl mb-2 text-[#4A6741]">{card.title}</h3>
                                <p className="text-gray-500 text-sm">{card.subtitle}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

};

// The main Hero Section component
export default function HeroSection() {
  return (
    <>
    <div className="min-h-screen bg-[#F5F5DC] font-sans">
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Top Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A6741] mb-3">Save planet together</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Where saving the planet is a game worth winning.
          </p>
        </div>

        {/* Popular Themes Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#4A6741]">Popular themes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link to="/resources">
            <div className="bg-[#FEFBF6] p-6 rounded-2xl shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-[#EAE7D6] p-3 rounded-full">
                <WoodenSpoonIcon />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#4A6741]">Resources</h3>
              </div>
            </div>
            </Link>
            <Link to="/roadmap">
            <div className="bg-[#FEFBF6] p-6 rounded-2xl shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
               <div className="bg-[#EAE7D6] p-3 rounded-full">
                <MeshBagIcon />
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#4A6741]">Road - Map</h3>
                 <p className="text-sm text-gray-500">Strat your journey</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
        
        {/* Zero Waste Banner */}
       <Link to="/story">
        <div className="bg-[#6A7049] rounded-2xl p-8 mb-12 text-center text-white flex items-center justify-center space-x-6">
          <Leaf className="w-10 h-10 opacity-70 transform -scale-x-100" />
          <h2 className="text-3xl font-bold tracking-wider">STORY TIME</h2>
          <Leaf className="w-10 h-10 opacity-70" />
        </div>
        </Link>

                    {/* Recycling Tips Section */}
                    <div className="mb-12"> {/* Added mb-12 for spacing before footer */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#4A6741]">Recycling tips</h2>
                            <button className="flex items-center text-sm font-medium text-[#6B8E23] hover:text-[#556B2F] transition-colors">
                                See all <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                        <Cards />
                    </div>
                </main>

                {/* Footer Section - New Two-Tiered Design */}
                <footer className="w-full">
                    {/* Top Tier: Social Icons and Navigation */}
                    <div className="bg-[#6A7049] text-[#FFFFF0] py-6">
                        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0"> {/* Centered on mobile */}
                            {/* Social Icons */}
                            <div className="flex space-x-6 mb-4 md:mb-0 md:mr-8"> {/* Added margin for spacing on larger screens */}
                                <a href="#" className="text-[#FFFFF0] hover:text-[#A9B8A5] transition-colors">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-[#FFFFF0] hover:text-[#A9B8A5] transition-colors">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-[#FFFFF0] hover:text-[#A9B8A5] transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-sm font-medium"> {/* Centered on mobile */}
                                <Link to="/" className="hover:underline text-gray-200">HOME</Link>
                                <Link to="/resources" className="hover:underline text-gray-200">RESOURCES</Link>
                                <Link to="/roadmap" className="hover:underline text-gray-200">ROADMAP</Link>
                                <Link to="/story" className="hover:underline text-gray-200">STORY</Link>
                                <Link to="#" className="hover:underline text-gray-200">CONTACT</Link>
                                <Link to="#" className="hover:underline text-gray-200">BLOG</Link>
                            </nav>
                        </div>
                    </div>

                    {/* Bottom Tier: Slogan and Copyright */}
                    <div className="bg-[#4A6741] text-[#D2B48C] py-3"> {/* Slightly darker green, different text color */}
                        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center text-xs"> {/* Removed sm:flex-row and justify-between */}
                            <div className="flex flex-col items-center mb-2"> {/* Changed to flex-col and items-center */}
                                <div className="flex items-center mb-1"> {/* Wrapper for Leaf and EcoConnect to keep them inline */}
                                    <Leaf className="w-8 h-8 mr-2 text-[#D2B48C]" /> {/* Added text color */}
                                    <span className="text-2xl font-bold">EcoConnect</span> {/* Moved EcoConnect here */}
                                </div>
                                <p className="text-sm text-gray-200 mt-1"> {/* Added mt-1 for spacing */}
                                    Join us in making the planet a greener place, one step at a time.
                                </p>
                            </div>
                            <p className="mt-2"> {/* Added mt-2 to push copyright to new line */}
                                © {new Date().getFullYear()} EcoConnect. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );

}