import { useState } from 'react';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import WithAuth from '../../components/WithAuth';

const AlertManagement = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await localStorage.setItem('alertMessage', alertMessage);
      setStatus('Alert message saved successfully.');
    } catch (error) {
      console.error('Error saving alert message:', error);
      setStatus('Error saving alert message.');
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alertMessage">
              Alert Message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="alertMessage"
              type="text"
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Alert Message
            </button>
          </div>
        </form>
        {status && <p className="text-center">{status}</p>}
      </div>
    </AdminDashboardLayout>
  );
};

export default WithAuth(AlertManagement, 'admin');
