import React from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { FiUser, FiSettings, FiHelpCircle, FiLogOut, FiTrendingUp, FiUserPlus} from 'react-icons/fi';
import { FiArchive } from "react-icons/fi";
import styles from '/components/admin/admin.module.css';

const AdminDashboardLayout = ({ children }) => {
    const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('token');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 text-white py-6 px-4 min-h-screen flex flex-col ${styles.sidebar}`} style={{ backgroundColor: '#5383c7' }}>
          <div className="mb-8">
            <div className="text-lg font-semibold">Welcome, test@admin.com</div>
          </div>
          <div className={`${styles.separator}`} />
          <div className="flex-1">
            <div className="mb-4">
              <button
                onClick={() => router.push('/admin/CreateUser')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiUserPlus className="inline-block mr-2" /> Create User
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={() => router.push('/admin/AllUsers')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiUser className="inline-block mr-2" /> All Users
              </button>
            </div>
            <div className="mb-4">
            <button
                onClick={() => router.push('/admin/AddTrade')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiTrendingUp className="inline-block mr-2" /> Add Trade
              </button>
            </div>

            <div className="mb-4">
            <button
                onClick={() => router.push('/admin/AllTrades')}
                className={`w-full text-left py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${styles.sidebarBtn}`}
              >
                <FiArchive className="inline-block mr-2" /> All Trades
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

export default AdminDashboardLayout;
