import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Row, Col} from 'antd';
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Bar, Legend, CartesianGrid, Label, Cell } from 'recharts';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';

function PerformanceReport() {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  const [trades, setTrades] = useState([]);

  const fetchPerformanceData = async () => {
    try {
      const tier3Res = await axios.get('/api/dashboard/tier1-performance');
      const tier3Performance = tier3Res.data.totalPnL;
      
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const week = Math.ceil(date.getDate() / 7);
      
      const tier12Res = await axios.get(`/api/admin/weekly-performance?month=${month}&year=${year}`);
      const weeklyPerformances = tier12Res.data;
      const currentWeekPerformance = weeklyPerformances[week - 1] || { tier1: 0, tier2: 0 };

      const data = {
        key: '1',
        tier1: currentWeekPerformance.tier1,
        tier2: currentWeekPerformance.tier2,
        tier3: tier3Performance,
      };

      const tradesRes = await axios.get('/api/admin/trades');
      setTrades(tradesRes.data);
      
      setPerformanceData([data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const columns = [
    {
        title: 'Tier 1 Performance',
        dataIndex: 'tier1',
        key: 'tier1',
        render: (value) => `${value}%`,
      },
      {
        title: 'Tier 2 Performance',
        dataIndex: 'tier2',
        key: 'tier2',
        render: (value) => `${value}%`,
      },
    {
      title: 'Tier 3 Performance',
      dataIndex: 'tier3',
      key: 'tier3',
      render: (value) => {
        const formattedValue = typeof value === 'number' ? value.toFixed(2) : '';
        return formattedValue ? `${formattedValue}%` : '';
      },
    },
  ];
  
  const tradesByStatus = [...new Set(trades.map(trade => trade.status))].map(status => ({
    name: status,
    value: trades.filter(trade => trade.status === status).length
  }));

  const tradesByStrategy = [...new Set(trades.map(trade => trade.strategy))].map(strategy => ({
    name: strategy,
    value: trades.filter(trade => trade.strategy === strategy).length
  }));

  const tradesByAsset = [...new Set(trades.map(trade => trade.asset))].map(asset => ({
    name: asset,
    value: trades.filter(trade => trade.asset === asset).length
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <AdminDashboardLayout>
      <Card title="Weekly Performance Report">
        <Table columns={columns} dataSource={performanceData} loading={loading} />

        <Row gutter={16}>
          <Col span={12}>
            <Card title="Trade Status Distribution" bordered={false}>
              <PieChart width={400} height={300}>
                <Pie dataKey="value" isAnimationActive={false} data={tradesByStatus} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {tradesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Strategy Distribution" bordered={false}>
              <BarChart width={400} height={300} data={tradesByStrategy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                  <Label value="Strategy" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label value="Count" angle={-90} position="insideLeft" offset={-5} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count" fill="#82ca9d" />
              </BarChart>
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
            <Col span={24}>
                <Card title="Asset Distribution" bordered={false}>
                <BarChart width={1000} height={300} data={tradesByAsset} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                    <Label value="Asset" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                    <Label value="Count" angle={-90} position="insideLeft" offset={-5} />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Quantity" fill="#82ca9d" />
                </BarChart>
                </Card>
            </Col>
            </Row>
      </Card>
    </AdminDashboardLayout>
  );
}

export default PerformanceReport;