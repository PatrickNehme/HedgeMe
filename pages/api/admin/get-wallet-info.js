import authMiddleware from '../authMiddleware';
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { address } = req.body;

    try {
      const options = {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.MORALIS_API_KEY,
        },
      };

      const response = await fetch(
        `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=bsc`,
        options
      );
      const resBalance = await response.json();

      if (response.status !== 200) {
        throw new Error(resBalance.message);
      }

      // Filter out spam tokens
      const filteredTokens = resBalance.filter((token) => !token.possible_spam);

      // Map the tokens to a new object with the formatted balance
      const tokens = filteredTokens.map((token) => {
        const formattedBalance = Number(BigInt(token.balance) / BigInt(10 ** token.decimals)).toFixed(4);
        return {
          name: token.name,
          symbol: token.symbol,
          balance: formattedBalance,
          logo: token.logo,
          decimals: token.decimals,
        };
      });

      res.status(200).json({ tokens });
    } catch (error) {
      console.error('Error fetching wallet info:', error);
      res.status(500).json({ message: 'Error fetching wallet info', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default authMiddleware(handler, 'admin');

