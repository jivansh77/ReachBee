import { useState } from 'react';
import { RiMagicLine, RiFileTextLine, RiImageLine, RiVideoLine } from 'react-icons/ri';

export default function ContentStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [contentType, setContentType] = useState('social');
  
  const templates = [
    {
      id: 1,
      name: 'Social Media Post',
      description: 'Create engaging social media content optimized for each platform',
      icon: RiFileTextLine,
    },
    {
      id: 2,
      name: 'Email Campaign',
      description: 'Design personalized email campaigns with dynamic content',
      icon: RiFileTextLine,
    },
    {
      id: 3,
      name: 'Ad Creative',
      description: 'Generate high-converting ad creatives for different platforms',
      icon: RiImageLine,
    },
    {
      id: 4,
      name: 'Video Script',
      description: 'Write compelling video scripts with AI assistance',
      icon: RiVideoLine,
    },
  ];

  const recentContent = [
    {
      title: 'Summer Collection Launch',
      type: 'Social Media Campaign',
      performance: '98% AI Score',
      date: '2 hours ago',
    },
    {
      title: 'Customer Appreciation Email',
      type: 'Email Campaign',
      performance: '95% AI Score',
      date: '1 day ago',
    },
    {
      title: 'Product Demo Video',
      type: 'Video Content',
      performance: '92% AI Score',
      date: '2 days ago',
    },
  ];

  const getPlaceholderText = () => {
    switch (contentType) {
      case 'email':
        return "Describe your email campaign (e.g., 'Create a welcome series for new subscribers highlighting our key products')";
      case 'ad':
        return "Describe your ad campaign (e.g., 'Create compelling ad copy for our summer collection targeting 25-35 year old professionals')";
      case 'video':
        return "Describe your video content (e.g., 'Create a 2-minute product demonstration script highlighting key features')";
      default:
        return "Describe your social media content (e.g., 'Create a social media campaign for our summer collection targeting young professionals')";
    }
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template.id);
    switch (template.name) {
      case 'Email Campaign':
        setContentType('email');
        break;
      case 'Ad Creative':
        setContentType('ad');
        break;
      case 'Video Script':
        setContentType('video');
        break;
      default:
        setContentType('social');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Studio</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">Import Content</button>
          <button className="btn btn-primary">New Content</button>
        </div>
      </div>

      {/* AI Content Generator */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">
            <RiMagicLine className="text-primary" />
            AI Content Generator
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">What would you like to create?</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24" 
                placeholder={getPlaceholderText()}
              />
              <label className="label">
                <span className="label-text-alt">AI will optimize the content based on your target audience and goals</span>
              </label>
              <div className="flex gap-2 mt-4">
                <button className="btn btn-primary">Generate Content</button>
                <button className="btn btn-outline">Advanced Options</button>
              </div>
            </div>

            {/* New: Live Preview Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Live Platform Previews</h3>
              <div className="tabs tabs-boxed">
                <a className="tab tab-active">Instagram</a>
                <a className="tab">Facebook</a>
                <a className="tab">Twitter</a>
                <a className="tab">LinkedIn</a>
              </div>
              
              {/* Instagram Preview */}
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-semibold text-sm">Your Brand</p>
                    <p className="text-xs text-gray-500">Sponsored</p>
                  </div>
                </div>
                <div className="aspect-square bg-base-200 rounded-lg mb-3 flex items-center justify-center">
                  <p className="text-sm text-base-content/70">Image Preview</p>
                </div>
                <p className="text-sm mb-2">✨ Elevate your summer style with our new collection!</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>❤️ Like</span>
                  <span>💬 Comment</span>
                  <span>🔄 Share</span>
                </div>
              </div>

              <div className="alert alert-info">
                <div>
                  <h3 className="font-bold">AI Format Optimization</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Optimal image ratio: 1:1 for feed posts</li>
                    <li>Recommended hashtags: #SummerStyle #Fashion</li>
                    <li>Best posting time: Today at 6:00 PM EST</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`card bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-shadow
              ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleTemplateClick(template)}
          >
            <div className="card-body">
              <template.icon className="w-8 h-8 text-primary" />
              <h3 className="card-title text-lg">{template.name}</h3>
              <p className="text-sm text-base-content/70">{template.description}</p>
              <button className="btn btn-sm btn-outline mt-4">Use Template</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Content */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Recent Content</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Performance</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentContent.map((content) => (
                  <tr key={content.title}>
                    <td>{content.title}</td>
                    <td>
                      <span className="badge badge-ghost">{content.type}</span>
                    </td>
                    <td>
                      <span className="text-success">{content.performance}</span>
                    </td>
                    <td>{content.date}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost">Edit</button>
                        <button className="btn btn-sm btn-ghost">Duplicate</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Writing Assistant */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">AI Writing Assistant</h2>
          <div className="alert alert-info">
            <div>
              <h3 className="font-bold">Writing Suggestions</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Use more action words to increase engagement</li>
                <li>Add social proof to build credibility</li>
                <li>Optimize headline for better click-through rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 