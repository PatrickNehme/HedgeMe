import React from 'react';
import AdminDashboardLayout from '../../components/admin/AdminDashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import WithAuth from '../../components/WithAuth';
import { Table, Button } from 'antd'; // ant design for a nice table

const Uploads = () => {
    const [fileList, setFileList] = useState([]);

  
    useEffect(() => {
      axios.get('/api/admin/fetch-files').then(res => setFileList(res.data));
    }, []);

    async function deleteFile(filename) {
        const response = await fetch(`/api/admin/delete?filename=${filename}`, { method: 'DELETE' });
      
        if (response.ok) {
        axios.get('/api/admin/fetch-files').then(res => setFileList(res.data));
        } else {
          console.error(`Failed to delete file ${filename}`);
        }
      }
      
  
    const columns = [
        {
          title: 'File Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Upload Date',
          dataIndex: 'uploadDate',
          key: 'uploadDate',
          render: (text) => moment(text).format('LLL'),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <span>
            <Button type="primary" href={`/api/admin/download?filename=${record.name}`} download>
              Download
            </Button>
            <Button  type="link" onClick={() => deleteFile(record.name)}>
            Delete
            </Button>
            </span>
          ),
        },
      ];
      
  
    return (
        <AdminDashboardLayout>
      <div>
        <Table dataSource={fileList} columns={columns} rowKey="name" />
      </div>
      </AdminDashboardLayout>

    );
  }

export default WithAuth(Uploads, 'admin');
