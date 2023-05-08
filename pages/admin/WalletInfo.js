import { useState } from 'react';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import WithAuth from '../../components/WithAuth';

const WalletInfo = () => {
  const [address, setAddress] = useState('');
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/admin/get-wallet-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      setTokens(data.tokens);
    } catch (error) {
      console.error('Error fetching wallet info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="BEP20 Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#5383c7" }}
            >
              {loading ? 'Loading...' : 'Fetch Wallet Info'}
            </button>
          </div>
        </form>

        <div>
          {tokens && tokens.map((token) => (
            <div key={token.symbol} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <img src={token.logo || 'https://via.placeholder.com/50'} alt={`${token.symbol} logo`} className="w-12 h-12" />
              <h2 className="text-gray-700 font-bold mb-2">{token.name} ({token.symbol})</h2>
              <p>Balance: {token.balance}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default WithAuth(WalletInfo, 'admin');
