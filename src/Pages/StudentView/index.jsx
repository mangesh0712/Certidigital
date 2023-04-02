
import React, { useState } from 'react'
import { Table } from 'antd';
import Papa from 'papaparse';


const Studentview = () => {
    const [data , setdata] = useState([]);
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const parsedData = Papa.parse(csvData, { header: true }).data;
      console.log(parsedData);
      setdata(parsedData)
    };
    reader.readAsText(file);
  };
 
  const columns = [
    {
      title: 'BATCH',
      dataIndex: 'Batch',
      key: 'Batch',
      align	:'center',
      with:100
    },
    {
      title: 'EMAIL',
      dataIndex: 'Email',
      key: 'Email',
      align	:'center',
      with:100
    },
    {
      title: 'NAME',
      dataIndex: 'Name',
      key: 'Name',
      align	:'center',
      with:100
    },
    {
      title: 'START-DATE',
      dataIndex: 'Start-date',
      key: 'Body',
      align	:'center',
      with:100
    },
    {
      title: 'END-DATE',
      dataIndex: 'End-date',
      key: 'Subject',
      align	:'center',
      with:100
    },
  ];
  return (
    <>
    <input type="file" onChange={handleUpload} />
    <Table dataSource={data} columns={columns} size="middle" />
    </>
  )
}

export default Studentview