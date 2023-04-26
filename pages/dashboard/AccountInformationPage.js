import WithAuth from '../../components/WithAuth';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AccountInformation from '../../components/dashboard/AccountInformation';

const AccountInformationPage = () => {
  return (
    <DashboardLayout>
      <AccountInformation />
    </DashboardLayout>
  );
};

export default WithAuth(AccountInformationPage);
