import React from 'react';
import Head from 'next/head';
import AllTrades from '../../components/admin/AllTrades';
import WithAuth from '../../components/WithAuth';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';

const AllTradesPage = () => (
  <>
    <Head>
      <title>All Trades</title>
    </Head>
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <AdminDashboardLayout style={{ flex: '0 0 auto' }}>
          {/* Sidebar content */}
        </AdminDashboardLayout>
        <div style={{ flex: '1 1 auto', backgroundColor: '#f5f5f5' }}>
          <div style={{ backgroundColor: 'white', padding: '20px' }}>
            {/* Main content */}
            <AllTrades />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default WithAuth(AllTradesPage, 'admin');
