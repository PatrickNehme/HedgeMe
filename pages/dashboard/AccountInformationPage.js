import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const { Title } = Typography;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AccountInformation = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [totalPnL, setTotalPnL] = useState(0); 


  useEffect(() => {
    const token = Cookie.get('token');
    if (!token) return;

    try {
      const { email } = jwt.decode(token);

      axios.get('/api/admin/funds/fund', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const userFund = res.data;
        if (userFund) {
          setUserInfo(userFund);
          axios.get('/api/dashboard/tier1-performance', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            const pnl = res.data.totalPnL;
            if (pnl) {
              setTotalPnL(pnl);
            } else {
              console.error('Invalid PnL:', pnl);
            }
          })
          .catch(err => console.error('Error fetching PnL:', err));
        }
      })
      .catch(err => console.error('Error fetching user fund:', err));
    } catch (error) {
      console.error('Error decoding token:', error);
    }
}, []);


  if (!userInfo) return <DashboardLayout><h2>Loading...</h2></DashboardLayout>;

  const data = [
    { name: 'Low Risk', value: Number(userInfo.lowRiskAllocation) },
    { name: 'Medium Risk', value: Number(userInfo.mediumRiskAllocation) },
    { name: 'High Risk', value: Number(userInfo.highRiskAllocation) },
  ].filter(({ value }) => value !== null && !isNaN(value));

  return (
    <DashboardLayout>
      <Row gutter={18}>
        <Col span={14}>
          <Card title="Fund Information">
            <Title level={4}>Fund Name: {userInfo.fundName}</Title>
            <Title level={4}>Balance: ${userInfo.initialBalance}</Title>
            {
              data && data.length > 0 &&
              <PieChart width={550} height={500}>
                <Pie
                  data={data}
                  cx={350}
                  cy={200}
                  labelLine={false}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                <Tooltip />
              </PieChart>
            }
              <Title level={4}>Total Profit and Loss: {totalPnL ? totalPnL.toFixed(2) : 'Calculating...'}%</Title>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="User Information">
            <Title level={4}>Email: {userInfo.email}</Title>
            {/* Add other user information here */}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default AccountInformation;
