import { useState } from 'react';
import axios from 'axios';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import WithAuth from '../../components/WithAuth';

const SendEmail = () => {
  const [emailTarget, setEmailTarget] = useState('all');
  const [specificEmail, setSpecificEmail] = useState('');
  const [role, setRole] = useState('all');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/api/admin/send-email', {
        emailTarget,
        specificEmail,
        role,
        subject,
        body,
      });

      setSuccessMessage('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage(error.response.data.error || 'Error sending email');
    }
  };

return (
    <AdminDashboardLayout>
      <div className="w-full max-w-lg mx-auto">
<form onSubmit={handleSendEmail} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  {/* Email target selection */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Send email to:</label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={emailTarget}
      onChange={(e) => setEmailTarget(e.target.value)}
    >
      <option value="all">All users</option>
      <option value="specific">Specific user</option>
    </select>
  </div>
  {/* Specific email input */}
  {emailTarget === 'specific' && (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Email address:</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="email"
        value={specificEmail}
        onChange={(e) => setSpecificEmail(e.target.value)}
      />
    </div>
  )}

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
  <select
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
    <option value="all">All</option>
    <option value="user">Users</option>
    <option value="admin">Admins</option>
  </select>
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
  <textarea
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={body}
    onChange={(e) => setBody(e.target.value)}
    rows={10}
  ></textarea>
</div>
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
<div className="flex items-center justify-between">
  <button
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    style={{ backgroundColor: "#5383c7" }}
  >
    Send Email
  </button>
</div>
</form>

      </div>
    </AdminDashboardLayout>
  );
  
};

export default WithAuth(SendEmail, 'admin');
