import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, Popconfirm, Input, Form} from 'antd';
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';

const AllFunds = () => {
  const [funds, setFunds] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    axios.get('/api/admin/funds')
      .then(res => setFunds(res.data.map((fund, idx) => ({ ...fund, key: idx }))))
      .catch(err => console.error(err));
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const [form] = Form.useForm();

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const save = async (key) => {
    const row = await form.validateFields();
    const newData = [...funds];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setFunds(newData);
      setEditingKey('');

      axios.put(`/api/admin/funds/${item._id}`, row)
        .catch(err => console.error(err));
    } else {
      newData.push(row);
      setFunds(newData);
      setEditingKey('');
    }
  };

  const deleteFund = async (key) => {
    const newData = [...funds];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1);
      setFunds(newData);

      axios.delete(`/api/admin/funds/${item._id}`)
        .catch(err => console.error(err));
    }
  };

  const columns = [
    {
      title: 'Fund Name',
      dataIndex: 'fundName',
      key: 'fundName',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Balance',
      dataIndex: 'initialBalance',
      key: 'initialBalance',
      editable: true,
      render: (_, record) => (
        isEditing(record)
          ? <InputNumber defaultValue={record.initialBalance} />
          : record.initialBalance
      ),
    },
    {
        title: 'Low Risk Allocation',
        dataIndex: 'lowRiskAllocation',
        key: 'lowRiskAllocation',
        editable: true,
        render: (_, record) => (
          isEditing(record)
            ? <InputNumber defaultValue={record.lowRiskAllocation} />
            : record.lowRiskAllocation
        ),
      },
      {
        title: 'Medium Risk Allocation',
        dataIndex: 'mediumRiskAllocation',
        key: 'mediumRiskAllocation',
        editable: true,
        render: (_, record) => (
          isEditing(record)
            ? <InputNumber defaultValue={record.mediumRiskAllocation} />
            : record.mediumRiskAllocation
        ),
      },
      {
        title: 'High Risk Allocation',
        dataIndex: 'highRiskAllocation',
        key: 'highRiskAllocation',
        editable: true,
        render: (_, record) => (
          isEditing(record)
            ? <InputNumber defaultValue={record.highRiskAllocation} />
            : record.highRiskAllocation
        ),
      },    
      {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 2 }}>
              <FiCheck />
            </a>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={cancel}
              okButtonProps={{ style: { color: '#000', backgroundColor: '#fff' } }}
              cancelButtonProps={{ style: { color: '#000', backgroundColor: '#fff' } }}
            >
              <a>
                <FiX />
              </a>
            </Popconfirm>
          </span>
          
        ) : (
            <span>
            <a disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 2 }}>
              <FiEdit />
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteFund(record.key)}
              okButtonProps={{ style: { color: '#000', backgroundColor: '#fff' } }}
              cancelButtonProps={{ style: { color: '#000', backgroundColor: '#fff' } }}
            >
              <a>
                <FiTrash2 />
              </a>
            </Popconfirm>
          </span>
          
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
  
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'initialBalance' || 
                   col.dataIndex === 'lowRiskAllocation' || 
                   col.dataIndex === 'mediumRiskAllocation' ||
                   col.dataIndex === 'highRiskAllocation' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  

  return (
    <AdminDashboardLayout>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={funds}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </AdminDashboardLayout>
  );
};

export default AllFunds;
