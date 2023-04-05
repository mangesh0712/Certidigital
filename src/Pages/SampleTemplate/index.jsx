import React, { useState, useEffect } from "react";
import { Form, message, Button, Table, Space, Modal, Input, Image } from "antd";
import { useNavigate } from "react-router-dom";
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

    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:8080/template/uploadtemplate", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("data: ", data);
        message.success("Template uploaded successfully!");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        message.success("Error uploading template!");
      });
  };


  // Tablesfunctions

  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8080/template/alltemplates")
      .then((res) => {
        // console.log("res.data: ", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
        message.error("Error loading templates");
      });
  };

  const columns = [
    {
      title: "SL ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "15%",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
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
          src={`http://localhost:8080/template/singletemplate/${record.id}`}
          width={80}
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

  const handleDelete = (record) => {
    axios
      .delete(`http://localhost:8080/template/deletetemplate/${record.id}`)
      .then((res) => {
        console.log("res: ", res);
        if (res.data === "Error deleting image from disk") {
          message.error("Error deleting image from disk");
        }
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error(error.message);
      });
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Form layout="inline">
          <h3 style={{ marginTop: "5px" }}>
            Upload Template <ArrowRightOutlined />{" "}
          </h3>
          <Form.Item name="image">
            <Input
              className="inputBox"
              id="image-upload"
              type="file"
              onChange={setimgfile}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={addTemplateData}>
              Upload
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={products}
          rowKey={(record) => record.id}
          size="small"
        ></Table>
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
