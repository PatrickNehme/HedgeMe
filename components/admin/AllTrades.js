import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, InputNumber, Button, DatePicker, Select, Space } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from '/components/admin/admin.module.css';


const { Option } = Select;
const { RangePicker } = DatePicker;

const AllTrades = () => {
  const [trades, setTrades] = useState([]);
  const [filters, setFilters] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [updatedTrade, setUpdatedTrade] = useState({});

  useEffect(() => {
    fetchTrades();
  }, [filters]);

  const fetchTrades = async () => {
    try {
      const response = await axios.get('/api/admin/trades', { params: filters });
      setTrades(response.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id) => {
    await updateTrade(id, updatedTrade);
    setEditingId(null);
  };

  const updateTrade = async (id, updatedTrade) => {
    try {
      await axios.put(`/api/admin/trades/${id}`, updatedTrade);
      fetchTrades();
    } catch (error) {
      console.error('Error updating trade:', error);
    }
  };

  const closeTrade = async (id) => {
    try {
      await axios.put(`/api/trades/${id}/close`);
      fetchTrades();
    } catch (error) {
      console.error('Error closing trade:', error);
    }
  };

  const columns = [
    {
      title: 'Trade ID',
      dataIndex: '_id',
      render: (text) => text.slice(0, 4),
    },
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      render: (_, record) => editableCell('exchange', record),
    },
    {
      title: 'Asset',
      dataIndex: 'asset',
      render: (_, record) => editableCell('asset', record),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_, record) => (
        editingId === record._id ? (
          <Select
            defaultValue={record.type}
            style={{ width: 120 }}
            onChange={(value) => setUpdatedTrade({ ...updatedTrade, type: value })}
          >
            <Option value="Futures">Futures</Option>
            <Option value="Spot">Spot</Option>
          </Select>
        ) : (
          record.type
        )
      ),
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      render: (_, record) => (
        editingId === record._id ? (
          <Select
            defaultValue={record.strategy}
            style={{ width: 120 }}
            onChange={(value) => setUpdatedTrade({ ...updatedTrade, strategy: value })}
          >
            <Option value="Long">Long</Option>
            <Option value="Short">Short</Option>
          </Select>
        ) : (
          record.strategy
        )
      ),
    },
    {
      title: 'Entry Price',
      dataIndex: 'entryPrice',
      render: (_, record) => editableCell('entryPrice', record, true),
    },
    {
      title: 'Stop Price',
      dataIndex: 'stopPrice',
      render: (_, record) => editableCell('stopPrice', record, true),
    },
    {
        title: 'Target Price',
        dataIndex: 'targetPrice',
        render: (_, record) => editableCell('targetPrice', record, true),
      },
      {
        title: 'Leverage',
        dataIndex: 'leverage',
        render: (_, record) => editableCell('leverage', record, true),
      },
      {
        title: 'Size (%)',
        dataIndex: 'size',
        render: (_, record) => editableCell('size', record, true),
      },      
      {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: 'Expected Profit (%)',
        dataIndex: 'expectedProfit',
        render: (_, record) => {
          const percentage =
            ((record.targetPrice - record.entryPrice) / record.entryPrice) *
            record.leverage *
            100;
          return percentage.toFixed(2);
        },
      },
      {
        title: 'Expected Loss (%)',
        dataIndex: 'expectedLoss',
        render: (_, record) => {
          const percentage =
            ((record.entryPrice - record.stopPrice) / record.entryPrice) *
            record.leverage *
            100;
          return percentage.toFixed(2);
        },
      },
      {
        title: 'R/R Ratio',
        dataIndex: 'rrRatio',
        render: (_, record) => {
          const profitPercentage =
            ((record.targetPrice - record.entryPrice) / record.entryPrice) *
            record.leverage;
          const lossPercentage =
            ((record.entryPrice - record.stopPrice) / record.entryPrice) *
            record.leverage;
          const rrRatio = profitPercentage / lossPercentage;
      
          const gcd = (a, b) => {
            if (b === 0) {
              return a;
            } else {
              return gcd(b, a % b);
            }
          };
      
          const divisor = gcd(Math.round(profitPercentage * 100), Math.round(lossPercentage * 100));
          const x = Math.round(profitPercentage * 100 / divisor);
          const y = Math.round(lossPercentage * 100 / divisor);
      
          return `${x}:${y}`;
        },
      },
      
      {
        title: 'Publisher',
        dataIndex: 'publisher',
        render: (_, record) => editableCell('publisher', record),
      },      
      {
        title: 'Status',
        dataIndex: 'status',
        render: (_, record) => (
          editingId === record._id ? (
            <Select
              defaultValue={record.status}
              style={{ width: 120 }}
              onChange={(value) => setUpdatedTrade({ ...updatedTrade, status: value })}
            >
              <Option value="Open">Open</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          ) : (
            record.status
          )
        ),
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        render: (_, record) => (
          editingId === record._id ? (
            <Button onClick={() => handleSave(record._id)}>
              <CheckOutlined />
            </Button>
          ) : (
            <Button onClick={() => handleEdit(record._id)}>
              <EditOutlined />
            </Button>
          )
        ),
      },
      {
        title: 'Close',
        dataIndex: 'close',
        render: (_, record) => (
          <Button onClick={() => closeTrade(record._id)} disabled={record.status === 'Closed'}>
            <CheckOutlined />
          </Button>
        ),
      },
    ];
  
    const editableCell = (field, record, formatDecimal = false) => {
        const formattedValue = formatDecimal ? parseFloat(record[field]).toFixed(2) : record[field];
      
        return editingId === record._id ? (
          <Input
            defaultValue={formattedValue}
            onChange={(e) =>
              setUpdatedTrade({ ...updatedTrade, [field]: e.target.value })
            }
          />
        ) : (
          formattedValue
        );
      };
      
  
    return (
      <div>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space>
            <label>Status:</label>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="">All</Option>
              <Option value="Open">Open</Option>
              <Option value="Closed">Closed</Option>
            </Select>
            <label>Type:</label>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <Option value="">All</Option>
              <Option value="Futures">Futures</Option>
              <Option value="Spot">Spot</Option>
            </Select>
            <label>Strategy:</label>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, strategy: value })}
            >
              <Option value="">All</Option>
              <Option value="Long">Long</Option>
            <Option value="Short">Short</Option>
            </Select>
            <label>Date Created:</label>
            <RangePicker
              format="YYYY-MM-DD"
              onChange={(dates, dateStrings) => {
                setFilters({
                  ...filters,
                  dateFrom: dateStrings[0],
                  dateTo: dateStrings[1],
                });
              }}
            />
          </Space>
          <Table dataSource={trades} columns={columns} rowKey="_id" scroll={{ x: 'max-content' }} />
        </Space>
      </div>
    );
  };
  
  export default AllTrades;
    