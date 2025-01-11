import { useState, useEffect } from 'react';
import { RiUserLine, RiBarChartBoxLine, RiRocketLine, RiMoneyDollarCircleLine, RiFlag2Line } from 'react-icons/ri';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  UsersIcon, 
  ChartBarIcon, 
  BanknotesIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [goals] = useState([
    { 
      name: 'Monthly Revenue',
      current: 85000,
      target: 100000,
      unit: '$',
      progress: 85,
      trend: '+12%',
      timeLeft: '8 days'
    },
    {
      name: 'New Customers',
      current: 1200,
      target: 2000,
      unit: '',
      progress: 60,
      trend: '+5%',
      timeLeft: '8 days'
    },
    {
      name: 'Engagement Rate',
      current: 4.2,
      target: 5.0,
      unit: '%',
      progress: 84,
      trend: '+0.8%',
      timeLeft: '8 days'
    }
  ]);

  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setBusinessData(userDoc.data().businessProfile);
          }
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, []);

  const stats = [
    {
      name: 'Industry',
      value: businessData?.industry || 'Not Specified',
      icon: BuildingOfficeIcon,
      change: 'Current Sector'
    },
    {
      name: 'Target Audience',
      value: businessData?.targetAudience || 'Not Specified',
      icon: UsersIcon,
      change: 'Primary Focus'
    },
    {
      name: 'Monthly Traffic',
      value: businessData?.monthlyWebTraffic || 'Not Specified',
      icon: ChartBarIcon,
      change: 'Current Volume'
    },
    {
      name: 'Marketing Budget',
      value: businessData?.marketingBudget || 'Not Specified',
      icon: BanknotesIcon,
      change: 'Monthly Budget'
    }
  ];

  const campaigns = [
    { name: 'Summer Sale 2024', status: 'active', reach: '850K', conversion: '4.2%', budget: '$5,000' },
    { name: 'Product Launch', status: 'scheduled', reach: '1.2M', conversion: '-', budget: '$8,000' },
    { name: 'Brand Awareness', status: 'active', reach: '2.1M', conversion: '2.8%', budget: '$12,000' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketing Dashboard</h1>
        <button className="btn btn-primary">New Campaign</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/70">{stat.name}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="rounded-full p-3 bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-success">{stat.change}</span>
                <span className="text-sm text-base-content/70"> vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Performance */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Active Campaigns</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Status</th>
                  <th>Audience Reach</th>
                  <th>Conversion Rate</th>
                  <th>Budget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.name}>
                    <td>{campaign.name}</td>
                    <td>
                      <span className={`badge ${
                        campaign.status === 'active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td>{campaign.reach}</td>
                    <td>{campaign.conversion}</td>
                    <td>{campaign.budget}</td>
                    <td>
                      <button className="btn btn-sm btn-ghost">Edit</button>
                      <button className="btn btn-sm btn-ghost">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Goal Tracking */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">
              <RiFlag2Line className="text-primary" />
              Campaign Goals
            </h2>
            <button className="btn btn-outline btn-sm">Set New Goal</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div key={goal.name} className="card bg-base-200">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{goal.name}</h3>
                    <span className="text-success text-sm">{goal.trend}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current: {goal.unit}{goal.current}</span>
                    <span>Target: {goal.unit}{goal.target}</span>
                  </div>

                  <div className="w-full h-3 bg-base-300 rounded-full mb-2">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    >
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-primary">{goal.progress}% Complete</span>
                    <span>{goal.timeLeft} remaining</span>
                  </div>

                  <div className="card-actions mt-4">
                    <button className="btn btn-sm btn-outline w-full">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">AI-Powered Insights</h2>
          <div className="alert alert-info">
            <div>
              <h3 className="font-bold">Optimization Opportunities</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Increase ad spend during peak hours (2 PM - 6 PM) for better engagement</li>
                <li>Target audience segment "Young Professionals" shows 25% higher conversion rate</li>
                <li>Content with video performs 40% better than image-only posts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 