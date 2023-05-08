import { CoinGecko } from 'coingecko-api';

const coinGecko = new CoinGecko();

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const assets = req.body;

    try {
      const response = await coinGecko.simple.price({
        ids: assets,
        vs_currencies: 'usd',
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching live prices:', error);
      res.status(500).json({ error: 'An error occurred while fetching live prices' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
