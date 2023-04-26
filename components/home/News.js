import React, { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedNews = await fetchNews();
      setNews(fetchedNews);
    };
    fetchData();
  }, []);

  const fetchNews = async () => {
    const response = await fetch('/api/home/news');
    const data = await response.json();
    return data;
  };

  function extractImageURL(content) {
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(regex);
    return match ? match[1] : null;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  const newsItemStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
    color: '#333',
  };

  const thumbnailStyle = {
    marginRight: '16px',
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const dateStyle = {
    fontSize: '0.8rem',
    color: '#777',
    marginBottom: '4px',
  };

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {news.map((item, index) => {
          const thumbnailURL = extractImageURL(item['content:encoded']);
          const formattedDate = formatDate(item.pubDate);
          return (
            <li key={index} style={{ marginBottom: '8px' }}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={newsItemStyle}
              >
                {thumbnailURL && (
                  <img
                    src={thumbnailURL}
                    alt={item.title}
                    style={thumbnailStyle}
                  />
                )}
                <div>
                  <div style={dateStyle}>{formattedDate}</div>
                  <span>{item.title}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default News;
