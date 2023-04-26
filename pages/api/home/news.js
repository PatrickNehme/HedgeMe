import Parser from 'rss-parser';

const handler = async (req, res) => {
  const parser = new Parser();
  try {
    const feed = await parser.parseURL('https://crypto-bundled.com/feed/');
    const items = feed.items.slice(0, 6); 
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
};

export default handler;
