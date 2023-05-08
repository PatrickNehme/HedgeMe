import WithAuth from '../../components/WithAuth';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AccountInformation from '../../components/dashboard/AccountInformation';

const AccountInformationPage = () => {
  return (
    <DashboardLayout>
        <h2>Account Information</h2>
    </DashboardLayout>
  );
};

export default WithAuth(AccountInformationPage);
