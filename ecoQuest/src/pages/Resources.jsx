import React from "react";

const resources = {
  "8-12": [
    {
      title: "Bal Bhavan Portal",
      link: "https://www.nationalbalbhavan.nic.in/",
      description:
        "Fun activities, creative learning, and stories for children managed by the National Bal Bhavan, India."
    },
    {
      title: "Champs4Change (TERI)",
      link: "https://teriin.org",
      description:
        "Interactive environment education programs designed for school kids by TERI (The Energy and Resources Institute)."
    },
    {
      title: "NCERT e-Pathshala",
      link: "https://epathshala.nic.in/",
      description:
        "Free e-books and interactive lessons from NCERT designed for Indian school children."
    },
        {
      title: "NASA Kids’ Club",
      link: "https://www.nasa.gov/kidsclub/index.html",
      description: "Fun games and activities to learn about space and Earth."
    },
    {
      title: "National Geographic Kids",
      link: "https://kids.nationalgeographic.com/",
      description: "Videos, quizzes, and facts about animals, science, and nature."
    },
    {
      title: "BBC Bitesize Science",
      link: "https://www.bbc.co.uk/bitesize/subjects/z6svr82",
      description: "Easy-to-understand science lessons and interactive activities."
    }
  ],
  "12-16": [
    {
      title: "Vigyan Prasar (Government of India)",
      link: "https://vigyanprasar.gov.in/",
      description:
        "Science communication platform with articles, videos, and experiments to promote scientific curiosity."
    },
    {
      title: "TERI EduGreen",
      link: "https://edugreen.teri.res.in/",
      description:
        "A resource hub for environmental education with India-specific case studies and activities."
    },
    {
      title: "CBSE Academic Resources",
      link: "https://cbseacademic.nic.in/",
      description:
        "Subject-wise resources, projects, and guidelines for middle and high school students."
    },
        {
      title: "NASA Climate Kids",
      link: "https://climatekids.nasa.gov/",
      description: "Articles, games, and activities about climate change and solutions."
    },
    {
      title: "Khan Academy – Science",
      link: "https://www.khanacademy.org/science",
      description: "Free lessons in biology, physics, chemistry, and more."
    },
    {
      title: "Exploratorium – Science Snacks",
      link: "https://www.exploratorium.edu/snacks",
      description: "DIY science experiments you can try at home."
    }
  ],
  "16+": [
    {
      title: "SWAYAM",
      link: "https://swayam.gov.in/",
      description:
        "Government of India’s online education platform offering courses from top universities for free."
    },
    {
      title: "NPTEL",
      link: "https://nptel.ac.in/",
      description:
        "Technical and science-focused lectures by IITs and IISc, accessible for advanced learners."
    },
    {
      title: "India Environment Portal (Centre for Science and Environment)",
      link: "http://www.indiaenvironmentportal.org.in/",
      description:
        "Latest reports, research, and policies on environment and sustainability issues in India."
    },
    {
      title: "MOOC on Indian Knowledge Systems",
      link: "https://iks.iitgn.ac.in/",
      description:
        "Courses and resources exploring traditional Indian sciences, environment, and cultural heritage."
    },
        {
      title: "MIT OpenCourseWare",
      link: "https://ocw.mit.edu/",
      description: "Free courses from MIT on science, technology, and more."
    },
    {
      title: "Coursera – Environmental Science",
      link: "https://www.coursera.org/browse/physical-science-and-engineering/environmental-science-and-sustainability",
      description: "Online courses about sustainability, climate, and the environment."
    },
    {
      title: "edX – Earth Sciences",
      link: "https://www.edx.org/learn/earth-sciences",
      description: "University-level resources on geology, climate, and ecosystems."
    }
  ]
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] p-6">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
        Resources
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(resources).map(([ageGroup, items]) => (
          <div
            key={ageGroup}
            className="bg-white rounded-2xl shadow-md p-6 border border-green-200"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Age {ageGroup}
            </h2>
            <ul className="space-y-4">
              {items.map((res, index) => (
                <li key={index}>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-medium hover:underline"
                  >
                    {res.title}
                  </a>
                  <p className="text-gray-600 text-sm">{res.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
