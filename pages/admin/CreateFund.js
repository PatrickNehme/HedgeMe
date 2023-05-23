import axios from 'axios';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import { useState } from 'react';

const CreateFund = () => {
  const [email, setEmail] = useState('');
  const [fundName, setFundName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [lowRiskAllocation, setLowRiskAllocation] = useState('');
  const [mediumRiskAllocation, setMediumRiskAllocation] = useState('');
  const [highRiskAllocation, setHighRiskAllocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateFund = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/api/admin/create-fund', {
        email,
        fundName,
        initialBalance,
        lowRiskAllocation,
        mediumRiskAllocation,
        highRiskAllocation,
      });

      setSuccessMessage('Fund created successfully');
    } catch (error) {
      console.error('Error creating fund:', error);
      setErrorMessage(error.response.data.error || 'Error creating fund');
    }
  };

  

  return (
    <AdminDashboardLayout>
      <div className="w-full max-w-lg mx-auto">
        <form onSubmit={handleCreateFund} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
  
  
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fundName">
              Fund Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fundName"
              type="text"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="initialBalance">
              Initial Balance ($)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="initialBalance"
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lowRiskAllocation">
              Low Risk Allocation (%)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lowRiskAllocation"
              type="number"
              value={lowRiskAllocation}
              onChange={(e) => setLowRiskAllocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mediumRiskAllocation">
              Medium Risk Allocation (%)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mediumRiskAllocation"
              type="number"
              value={mediumRiskAllocation}
              onChange={(e) => setMediumRiskAllocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="highRiskAllocation">
            High Risk Allocation (%)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="highRiskAllocation"
            type="number"
            value={highRiskAllocation}
            onChange={(e) => setHighRiskAllocation(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            style={{ backgroundColor: "#5383c7" }}
          >
            Create Fund
          </button>
        </div>
      </form>
    </div>
  </AdminDashboardLayout>
);
}
          
  

export default CreateFund;
