const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const {email, subject, description, priority, type } = req.body;
    try {
      const response = await axios({
        method: 'post',
        url: 'https://hedgeme.freshdesk.com/api/v2/tickets',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(process.env.FRESHDESK_API_KEY + ':X').toString('base64'),
        },
        data: {
          email: email,
          subject: subject,
          description: description,
          priority: priority === "low" ? 1 : priority === "medium" ? 2 : 3, // convert to integer
          status: 2, // you have set it to 2, which means "open"
          type: type,
        },
      });
      
      if (response.status === 201) {
        res.status(200).json({ message: 'Ticket created successfully! We will follow up via email.' });
      } else {
        throw new Error('Unable to create ticket');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'An error occurred while creating the ticket.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
