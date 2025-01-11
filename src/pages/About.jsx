import React from 'react';
import { FaBrain } from 'react-icons/fa';
import { FiTarget, FiTrendingUp, FiShield } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiTarget />,
      title: 'Smart Analysis',
      description: 'Our AI algorithms provide detailed insights into content creation'
    },
    {
      icon: <FaBrain />,
      title: 'AI-Powered Learning',
      description: 'Advanced machine learning models that understand and analyze content'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Pattern Recognition',
      description: 'Identify trends and patterns'
    },
    {
      icon: <FiShield />,
      title: 'Comprehensive Coverage',
      description: 'Complete analysis of content cration'
    }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold mb-6">About Us</h1>
              <p className="text-lg mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-lg mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/about.png"
                alt="About BrainFox" 
                className="w-full max-w-lg mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-200 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-4xl font-bold mb-4 text-center">Our Mission</h2>
              <p className="text-lg text-center max-w-3xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;