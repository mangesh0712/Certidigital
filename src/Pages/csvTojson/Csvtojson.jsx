

import React, { useState } from 'react'
import { Table } from 'antd';
import Papa from 'papaparse';


const Csvtojson = () => {
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
  // const csvToObject = (csvData) => {
  //   const lines = csvData.split('\n');
  //   const headers = lines[0].split(',');
  //   const objectData = [];
  //   for (let i = 1; i < lines.length; i++) {
  //     const currentLine = lines[i].split(',');
  //     if (currentLine.length === headers.length) {
  //       const object = {};
  //       for (let j = 0; j < headers.length; j++) {
  //         object[headers[j]] = currentLine[j];
  //       }
  //       setdata(objectData.push(object));
  //     }
  //     console.log(data)
  //   }
  //   return objectData;  
  // };
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
      title: 'EMAIL-BODY',
      dataIndex: 'Email_body',
      key: 'Body',
      align	:'center',
      with:100
    },
    {
      title: 'EMAIL-SUBJECT',
      dataIndex: 'Email_subject',
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

export default Csvtojson