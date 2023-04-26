import WithAuth from '../../components/WithAuth';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SupportTickets from '../../components/dashboard/SupportTickets';

const SupportTicketsPage = () => {
  return (
    <DashboardLayout>
      <SupportTickets />
    </DashboardLayout>
  );
};

export default WithAuth(SupportTicketsPage);
