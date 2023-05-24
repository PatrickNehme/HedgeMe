import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Typography } from 'antd';
import styles from './tradingperformance.module.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
const { Title } = Typography;



const TradingPerformance = () => {
  const [trades, setTrades] = useState([]);
  const [previousTrades, setPreviousTrades] = useState([]);
  

  useEffect(() => {
    const fetchTrades = async () => {
        const response = await axios.get('/api/admin/trades');
        const tradesData = response.data;
        console.log('Trades:', tradesData);
        
        // Filter out closed trades
        const openTrades = tradesData.filter((trade) => trade.status !== 'Closed');
        setTrades(openTrades);
        await fetchLivePrices(openTrades);
      };
    
    fetchTrades();

    const intervalId = setInterval(() => {
      fetchLivePrices(trades);
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [trades]);

  const fetchLivePrices = async (trades) => {
    try {
      const uniqueAssets = Array.from(new Set(trades.map((trade) => trade.asset)));
      const prices = await Promise.all(
        uniqueAssets.map(async (asset) => {
          const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${asset}USDT`);
          return { asset, price: parseFloat(response.data.price) };
        })
      );

      const updatedTrades = trades.map((trade) => {
        const livePrice = prices.find((price) => price.asset === trade.asset).price;
        const percentageChange = ((livePrice - parseFloat(trade.entryPrice)) / parseFloat(trade.entryPrice) * 100);
        
        let tradePnL;
        if (isNaN(percentageChange) || isNaN(parseFloat(trade.size))) {
          tradePnL = 0;
        } else {
          if (trade.strategy === 'Long') {
            tradePnL = percentageChange * parseFloat(trade.leverage);
          } else { 
            tradePnL = -percentageChange * parseFloat(trade.leverage);
          }
        }
      
        return { ...trade, livePrice, percentageChange: parseFloat(percentageChange.toFixed(2)), livePnL: parseFloat(tradePnL.toFixed(2)) };
      });
      
      
      
      
      setPreviousTrades(updatedTrades);
    } catch (error) {
      console.error('Error fetching live prices:', error);
    }
  };

  const columns = [
    {
        title: 'Trade ID',
        dataIndex: '_id',
        key: '_id',
        render: (value) => value.substring(0, 6),
    },
    {
      title: 'Asset',
      dataIndex: 'asset',
      key: 'asset',
    },
    {
      title: 'Entry Price',
      dataIndex: 'entryPrice',
      key: 'entryPrice',
      render: (value) => parseFloat(value).toFixed(2),
    },
    {
      title: 'Live Price',
      dataIndex: 'livePrice',
      key: 'livePrice',
      render: (value) => parseFloat(value).toFixed(2),
    },
    {
        title: 'Size (%)',
        dataIndex: 'size',
        key: 'size',
        render: (value) => (parseFloat(value)).toFixed(2) + '%',
    },
    {
      title: 'Leverage',
      dataIndex: 'leverage',
      key: 'leverage',
      render: (value) => parseFloat(value).toFixed(2),
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      key: 'strategy',
    },
    {
        title: 'Live PnL',
        dataIndex: 'livePnL',
        key: 'livePnL',
        render: (value) => (parseFloat(value)).toFixed(2) + '%',
    },  ];

    const longShortData = [
        { name: 'Long', value: previousTrades.filter((trade) => trade.strategy === 'Long').length },
        { name: 'Short', value: previousTrades.filter((trade) => trade.strategy === 'Short').length },
      ];
    
      const spotSizeData = previousTrades
        .filter((trade) => trade.type === 'Spot')
        .reduce((acc, trade) => {
          const size = parseFloat(trade.size);
          const sizeCategory = size > 50 ? 'Large' : size > 25 ? 'Medium' : 'Small';
          const existingCategory = acc.find((entry) => entry.name === sizeCategory);
    
          if (existingCategory) {
            existingCategory.value += 1;
          } else {
            acc.push({ name: sizeCategory, value: 1 });
          }
    
          return acc;
        }, []);
    
      const futuresSizeData = previousTrades
        .filter((trade) => trade.type === 'Futures')
        .reduce((acc, trade) => {
          const size = parseFloat(trade.size);
          const sizeCategory = size > 50 ? 'Large' : size > 25 ? 'Medium' : 'Small';
          const existingCategory = acc.find((entry) => entry.name === sizeCategory);
    
          if (existingCategory) {
            existingCategory.value += 1;
          } else {
            acc.push({ name: sizeCategory, value: 1 });
          }
    
          return acc;
        }, []);
    
      const exchangeData = previousTrades.reduce((acc, trade) => {
        const existingExchange = acc.find((entry) => entry.name === trade.exchange);
    
        if (existingExchange) {
          existingExchange.value += 1;
        } else {
          acc.push({ name: trade.exchange, value: 1 });
        }
    
        return acc;
      }, []);
    
      const totalSizeInTrades = previousTrades.reduce((acc, trade) => acc + parseFloat(trade.size), 0);
      const sizeInTradesData = [
        { name: 'In Trades', value: totalSizeInTrades },
        { name: 'Free', value: 100 - totalSizeInTrades },
      ];
    
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
    };

    const calculateChartData = () => {
        const longTrades = previousTrades.filter((trade) => trade.strategy === 'Long');
        const shortTrades = previousTrades.filter((trade) => trade.strategy === 'Short');
    
        const spotTrades = previousTrades.filter((trade) => trade.type === 'Spot');
        const spotAllocation = spotTrades.reduce((acc, trade) => {
          const assetEntry = acc.find((entry) => entry.asset === trade.asset);
          if (assetEntry) {
            assetEntry.size += parseFloat(trade.size);
          } else {
            acc.push({ asset: trade.asset, size: parseFloat(trade.size) });
          }
          return acc;
        }, []);
    
        const exchangeTrades = previousTrades.reduce((acc, trade) => {
          const exchangeEntry = acc.find((entry) => entry.exchange === trade.exchange);
          if (exchangeEntry) {
            exchangeEntry.size += parseFloat(trade.size);
          } else {
            acc.push({ exchange: trade.exchange, size: parseFloat(trade.size) });
          }
          return acc;
        }, []);
    
        const totalSize = previousTrades.reduce((acc, trade) => acc + parseFloat(trade.size), 0);
        const freeSize = 100 - totalSize;
    
        const longShortPerExchange = previousTrades.reduce((acc, trade) => {
            const exchangeEntry = acc.find((entry) => entry.exchange === trade.exchange);
            if (exchangeEntry) {
              if (trade.strategy === 'Long') {
                exchangeEntry.long += 1;
              } else {
                exchangeEntry.short += 1;
              }
            } else {
              acc.push({ exchange: trade.exchange, long: trade.strategy === 'Long' ? 1 : 0, short: trade.strategy === 'Short' ? 1 : 0 });
            }
            return acc;
          }, []);
        
          return { longTrades, shortTrades, spotAllocation, exchangeTrades, totalSize, freeSize, longShortPerExchange };
        };
        
        const chartData = calculateChartData();
        const legendFormatter = (value) => {
            if (value === 'long') {
              return 'Long';
            } else if (value === 'short') {
              return 'Short';
            } else {
              return value;
            }
          };
          
          

    return (
      <div>
        <Title>Trading Performance</Title>
        <Title level={3}>Open Trades</Title>
        <Table dataSource={previousTrades} columns={columns} rowKey="_id" />
        <div className={styles.row}>
        <div className={styles.container}>    
        <Title level={3}>Long vs Short</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={longShortData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {longShortData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        </div>
        <div className={styles.container}>    
        <Title level={3}>Spot Allocation</Title>
        <ResponsiveContainer width="50%" height={300}>
        <BarChart data={chartData.spotAllocation}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="asset"/>
            <YAxis tickFormatter={value => `${(value).toFixed(0)}%`} />
            <Tooltip />
            <Bar dataKey="size" fill="#8884d8" barSize={20} />
        </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
      <div className={styles.row}>
      <div className={styles.container}>    
        <Title level={3}>Exchange Allocation</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={exchangeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {exchangeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        </div>
        <div className={styles.container}>    
        <Title level={3}>Size in Trades vs Free</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sizeInTradesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {sizeInTradesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className={styles.container}>
        
        <Title level={3}>Long vs Short per Exchange</Title>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.longShortPerExchange}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="exchange" />
        <YAxis tickCount={10} tickFormatter={value => Math.round(value)} /> 
        <Legend formatter={legendFormatter} />
        <Bar dataKey="long" stackId="a" fill="#0088FE" />
        <Bar dataKey="short" stackId="a" fill="#FF8042" />
        </BarChart>

        </ResponsiveContainer>
        </div>
    </div>
    </div>
  );
};

export default TradingPerformance;

  