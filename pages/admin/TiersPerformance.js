import { useState, useEffect } from 'react';
import axios from 'axios';
import { getWeek, getMonth, getYear } from 'date-fns';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import WithAuth from '../../components/WithAuth';

const PerformanceDashboard = () => {
  const [newPerformance, setNewPerformance] = useState({
    week: 1,
    month: new Date().getMonth() + 1, // Get current month
    year: new Date().getFullYear(), // Get current year
    tier1: 0,
    tier2: 0
  });

  const [performances, setPerformances] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()) + 1); // Get current month
  const [currentYear, setCurrentYear] = useState(getYear(new Date())); // Get current year


  const fetchPerformances = async () => {
    try {
      const response = await axios.get(`/api/admin/weekly-performance?month=${currentMonth}&year=${currentYear}`);
      setPerformances(response.data);
    } catch (error) {
      console.error('Error fetching performances:', error);
    }
  };

  useEffect(() => {
    fetchPerformances();
  }, [currentMonth, currentYear]);

  const addPerformance = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      console.log(`Sending performance for week ${newPerformance.week}, month ${newPerformance.month}, year ${newPerformance.year}`); // Added logging
      const response = await axios.post('/api/admin/weekly-performance', newPerformance);
      setSuccessMessage('Performance added successfully');
      setNewPerformance({ week: 1, month: 1, year: 2023, tier1: 0, tier2: 0 });
      fetchPerformances();
    } catch (error) {
      console.error('Error adding performance:', error);
      setErrorMessage(error.response.data.error || 'Error adding performance');
    }
  };
  

  // Function to handle month switching
  const switchMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };
  return (
    <AdminDashboardLayout>
      <div className="w-full max-w-lg mx-auto">
        <form onSubmit={addPerformance} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

          {/* Add fields for week, month, and year in your form */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="week">
              Week
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="week"
              type="number"
              value={newPerformance.week}
              onChange={(e) => setNewPerformance({ ...newPerformance, week: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
              Month
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="month"
              type="number"
              min="1"
              max="12"
              value={newPerformance.month || currentMonth}
              onChange={(e) => setNewPerformance({ ...newPerformance, month: Number(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="year"
              type="number"
              min="2023"
              value={newPerformance.year || currentYear}
              onChange={(e) => setNewPerformance({ ...newPerformance, year: Number(e.target.value) })}
            />
          </div>

          {/* Existing form fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tier1">
              Tier 1 Performance
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tier1"
              type="number"
              value={newPerformance.tier1}
              onChange={(e) => setNewPerformance({ ...newPerformance, tier1: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tier2">
              Tier 2 Performance
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tier2"
              type="number"
              value={newPerformance.tier2}
              onChange={(e) => setNewPerformance({ ...newPerformance, tier2: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ backgroundColor: "#5383c7" }}
            >
              Add Performance
            </button>
          </div>
        </form>

        {/* Month-switching arrows */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => switchMonth('previous')}>Previous</button>
          <h2>{`${currentMonth}/${currentYear}`}</h2>
          <button onClick={() => switchMonth('next')}>Next</button>
        </div>

        <div className="mt-8">
          <table className="table-fixed w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Week</th>
                <th className="py-3 px-6 text-left">Tier 1 Performance</th>
                <th className="py-3 px-6 text-left">Tier 2 Performance</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {performances.map((performance, index) => (
                <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{`Week ${index + 1}`}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{performance.tier1}%</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{performance.tier2}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default WithAuth(PerformanceDashboard, 'admin');
