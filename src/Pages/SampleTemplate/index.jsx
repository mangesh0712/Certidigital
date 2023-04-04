import React, { useState, useEffect } from "react";
import { Form, Upload, Button, Table, Space, Modal, Input, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRightOutlined } from "@ant-design/icons";
import "../../Styles/sampleTemplate.css";

const SampleTemplate = () => {
  const [fname, setFName] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  const addTemplateData = (e) => {
    e.preventDefault();
    console.log("file: ", file);

    var formData = new FormData();
    formData.append("photo", file);
    // formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    fetch(
      "http://localhost:8080/template/uploadtemplate",
      {
        method: "POST",
      },
      formData,
      config
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data: ", data);
      });
    // if (res.data.status === 401 || !res.data) {
    //   console.log("errror");
    // } else {
    //   navigate("/templates");
    // }
  };

  // Tablesfunctions

  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/template/alltemplates"
    );

    console.log("response.data", response.data);
    setProducts(response.data.map((e) => ({ ...e, path: encodeURI(e.path) })));

    console.log(products);
  };
  // const [dataSource, setDataSource] = useState(data);
  const columns = [
    {
      title: "SL ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "15%",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "25%",
    },
    {
      title: "TEMPLATE",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: "30%",
      render: (text, record) => (
        <Image
          src={`http://localhost:8080/${record.path}`}
          // src={`/uploads/${record.path}`}
          width={80}
          // height={50}
          preview={{
            mask: <div style={{ background: "rgba(0, 0, 0, 0.5)" }} />,
          }}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      align: "center",
      width: "40%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{
              background: "#1F2937",
              color: "White",
            }}
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
          <Button
            style={{
              background: "#F94A29",
              color: "White",
            }}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
          <Button type="primary" onClick={() => handleAddField(record)}>
            Add Fields
          </Button>
        </Space>
      ),
    },
  ];
  const handleAddField = (record) => {
    navigate("/edit");
  };
  const handleDelete = async (record) => {
    await axios.delete(`http://localhost:8081/images/${record.id}`);
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
      await axios.put(
        `http://localhost:8081/images/${selectedProduct.id}`,
        values
      );
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
      {/* <h1 style={{ textAlign: "center" }}>Upload Template</h1> */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Form layout="inline">
          <h3 style={{ marginTop: "5px" }}>
            Upload Template <ArrowRightOutlined />{" "}
          </h3>
          <Form.Item name="name">
            <Input
              placeholder="Template Name"
              value={fname}
              onChange={setdata}
            />
          </Form.Item>
          <Form.Item name="image">
            <Input
              className="inputBox"
              id="image-upload"
              type="file"
              onChange={setimgfile}
              // accept="image/*"
              // style={{ display: "none" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={addTemplateData}>
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* <Table dataSource={tableData} columns={columns} /> */}
      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={products} size="small" />
        <Modal
          title="Edit Product"
          open={isModalVisible}
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
    </div>
  );
};

export default SampleTemplate;
