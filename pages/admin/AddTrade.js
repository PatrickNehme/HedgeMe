import { useState } from 'react';
import axios from 'axios';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import WithAuth from '../../components/WithAuth';


const AddTrade = () => {
  const [asset, setAsset] = useState('');
  const [type, setType] = useState('');
  const [exchange, setExchange] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [strategy, setStrategy] = useState('');
  const [leverage, setLeverage] = useState('');
  const [size, setSize] = useState('');
  const [publisher, setPublisher] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddTrade = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post('/api/admin/trades/add', {
        asset,
        type,
        exchange,
        entryPrice,
        stopPrice,
        targetPrice,
        strategy,
        leverage,
        size,
        publisher,
      });

      setSuccessMessage('Trade added successfully');
      setAsset('');
      setType('');
      setExchange('');
      setEntryPrice('');
      setStopPrice('');
      setTargetPrice('');
      setStrategy('');
      setLeverage('');
      setSize('');
      setPublisher('');
    } catch (error) {
      console.error('Error adding new trade:', error);
      setErrorMessage(error.response.data.error || 'Error adding new trade');
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleAddTrade} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="asset">
              Asset
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="asset"
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Futures">Futures</option>
              <option value="Spot">Spot</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exchange">
              Exchange
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exchange"
              type="text"
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entryPrice">
              Entry Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="entryPrice"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stopPrice">
              Stop Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stopPrice"
              type="number"
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetPrice">
              Target Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="targetPrice"
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="strategy">
              Strategy
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="strategy"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              required
            >
              <option value="">Select Strategy</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leverage">
              Leverage
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="leverage"
              type="text"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
              Size
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="size"
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
              Publisher
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="publisher"
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ backgroundColor: "#5383c7" }}
            >
              Add Trade
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
};

export default WithAuth(AddTrade, 'admin');
