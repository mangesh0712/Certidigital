import { useState,useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const Alltemplate = () => {

  // const data = [
  //   {
  //     key: '1',
  //     image: 'https://th.bing.com/th/id/OIP.x-jsFaVzCeRA4ZUuT7WrIQHaFu?w=249&h=192&c=7&r=0&o=5&pid=1.7',
  //     name: 'Template 1',
  //   },
  //   {
  //     key: '2',
  //     image: 'https://i.pinimg.com/736x/74/80/22/748022a9a37f3cbc181200ff48b97972.jpg',
  //     name: 'Template 2',
  //   },
  //   {
  //     key: '3',
  //     image: 'https://i.pinimg.com/originals/6e/f2/75/6ef275185644ab0b53b74fb764686367.jpg',
  //     name: 'Template 3',
  //   },
  //   {
  //     key: '4',
  //     image: 'https://i.pinimg.com/736x/74/80/22/748022a9a37f3cbc181200ff48b97972.jpg',
  //     name: 'Template 4',
  //   },
  // ];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/templates');
    setProducts(response.data);
    console.log(products)
  };
  // const [dataSource, setDataSource] = useState(data);
  const columns = [
    {
      title: 'IMAGE',
      dataIndex: 'image',
      key: 'image',
      align:'center',
      render: (text, record) => (
        <img src={record.image} alt="product image" style={{ width: '100px' }} />
      ),
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      align:'center',
    },
    {
      title: 'Action',
      key: 'action',
      align:'center',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(record)}>Delete</Button>
          <Button >Update</Button>
        </Space>
      ),
    },
  ];
  const handleDelete = async (record) => {
    await axios.delete(`http://localhost:8080/templates/${record.id}`);
    fetchProducts();
  };
  return (
    <div>
      
      <div style={{float:"right"}}><Button align="right">Upload Template</Button></div>
        
       <Table columns={columns} dataSource={products} size='middle'/>
    </div>
   
  )

}
export default Alltemplate