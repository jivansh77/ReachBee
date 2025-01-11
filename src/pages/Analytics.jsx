import { RiBarChartBoxLine, RiPieChartLine, RiLineChartLine, RiUserSmileLine } from 'react-icons/ri';

export default function Analytics() {
  const metrics = [
    {
      name: 'Total Reach',
      value: '2.4M',
      change: '+15.3%',
      icon: RiUserSmileLine,
    },
    {
      name: 'Engagement Rate',
      value: '4.8%',
      change: '+2.1%',
      icon: RiBarChartBoxLine,
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: RiPieChartLine,
    },
    {
      name: 'ROI',
      value: '287%',
      change: '+12.3%',
      icon: RiLineChartLine,
    },
  ];

  const campaigns = [
    {
      name: 'Summer Collection',
      reach: '850K',
      engagement: '5.2%',
      conversions: '3.8%',
      roi: '312%',
      status: 'active',
    },
    {
      name: 'Back to School',
      reach: '620K',
      engagement: '4.1%',
      conversions: '2.9%',
      roi: '245%',
      status: 'active',
    },
    {
      name: 'Holiday Special',
      reach: '980K',
      engagement: '6.3%',
      conversions: '4.2%',
      roi: '378%',
      status: 'scheduled',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaign Analytics</h1>
        <div className="flex gap-2">
          <select className="select select-bordered">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Custom Range</option>
          </select>
          <button className="btn btn-outline">Export Report</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/70">{metric.name}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className="rounded-full p-3 bg-primary/10">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-success">{metric.change}</span>
                <span className="text-sm text-base-content/70"> vs last period</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Graph */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Performance Overview</h2>
          <div className="h-[300px] flex items-center justify-center bg-base-200 rounded-lg">
            <p className="text-base-content/70">Interactive performance graph will be rendered here</p>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Campaign Performance</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Reach</th>
                  <th>Engagement</th>
                  <th>Conversions</th>
                  <th>ROI</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.name}>
                    <td>{campaign.name}</td>
                    <td>{campaign.reach}</td>
                    <td>{campaign.engagement}</td>
                    <td>{campaign.conversions}</td>
                    <td>{campaign.roi}</td>
                    <td>
                      <span className={`badge ${
                        campaign.status === 'active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-ghost">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">AI Performance Insights</h2>
            <div className="alert alert-info">
              <div>
                <h3 className="font-bold">Key Findings</h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Video content outperforms images by 45%</li>
                  <li>Peak engagement occurs between 6-8 PM</li>
                  <li>Instagram Stories drive 30% more conversions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Recommendations</h2>
            <div className="alert alert-success">
              <div>
                <h3 className="font-bold">Optimization Opportunities</h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Increase video content in upcoming campaigns</li>
                  <li>Adjust posting schedule to target peak hours</li>
                  <li>Allocate 40% more budget to Instagram Stories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 