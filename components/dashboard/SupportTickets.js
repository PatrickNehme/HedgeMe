import { useState } from 'react';

const SupportTickets = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/pages/api/dashboard/support-tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        message,
      }),
    });

    const data = await res.json();
    setResponseMessage(data.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="general">General</option>
          </select>
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default SupportTickets;
