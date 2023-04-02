import { useState,useEffect } from 'react';
import { Table, Button, Space,Modal,Input, Form,Image} from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"

const Alltemplate = () => {

  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/images');
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
        <Image src={record.image} 
        width={80}
        height={50}
        preview={{
          mask: <div style={{ background: 'rgba(0, 0, 0, 0.5)' }} />,
        }} 
         />
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
    await axios.delete(`http://localhost:8080/images/${record.id}`);
    fetchProducts();
  };

  const handleEdit = (record) => {
    setSelectedProduct(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:8080/images/${selectedProduct.id}`, values);
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>

      <div style={{float:"right"}}> <Link to={'/uploadtemplate'}><Button align="right">Upload Template</Button></Link></div>
        
       <Table columns={columns} dataSource={products} size='small'/>
       <Modal
        title="Edit Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
   
  )

}
export default Alltemplate