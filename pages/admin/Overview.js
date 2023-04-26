import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import WithAuth from '../../components/WithAuth';

const Overview = () => {
  return (
    <AdminDashboardLayout>
      <h1>Admin Home</h1>
    </AdminDashboardLayout>
  );
};

export default WithAuth(Overview, 'admin');
