import WithAuth from '../../components/WithAuth';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AccountSettings from '../../components/dashboard/AccountSettings';

const AccountSettingsPage = () => {
  return (
    <DashboardLayout>
      <AccountSettings />
    </DashboardLayout>
  );
};

export default WithAuth(AccountSettingsPage);
