import { Leaf, Facebook, Instagram, Twitter } from 'lucide-react'; // Added social icons
import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <>
            <div>
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
                                    <span className="text-2xl font-bold">EcoQuest</span> {/* Moved EcoConnect here */}
                                </div>
                                <p className="text-sm text-gray-200 mt-1"> {/* Added mt-1 for spacing */}
                                    Join us in making the planet a greener place, one step at a time.
                                </p>
                            </div>
                            <p className="mt-2"> {/* Added mt-2 to push copyright to new line */}
                                © {new Date().getFullYear()} EcoQuest. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}