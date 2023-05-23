import React from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { FiUser, FiSettings, FiHelpCircle, FiLogOut, FiLock} from 'react-icons/fi';
import styles from './dashboard.module.css';
import Head from 'next/head';

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('token');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Client Dashboard</title>
      </Head>
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 text-white py-6 px-4 min-h-screen flex flex-col ${styles.sidebar}`} style={{ backgroundColor: '#5383c7' }}>
        <div className="mb-4 ml-8 text-lg font-semibold">
            Client Dashboard
          </div>
          <div className={`${styles.separator}`} />
          <div className="flex-1">
            <div className="mb-4">
              <button
                onClick={() => router.push('/dashboard/AccountInformationPage')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiUser className="inline-block mr-2" /> Account Information
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={() => router.push('/dashboard/AccountSettingsPage')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiSettings className="inline-block mr-2" /> Account Settings
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={() => router.push('/dashboard/SupportTicketsPage')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiHelpCircle className="inline-block mr-2" /> Support Tickets
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={() => router.push('/dashboard/SecureDocumentExchange')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiLock className="inline-block mr-2" /> Secure File Exchange
              </button>
            </div>
            {/* Add more buttons as needed */}
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
        {/* Main content */}
        <div className="flex-1 p-8 text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
