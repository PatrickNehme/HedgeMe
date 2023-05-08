import React from 'react';
import Head from 'next/head';
import TradingPerformance from '../../components/admin/TradingPerfomance';
import WithAuth from '../../components/WithAuth';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';

const TradingPerfomancePage = () => (
  <>
    <Head>
    </Head>
    <AdminDashboardLayout>
      <TradingPerformance />
    </AdminDashboardLayout>
  </>
);

export default WithAuth(TradingPerfomancePage, 'admin');
