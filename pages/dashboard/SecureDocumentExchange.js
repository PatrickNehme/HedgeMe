import WithAuth from '../../components/WithAuth';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import React, { useState } from 'react';


const DocumentUpload = () => {
    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('file', file);
      
        const res = await fetch('/api/dashboard/document-upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setResponseMessage(data.message);
      };
      
    return (
    <DashboardLayout>
      <div className="w-full max-w-xs mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {responseMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{responseMessage}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Choose file:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ backgroundColor: "#5383c7" }}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      </DashboardLayout>
    );
  };

export default WithAuth(DocumentUpload);
