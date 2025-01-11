import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const BusinessForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    website: '',
    employeeCount: '',
    annualRevenue: '',
    targetAudience: '',
    marketingGoals: '',
    socialMediaPresence: [],
    businessDescription: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (platform) => {
    setFormData(prevState => ({
      ...prevState,
      socialMediaPresence: prevState.socialMediaPresence.includes(platform)
        ? prevState.socialMediaPresence.filter(p => p !== platform)
        : [...prevState.socialMediaPresence, platform]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Save business profile to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        businessProfile: formData,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving business profile:', error);
      setError('Failed to save business profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const industries = [
    'Technology',
    'Retail',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Entertainment',
    'Food & Beverage',
    'Real Estate',
    'Other'
  ];

  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'tiktok', name: 'TikTok' }
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-6">Complete Your Business Profile</h2>
              <p className="text-base-content/70 mb-8">
                Help us understand your business better to provide personalized marketing solutions.
              </p>

              {error && (
                <div className="alert alert-error mb-6">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Business Name</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Industry</span>
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Website</span>
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="https://"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Number of Employees</span>
                    </label>
                    <select
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select Range</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                {/* Business Details */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Annual Revenue</span>
                  </label>
                  <select
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Range</option>
                    <option value="<1M">Less than ₹1M</option>
                    <option value="1M-5M">₹1M - ₹5M</option>
                    <option value="5M-20M">₹5M - ₹20M</option>
                    <option value="20M-100M">₹20M - ₹100M</option>
                    <option value="100M+">₹100M+</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Target Audience</span>
                  </label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="e.g., Young professionals aged 25-35"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Marketing Goals</span>
                  </label>
                  <select
                    name="marketingGoals"
                    value={formData.marketingGoals}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Primary Goal</option>
                    <option value="brand-awareness">Increase Brand Awareness</option>
                    <option value="lead-generation">Generate Leads</option>
                    <option value="sales">Drive Sales</option>
                    <option value="engagement">Improve Customer Engagement</option>
                    <option value="retention">Customer Retention</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Social Media Presence</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {socialPlatforms.map(platform => (
                      <label key={platform.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={formData.socialMediaPresence.includes(platform.id)}
                          onChange={() => handleSocialMediaChange(platform.id)}
                        />
                        <span>{platform.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Business Description</span>
                  </label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-24"
                    placeholder="Tell us about your business, products/services, and what makes you unique..."
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-8">
                  <button 
                    type="submit" 
                    className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Complete Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm; 