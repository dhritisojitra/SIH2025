import { Search, Menu, X, Leaf, User, BookOpen, TestTube } from 'lucide-react';
import { useState } from 'react';

export default function EcoNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  // Define theme colors for easy reuse
  const theme = {
    primary: 'bg-[#4A6741]',      // A deep, earthy green
    text: 'text-[#F5F5DC]',           // A warm, creamy beige for text
    accent: 'bg-[#6B8E23]',           // A slightly brighter olive for accents/hovers
    accentHover: 'bg-[#556B2F]',      // A darker olive for hover states
    inputBg: 'bg-[#F5F5DC]/90',       // Semi-transparent beige for input fields
    inputFocus: 'focus:bg-[#F5F5DC]',
    placeholder: 'placeholder-green-900/60',
    // New: Lighter color for the leaf icon itself
    leafIconColor: 'text-[#D4EDC1]', // A soft, light green for the leaf
    // New: Slightly different background for the leaf icon circle
    leafBg: 'bg-[#6F8A67]',          // A medium, muted green for the icon's background circle
    leafBgHover: 'bg-[#8CA282]',     // A slightly lighter hover for the icon's background
  };

  return (
    <nav className={`${theme.primary} shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className={`${theme.leafBg} group-hover:${theme.leafBgHover} p-2 rounded-full backdrop-blur-sm transition-all duration-300`}>
              <Leaf className={`h-6 w-6 ${theme.leafIconColor}`} />
            </div>
            <span className={`${theme.text} font-bold text-xl hidden sm:block group-hover:scale-105 transition-transform duration-300`}>
              EcoSave
            </span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for eco tips, resources..."
                className={`w-full py-2.5 pl-4 pr-12 rounded-full ${theme.inputBg} backdrop-blur-sm border-0 ${theme.inputFocus} outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 ${theme.placeholder} text-green-900`}
              />
              <button
                onClick={handleSearch}
                className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 ${theme.accent} hover:${theme.accentHover} ${theme.text} p-2 rounded-full transition-all duration-300 hover:scale-110`}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem icon={BookOpen} text="Resources" theme={theme} />
            <NavItem icon={TestTube} text="Test" theme={theme} />
            <UserProfile theme={theme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${theme.text} hover:bg-black/10 p-2 rounded-full transition-colors duration-300`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative px-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for eco tips..."
                className={`w-full py-3 pl-4 pr-12 rounded-full ${theme.inputBg} backdrop-blur-sm border-0 ${theme.inputFocus} outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 ${theme.placeholder} text-green-900`}
              />
              <button
                onClick={handleSearch}
                className={`absolute right-3.5 top-1/2 transform -translate-y-1/2 ${theme.accent} hover:${theme.accentHover} ${theme.text} p-2 rounded-full transition-all duration-300`}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            
            {/* Mobile Navigation Items */}
            <div className="space-y-2 px-2">
              <MobileNavItem icon={BookOpen} text="Resources" theme={theme} />
              <MobileNavItem icon={TestTube} text="Test" theme={theme} />
              <MobileNavItem icon={User} text="Profile" theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Reusable Components (passing theme for consistency)
function NavItem({ icon: Icon, text, theme }) {
  return (
    <button className={`flex items-center space-x-2 px-4 py-2 ${theme.text} hover:bg-black/10 rounded-full transition-all duration-300 group`}>
      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
      <span className="font-medium">{text}</span>
    </button>
  );
}

function MobileNavItem({ icon: Icon, text, theme }) {
  return (
    <button className={`flex items-center space-x-3 w-full px-4 py-3 ${theme.text} hover:bg-black/10 rounded-lg transition-all duration-300`}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{text}</span>
    </button>
  );
}

function UserProfile({ theme }) {
  return (
    <button className={`ml-2 bg-black/10 hover:bg-black/20 p-2.5 rounded-full transition-all duration-300 group`}>
      <User className={`h-5 w-5 ${theme.text} group-hover:scale-110 transition-transform duration-300`} />
    </button>
  );
}