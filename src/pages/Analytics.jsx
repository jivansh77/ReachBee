import { RiBarChartBoxLine, RiPieChartLine, RiLineChartLine, RiUserSmileLine } from 'react-icons/ri';

export default function Analytics() {
  const metrics = [
    {
      name: 'Likes',
      value: '1',
      change: '+100%',
      icon: RiUserSmileLine,
    },
    {
      name: 'Replies',
      value: '1',
      change: '+100%',
      icon: RiBarChartBoxLine,
    },
    {
      name: 'Retweets',
      value: '0',
      change: '0%',
      icon: RiPieChartLine,
    },
    {
      name: 'Follower Count',
      value: '2',
      change: '+100%',
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
          <p className="text-sm text-base-content/70 mt-1">Follower Count Growth</p>
          <div className="h-[300px] bg-base-100 rounded-lg p-6">
            <div className="relative w-full h-full">
              {/* Y-axis */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-base-content/70">
                <div className="flex items-center h-6">
                  <span className="mr-2">4.0%</span>
                  <div className="w-full border-t border-base-300 absolute left-8" style={{ width: 'calc(100vw - 250px)' }} />
                </div>
                <div className="flex items-center h-6">
                  <span className="mr-2">3.0%</span>
                  <div className="w-full border-t border-base-300 absolute left-8" style={{ width: 'calc(100vw - 250px)' }} />
                </div>
                <div className="flex items-center h-6">
                  <span className="mr-2">2.0%</span>
                  <div className="w-full border-t border-base-300 absolute left-8" style={{ width: 'calc(100vw - 250px)' }} />
                </div>
                <div className="flex items-center h-6">
                  <span className="mr-2">1.0%</span>
                  <div className="w-full border-t border-base-300 absolute left-8" style={{ width: 'calc(100vw - 250px)' }} />
                </div>
                <div className="flex items-center h-6">
                  <span className="mr-2">0.0%</span>
                  <div className="w-full border-t border-base-300 absolute left-8" style={{ width: 'calc(100vw - 250px)' }} />
                </div>
              </div>

              {/* Graph Content */}
              <div className="pl-16 h-full">
                <div className="relative h-full flex items-end justify-between">
                  {/* Bars */}
                  <div className="flex-1 flex justify-center">
                    <div className="w-16 bg-primary rounded-t-lg" style={{ height: '0%' }}>
                      <div className="text-xs text-center mt-2">16th</div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-16 bg-primary rounded-t-lg" style={{ height: '0%' }}>
                      <div className="text-xs text-center mt-2">17th</div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-16 bg-primary rounded-t-lg" style={{ height: '50%' }}>
                      <div className="text-xs text-center mt-2">18th</div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-16 bg-base-300 rounded-t-lg" style={{ height: '0%' }}>
                      <div className="text-xs text-center mt-2">19th</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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