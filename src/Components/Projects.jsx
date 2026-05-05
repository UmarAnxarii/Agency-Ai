import React from 'react'
import assets from '../assets/assets'

const Projects = () => {
  const projects = [
    {
      title: "Dashboard Management",
      image: assets.work_dashboard_management,
      description: "An optimized AI-driven dashboard for efficient business data management and real-time analytics."
    },
    {
      title: "Fitness App",
      image: assets.work_fitness_app,
      description: "A personalized fitness tracking application helping users reach their health goals with smart coaching."
    },
    {
      title: "Mobile App",
      image: assets.work_mobile_app,
      description: "Next-generation mobile applications designed for high performance and seamless user engagement."
    }
  ]

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Our Featured Work</h2>
          <p className="text-gray-600 dark:text-gray-400">Discover how we help businesses grow with custom digital solutions and AI tools.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent dark:border-gray-700">
              <img src={item.image} alt={item.title} className="w-full h-55 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
                <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">View Project &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects