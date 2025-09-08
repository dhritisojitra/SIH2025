import React, { useState } from 'react';
import { Leaf, Recycle, Zap, Droplets, TreePine, Globe } from 'lucide-react';

const Cards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const ecoCards = [
    {
      id: 1,
      title: "Eco Friendly",
      subtitle: "Sustainable Living",
      icon: <Leaf className="w-12 h-12" />,
      tip: "Did you know? Using a bamboo toothbrush can save 4.7 billion plastic toothbrushes from landfills annually! Make the switch today."
    },
    {
      id: 2,
      title: "Useful Items",
      subtitle: "Reuse & Repurpose",
      icon: <Recycle className="w-12 h-12" />,
      tip: "Transform glass jars into storage containers, planters, or lanterns. One jar can be reused hundreds of times and reduce waste significantly!"
    },
    {
      id: 3,
      title: "Energy Saving",
      subtitle: "Smart Consumption",
      icon: <Zap className="w-12 h-12" />,
      tip: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs. Switch and save money while protecting the planet!"
    },
    {
      id: 4,
      title: "Water Conservation",
      subtitle: "Every Drop Counts",
      icon: <Droplets className="w-12 h-12" />,
      tip: "A dripping faucet can waste over 3,000 gallons per year. Fix leaks immediately and install water-saving fixtures to conserve water."
    },
    {
      id: 5,
      title: "Green Living",
      subtitle: "Plant More Trees",
      icon: <TreePine className="w-12 h-12" />,
      tip: "One mature tree can absorb 48 pounds of CO2 per year and produce enough oxygen for two people! Plant a tree and breathe easier."
    },
    {
      id: 6,
      title: "Climate Action",
      subtitle: "Global Impact",
      icon: <Globe className="w-12 h-12" />,
      tip: "Recycling one aluminum can saves enough energy to power a TV for 3 hours. Small daily actions create massive environmental impact!"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Recyclable Tips
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ecoCards.map((card) => (
            <div
              key={card.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className="h-80 w-full rounded-2xl p-6 shadow-lg transition-all duration-500 transform relative overflow-hidden"
                style={{
                  backgroundColor: hoveredCard === card.id ? '#6A7049' : '#FFFFF0',
                  transform: hoveredCard === card.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === card.id ? '0 20px 40px rgba(106, 73, 112, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                {hoveredCard === card.id ? (
                  // Hover Content - Tip
                  <div className="flex flex-col items-center justify-center h-full text-center text-white">
                    <div className="text-6xl mb-6 animate-bounce">💡</div>
                    <h3 className="font-bold text-xl mb-4">Eco Tip</h3>
                    <p className="text-sm leading-relaxed opacity-90">
                      {card.tip}
                    </p>
                  </div>
                ) : (
                  // Default Content
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div 
                      className="w-20 h-20 mb-6 rounded-full flex items-center justify-center text-white" // Added text-white for icon color
                      style={{backgroundColor: '#6A7049'}} // Removed opacity: 0.1 and set background color directly
                    >
                      {card.icon} {/* Moved icon here */}
                    </div>
                    
                    <h3 
                      className="font-bold text-xl mb-3"
                      style={{color: '#6A7049'}}
                    >
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6">
                      {card.subtitle}
                    </p>
                    
                    {/* Removed the old icon div from here */}
                  </div>
                )}

                {/* Decorative background element */}
                <div 
                  className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full transition-opacity duration-500"
                  style={{
                    backgroundColor: hoveredCard === card.id ? 'rgba(255, 255, 255, 0.1)' : 'rgba(106, 73, 112, 0.05)',
                    opacity: hoveredCard === card.id ? 1 : 0.5
                  }}
                />
                
                <div 
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full transition-opacity duration-500"
                  style={{
                    backgroundColor: hoveredCard === card.id ? 'rgba(255, 255, 255, 0.1)' : 'rgba(106, 73, 112, 0.05)',
                    opacity: hoveredCard === card.id ? 1 : 0.3
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;