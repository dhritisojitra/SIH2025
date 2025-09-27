import React, { useState } from "react";
import { Search, ExternalLink, Book, Globe, Lightbulb, Star } from "lucide-react";

const resources = {
  "8-12": [
    {
      title: "Bal Bhavan Portal",
      link: "https://www.nationalbalbhavan.nic.in/",
      description:
        "Fun activities, creative learning, and stories for children managed by the National Bal Bhavan, India.",
      category: "Creative Learning",
      featured: true
    },
    {
      title: "Champs4Change (TERI)",
      link: "https://teriin.org",
      description:
        "Interactive environment education programs designed for school kids by TERI (The Energy and Resources Institute).",
      category: "Environment"
    },
    {
      title: "NCERT e-Pathshala",
      link: "https://epathshala.nic.in/",
      description:
        "Free e-books and interactive lessons from NCERT designed for Indian school children.",
      category: "Academic"
    },
    {
      title: "NASA Kids' Club",
      link: "https://www.nasa.gov/kidsclub/index.html",
      description: "Fun games and activities to learn about space and Earth.",
      category: "Science"
    },
    {
      title: "National Geographic Kids",
      link: "https://kids.nationalgeographic.com/",
      description: "Videos, quizzes, and facts about animals, science, and nature.",
      category: "Science",
      featured: true
    },
    {
      title: "BBC Bitesize Science",
      link: "https://www.bbc.co.uk/bitesize/subjects/z6svr82",
      description: "Easy-to-understand science lessons and interactive activities.",
      category: "Science"
    }
  ],
  "12-16": [
    {
      title: "Vigyan Prasar (Government of India)",
      link: "https://vigyanprasar.gov.in/",
      description:
        "Science communication platform with articles, videos, and experiments to promote scientific curiosity.",
      category: "Science",
      featured: true
    },
    {
      title: "TERI EduGreen",
      link: "https://edugreen.teri.res.in/",
      description:
        "A resource hub for environmental education with India-specific case studies and activities.",
      category: "Environment"
    },
    {
      title: "CBSE Academic Resources",
      link: "https://cbseacademic.nic.in/",
      description:
        "Subject-wise resources, projects, and guidelines for middle and high school students.",
      category: "Academic"
    },
    {
      title: "NASA Climate Kids",
      link: "https://climatekids.nasa.gov/",
      description: "Articles, games, and activities about climate change and solutions.",
      category: "Environment"
    },
    {
      title: "Khan Academy – Science",
      link: "https://www.khanacademy.org/science",
      description: "Free lessons in biology, physics, chemistry, and more.",
      category: "Academic",
      featured: true
    },
    {
      title: "Exploratorium – Science Snacks",
      link: "https://www.exploratorium.edu/snacks",
      description: "DIY science experiments you can try at home.",
      category: "Science"
    }
  ],
  "16+": [
    {
      title: "SWAYAM",
      link: "https://swayam.gov.in/",
      description:
        "Government of India's online education platform offering courses from top universities for free.",
      category: "Academic",
      featured: true
    },
    {
      title: "NPTEL",
      link: "https://nptel.ac.in/",
      description:
        "Technical and science-focused lectures by IITs and IISc, accessible for advanced learners.",
      category: "Academic"
    },
    {
      title: "India Environment Portal (Centre for Science and Environment)",
      link: "http://www.indiaenvironmentportal.org.in/",
      description:
        "Latest reports, research, and policies on environment and sustainability issues in India.",
      category: "Environment"
    },
    {
      title: "MOOC on Indian Knowledge Systems",
      link: "https://iks.iitgn.ac.in/",
      description:
        "Courses and resources exploring traditional Indian sciences, environment, and cultural heritage.",
      category: "Cultural"
    },
    {
      title: "MIT OpenCourseWare",
      link: "https://ocw.mit.edu/",
      description: "Free courses from MIT on science, technology, and more.",
      category: "Academic",
      featured: true
    },
    {
      title: "Coursera – Environmental Science",
      link: "https://www.coursera.org/browse/physical-science-and-engineering/environmental-science-and-sustainability",
      description: "Online courses about sustainability, climate, and the environment.",
      category: "Environment"
    },
    {
      title: "edX – Earth Sciences",
      link: "https://www.edx.org/learn/earth-sciences",
      description: "University-level resources on geology, climate, and ecosystems.",
      category: "Science"
    }
  ]
};

const categoryIcons = {
  "Academic": Book,
  "Science": Lightbulb,
  "Environment": Globe,
  "Creative Learning": Star,
  "Cultural": Star
};

const categoryColors = {
  "Academic": "bg-green-100 text-green-700",
  "Science": "bg-emerald-100 text-emerald-700",
  "Environment": "bg-teal-100 text-teal-700",
  "Creative Learning": "bg-lime-100 text-lime-700",
  "Cultural": "bg-green-200 text-green-800"
};

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All");

  const allCategories = ["All", ...new Set(
    Object.values(resources)
      .flat()
      .map(resource => resource.category)
  )];

  // ✅ Always include each age group, even if empty after filtering
  const filteredResources = Object.entries(resources).reduce((acc, [ageGroup, items]) => {
    const filtered = items.filter(resource => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
      const matchesAge = selectedAgeGroup === "All" || ageGroup === selectedAgeGroup;

      return matchesSearch && matchesCategory && matchesAge;
    });

    acc[ageGroup] = filtered;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-[#F0F8E8] p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-4 tracking-tight">
            Learning Resources
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Discover curated educational resources tailored for different age groups to enhance your learning journey
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 mb-12 border border-green-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-gray-800 min-w-[180px]"
            >
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Age Group Filter */}
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="px-6 py-4 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-800 min-w-[150px]"
            >
              <option value="All">All Ages</option>
              <option value="8-12">Age 8-12</option>
              <option value="12-16">Age 12-16</option>
              <option value="16+">Age 16+</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {Object.entries(filteredResources).map(([ageGroup, items]) => (
            <div key={ageGroup} className="space-y-6">
              {/* Age Group Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Age {ageGroup}</h2>
                <p className="text-green-100 text-sm">
                  {items.length} resource{items.length !== 1 ? 's' : ''} available
                </p>
              </div>

              {/* Resources List */}
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((resource, index) => {
                    const IconComponent = categoryIcons[resource.category] || Book;
                    return (
                      <div
                        key={index}
                        className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 overflow-hidden group hover:-translate-y-1 ${
                          resource.featured ? 'ring-2 ring-green-200' : ''
                        }`}
                      >
                        <div className="p-6">
                          {/* Resource Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                                <IconComponent className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                                  {resource.title}
                                  {resource.featured && (
                                    <Star className="inline w-4 h-4 ml-2 text-yellow-500 fill-current" />
                                  )}
                                </h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  categoryColors[resource.category]
                                }`}>
                                  {resource.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {resource.description}
                          </p>

                          {/* Visit Link */}
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-green-600 font-medium hover:text-green-700 transition-colors group-hover:underline"
                          >
                            <span>Visit Resource</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No resources match your filters.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
