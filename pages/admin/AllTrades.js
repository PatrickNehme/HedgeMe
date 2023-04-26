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
    <AdminDashboardLayout>
      <AllTrades />
    </AdminDashboardLayout>
  </>
);

export default WithAuth(AllTradesPage, 'admin');
