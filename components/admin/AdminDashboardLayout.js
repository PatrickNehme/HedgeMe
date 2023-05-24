import React from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import Head from 'next/head';
import {
  FiUser,
  FiPercent,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiBarChart2,
  FiPlusCircle,
  FiTrendingUp,
  FiUserPlus,
  FiSearch,
  FiAlertTriangle,
  FiBriefcase,
  FiFile
} from 'react-icons/fi';
import { FiArchive } from 'react-icons/fi';
import { FiActivity } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';
import { FiInfo } from 'react-icons/fi';

import styles from '/components/admin/admin.module.css';


const AdminDashboardLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('token');
    router.replace('/admin/AdminLogin');
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="flex">
        <div
          className={`w-64 text-white py-6 px-4 min-h-screen flex flex-col ${styles.sidebar}`}
          style={{ backgroundColor: '#5383c7' }}
        >
          <div className="mb-8 text-lg font-semibold">
            Administrator Dashboard
          </div>
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full py-2 pl-10 pr-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.searchInput}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className={`${styles.separator}`} />
          <div className="flex-1">
            <div>
              {[
                {
                  label: 'Create User',
                  icon: <FiUserPlus className="inline-block mr-2" />,
                  url: '/admin/CreateUser',
                },
                {
                  label: 'All Users',
                  icon: <FiUser className="inline-block mr-2" />,
                  url: '/admin/AllUsers',
                },
                {
                  label: 'Create Fund',
                  icon: <FiPlusCircle className="inline-block mr-2" />,
                  url: '/admin/CreateFund',
                },
                {
                  label: 'All Funds',
                  icon: <FiBriefcase className="inline-block mr-2" />,
                  url: '/admin/AllFunds',
                },
                {
                  label: 'Add Trade',
                  icon: <FiTrendingUp className="inline-block mr-2" />,
                  url: '/admin/AddTrade',
                },
                {
                  label: 'All Trades',
                  icon: <FiArchive className="inline-block mr-2" />,
                  url: '/admin/AllTrades',
                },
                {
                  label: 'Trading Performance',
                  icon: <FiActivity className="inline-block mr-2" />,
                  url: '/admin/TradingPerformance',
                },
                {
                  label: 'Other Performance',
                  icon: <FiPercent className="inline-block mr-2" />,
                  url: '/admin/TiersPerformance',
                },
                {
                  label: 'Weekly Performance',
                  icon: <FiBarChart2 className="inline-block mr-2" />,
                  url: '/admin/PerformanceReport',
                },
                {
                  label: 'Send Email',
                  icon: <FiMail className="inline-block mr-2" />,
                  url: '/admin/SendEmail',
                },
                {
                  label: 'Wallet Information',
                  icon: <FiInfo className="inline-block mr-2" />,
                  url: '/admin/WalletInfo',
                },
                {
                  label: 'Alert',
                  icon: <FiAlertTriangle className="inline-block mr-2" />,
                  url: '/admin/Alert',
                },
                {
                  label: 'Uploads',
                  icon: <FiFile className="inline-block mr-2" />,
                  url: '/admin/Uploads',
                },
              ]
                .filter(({ label }) =>
                  label.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(({ label, icon, url }) => (
                  <div className="mb-4" key={label}>
                    <button
                      onClick={() => router.push(url)}
                      className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
                      >
                      {icon} {label}
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className={`${styles.separator}`} />
          <div className={styles.logoutBtn}>
            <button
              onClick={handleLogout}
              className={`w-full text-left py-2 px-4 bg-red-400 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
            >
              <FiLogOut className="inline-block mr-2" /> Logout
            </button>
          </div>
        </div>
        <div className="flex-1 p-8 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

