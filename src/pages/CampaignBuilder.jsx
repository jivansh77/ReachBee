import { useState } from 'react';
import { RiRocketLine, RiRadarLine, RiPieChartLine, RiSettings4Line, RiUserSmileLine, RiImageLine } from 'react-icons/ri';

export default function CampaignBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'instagram']);
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [budget, setBudget] = useState(10000);

  const steps = [
    { id: 1, name: 'Campaign Details', icon: RiRocketLine },
    { id: 2, name: 'Audience Targeting', icon: RiRadarLine },
    { id: 3, name: 'Content Selection', icon: RiPieChartLine },
    { id: 4, name: 'Settings & Launch', icon: RiSettings4Line },
  ];

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: '📱' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
  ];

  const audiences = [
    {
      id: 'young-prof',
      name: 'Young Professionals',
      size: '1.2M',
      engagement: '4.8%',
      interests: ['Technology', 'Career Growth', 'Fitness'],
    },
    {
      id: 'parents',
      name: 'Parents',
      size: '850K',
      engagement: '3.2%',
      interests: ['Family', 'Education', 'Health'],
    },
    {
      id: 'business',
      name: 'Business Decision Makers',
      size: '450K',
      engagement: '5.1%',
      interests: ['Business', 'Innovation', 'Leadership'],
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Campaign Details Form */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Campaign Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Campaign Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter campaign name"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Campaign Objective</span>
                    </label>
                    <select className="select select-bordered">
                      <option>Brand Awareness</option>
                      <option>Lead Generation</option>
                      <option>Sales Conversion</option>
                      <option>Customer Retention</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Start Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">End Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text">Campaign Description</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Describe your campaign objectives and goals"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Selection */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Platform Selection</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className={`card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors
                        ${selectedPlatforms.includes(platform.id) ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => {
                        setSelectedPlatforms(prev => 
                          prev.includes(platform.id)
                            ? prev.filter(id => id !== platform.id)
                            : [...prev, platform.id]
                        );
                      }}
                    >
                      <div className="card-body items-center text-center">
                        <span className="text-4xl">{platform.icon}</span>
                        <h3 className="font-medium mt-2">{platform.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Audience Selection */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">
                  <RiUserSmileLine className="text-primary" />
                  Target Audience Selection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {audiences.map((audience) => (
                    <div
                      key={audience.id}
                      className={`card bg-base-200 cursor-pointer hover:shadow-lg transition-all
                        ${selectedAudience === audience.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedAudience(audience.id)}
                    >
                      <div className="card-body">
                        <h3 className="card-title text-lg">{audience.name}</h3>
                        <div className="space-y-2">
                          <p className="text-sm">Size: {audience.size}</p>
                          <p className="text-sm">Engagement: {audience.engagement}</p>
                          <div className="flex flex-wrap gap-1">
                            {audience.interests.map((interest) => (
                              <span key={interest} className="badge badge-primary badge-sm">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Targeting */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Custom Targeting</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Age Range</span>
                    </label>
                    <div className="join">
                      <input type="number" className="join-item input input-bordered w-20" placeholder="18" />
                      <span className="join-item btn btn-disabled">to</span>
                      <input type="number" className="join-item input input-bordered w-20" placeholder="65" />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input type="text" className="input input-bordered" placeholder="Enter locations" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Content Selection */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">
                  <RiImageLine className="text-primary" />
                  Content Selection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">AI-Generated Content</h3>
                    <div className="space-y-4">
                      {selectedPlatforms.map((platform) => (
                        <div key={platform} className="card bg-base-200">
                          <div className="card-body">
                            <h4 className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)} Post</h4>
                            <p className="text-sm">✨ Discover innovation at its finest! Our latest collection brings together style and sustainability.</p>
                            <div className="card-actions justify-end">
                              <button className="btn btn-sm btn-outline">Edit</button>
                              <button className="btn btn-sm btn-primary">Use</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Upload Custom Content</h3>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-base-200 hover:bg-base-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <RiImageLine className="w-8 h-8 mb-4 text-base-content" />
                          <p className="mb-2 text-sm text-base-content"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-base-content/70">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Budget Optimizer */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">AI Budget Optimizer</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Total Campaign Budget</span>
                      </label>
                      <div className="join">
                        <span className="join-item btn btn-neutral">$</span>
                        <input
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          className="join-item input input-bordered w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">AI-Optimized Allocation</h3>
                      <div className="space-y-4">
                        {selectedPlatforms.map((platform, index) => {
                          const allocation = index === 0 ? 0.6 : 0.4;
                          return (
                            <div key={platform} className="flex items-center gap-4">
                              <span className="text-2xl">
                                {platforms.find(p => p.id === platform)?.icon}
                              </span>
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                  </span>
                                  <span className="text-sm text-primary">
                                    ${(budget * allocation).toLocaleString()}
                                  </span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${allocation * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="alert alert-success">
                      <div>
                        <h3 className="font-bold">Budget Optimization Insights</h3>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>60% allocation to Instagram based on audience engagement patterns</li>
                          <li>Recommended daily spend: ${(budget / 30).toFixed(2)} for optimal reach</li>
                          <li>Expected ROI: 287% based on historical data</li>
                        </ul>
                      </div>
                    </div>

                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h3 className="card-title text-lg">Performance Forecast</h3>
                        <div className="stats stats-vertical shadow">
                          <div className="stat">
                            <div className="stat-title">Estimated Reach</div>
                            <div className="stat-value">2.4M</div>
                            <div className="stat-desc">↗︎ 15% vs. last campaign</div>
                          </div>
                          
                          <div className="stat">
                            <div className="stat-title">Projected Conversions</div>
                            <div className="stat-value">3.2%</div>
                            <div className="stat-desc">↗︎ 0.8% vs. benchmark</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Checklist */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Launch Checklist</h2>
                <ul className="steps steps-vertical">
                  <li className="step step-primary">Campaign details completed</li>
                  <li className="step step-primary">Target audience selected</li>
                  <li className="step step-primary">Content prepared</li>
                  <li className="step step-primary">Budget allocated</li>
                  <li className="step">Ready to launch</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaign Builder</h1>
        <button className="btn btn-primary">Save Draft</button>
      </div>

      {/* Progress Steps */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <ul className="steps steps-horizontal w-full">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`step ${step.id <= currentStep ? 'step-primary' : ''} cursor-pointer`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="flex flex-col items-center">
                  <step.icon className="w-6 h-6 mb-1" />
                  {step.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button 
          className="btn btn-outline"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Previous
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => currentStep < 4 ? setCurrentStep(currentStep + 1) : null}
        >
          {currentStep === 4 ? 'Launch Campaign' : 'Next Step'}
        </button>
      </div>
    </div>
  );
} 