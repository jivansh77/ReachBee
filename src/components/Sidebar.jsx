import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  RiDashboardLine, 
  RiGroupLine, 
  RiPencilRulerLine,
  RiRocketLine,
  RiBarChartBoxLine
} from 'react-icons/ri';

export default function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: RiDashboardLine },
    { name: 'Audience Insights', href: '/audience-insights', icon: RiGroupLine },
    { name: 'Content Studio', href: '/content-studio', icon: RiPencilRulerLine },
    { name: 'Campaign Builder', href: '/campaign-builder', icon: RiRocketLine },
    { name: 'Analytics', href: '/analytics', icon: RiBarChartBoxLine },
  ];

  return (
    <div className="fixed w-64 bg-base-200 text-base-content h-screen overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4">
          <h2 className="text-xl font-bold">MarketingAI</h2>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-base-300'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-content' : 'text-base-content'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-base-300">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User avatar"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Marketing Team</p>
              <p className="text-xs text-base-content/70">Enterprise Plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}