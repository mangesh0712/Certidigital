import { Button, Drawer, Radio, Space,Form, Input, DatePicker, Typography } from 'antd';


import { useState } from 'react';


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const { Title } = Typography;
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Space>
        {/* <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group> */}
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
       
        placement={placement}
        width={400}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
         <Form
      name="certificate_generator"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={2}>Certificate Generator</Title>
      <Form.Item
        label="Field-1 for X direction"
        name="x"
        rules={[{ required: true, message: 'Please input recipient name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Field-2 for Y direction"
        name="y"
        rules={[{ required: true, message: 'Please input recipient name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Student Name"
        name="Student_name"
        rules={[{ required: true, message: 'Please input recipient name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Batch"
        name="Batch"
        rules={[{ required: true, message: 'Please input recipient name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Start Date"
        name="Start-date"
        rules={[{ required: true, message: 'Please select date!' }]}
      >
        
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="End Date"
        name="end-date"
        rules={[{ required: true, message: 'Please select date!' }]}
      >
        
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send to server
        </Button>
      </Form.Item>
    </Form>
      </Drawer>
    </>
  );
};
export default Sidebar;