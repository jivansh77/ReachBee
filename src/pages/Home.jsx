import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiCpu, FiTrendingUp, FiShield } from 'react-icons/fi';
import useTypewriter from '../hooks/useTypewriter';

const Home = () => {
  const titleText = useTypewriter([
    "Lorem Ipsum Dolor",
    "Sit Amet Consectetur",
    "Adipiscing Elit",
    "Sed Do Eiusmod"
  ], 100, 50, 3000);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    { 
      icon: <FiFileText />, 
      title: 'Feature One', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' 
    },
    { 
      icon: <FiCpu />, 
      title: 'Feature Two', 
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore' 
    },
    { 
      icon: <FiTrendingUp />, 
      title: 'Feature Three', 
      description: 'Ut enim ad minim veniam, quis nostrud exercitation' 
    },
    { 
      icon: <FiShield />, 
      title: 'Feature Four', 
      description: 'Duis aute irure dolor in reprehenderit in voluptate' 
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Professional',
      image: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.'
    },
    {
      name: 'Jane Smith',
      role: 'Manager',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    },
    {
      name: 'Alice Johnson',
      role: 'Director',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.'
    }
  ];

  const faqs = [
    {
      question: 'Lorem ipsum dolor sit amet?',
      answer: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      question: 'Ut enim ad minim veniam?',
      answer: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      question: 'Duis aute irure dolor?',
      answer: 'In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      question: 'Excepteur sint occaecat?',
      answer: 'Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{titleText}
              <span className="animate-blink">|</span>
            </h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <Link to="/documents" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Ace Your Next Exam</h2>
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

      {/* Testimonials Section */}
      <section className="py-20 bg-base-200">
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-[230%] animate-scroll hover:pause">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-1/6 flex-shrink-0 px-4"
                >
                  <div className="card bg-base-100 shadow-xl h-full">
                    <div className="card-body items-center text-center">
                      <div className="avatar mb-4">
                        <div className="w-24 rounded-full">
                          <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                      </div>
                      <p className="mb-4">{testimonial.content}</p>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features That Set Us Apart Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features That Set Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Advanced AI Technology</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>State-of-the-art ML models for content creation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>95% accuracy in pattern recognition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Real-time processing and analysis</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Comprehensive Analysis</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Detailed distribution reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Historical analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Similarity detection between content</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Summary */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to dive into your documents?</h2>
          <p className="text-xl mb-4 text-sm">Get started for free today</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Basic', 'Pro', 'Enterprise'].map((plan) => (
              <div key={plan} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="text-2xl font-bold">{plan}</h3>
                  <div className="text-3xl font-bold my-4">
                    {plan === 'Enterprise' ? 'Custom' : `₹${plan === 'Basic' ? '29' : '99'}`}
                    {plan !== 'Enterprise' && <span className="text-sm">/month</span>}
                  </div>
                  <Link to="/pricing" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 rounded-3xl bg-base-200 shadow-sm">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-opacity-50 transition-all duration-200"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-xl font-medium text-left">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openFaq === index ? 'rotate-45' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ${
                    openFaq === index ? 'max-h-40 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-base-content/70">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;