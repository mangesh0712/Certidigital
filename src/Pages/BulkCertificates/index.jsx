import { useState } from "react";
import { Modal, Upload, Button, message, Form, Input, Table } from "antd";
import { useParams } from "react-router-dom";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";

const BulkCertificates = () => {
  let { id } = useParams();
  console.log("id: ", id);
  const [batchName, setBatchName] = useState("");
  const [csvFile, setCsvFile] = useState("");

  const handleBatchName = (e) => {
    const { value } = e.target;
    setBatchName(value);
  };

  const handleCsvFile = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUploadCSV = (e) => {
    console.log("csvFile: ", csvFile);

    const formData = new FormData();
    formData.append("csv", csvFile);
    // formData.append("id", id);
    formData.append("batch", batchName);
    console.log("formdata", formData);

    fetch(`http://localhost:8080/batchcertificate/certificate/batch/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok", response);
        // }
        return response.text();
      })
      .then((data) => {
        console.log("data: ", data);
        message.success("CSV file uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading CSV file:", error);
        message.error("Error uploading CSV file!");
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "35%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "45%",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
      align: "center",
      render: (status) => {
        return status ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        );
      },
    },
  ];
  const data = [];
  for (let i = 0; i < 1000; i++) {
    let status = Math.random() < 0.5 ? true : false;
    data.push({
      key: i,
      name: `Pankaj Kumar Ram ${i + 1}`,
      email: `pankajkr${i + 1}@gmail.com`,
      status: status,
    });
  }
  //   setCsvFile(null);

  // try {
  //   const response = await fetch("/api/certificates/bulk-generate", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }

  //   const data = await response.json();

  //   if (data.errors.length > 0) {
  //     // Display error details and allow user to download a CSV file with the error details
  //   } else {
  //     message.success(`${data.count} certificates generated successfully!`);
  //     setModalVisible(false);
  //   }
  // } catch (err) {
  //   console.error(err);
  //   message.error("An error occurred while generating certificates.");
  // }

  return (
    <>
      <HamburgerNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          // minHeight: "68vh",
        }}
      >
        <Form layout="inline" onFinish={handleUploadCSV}>
          <h3 style={{ marginTop: "5px" }}>
            Upload CSV File <ArrowRightOutlined />{" "}
          </h3>
          <Form.Item
            name="batch"
            rules={[
              {
                required: true,
                message: "Please enter batch name",
              },
              {
                whitespace: true,
                message: "Batch name cannot be empty spaces",
              },
              { min: 4, message: "name should be greater than 4 letters" },
            ]}
          >
            <Input
              className="inputBox"
              placeholder="Batch Name"
              id="image-upload"
              type="text"
              onChange={handleBatchName}
            />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "Please select file from your computer",
              },
            ]}
          >
            <Input
              className="inputBox"
              id="image-upload"
              type="file"
              accept=".csv"
              onChange={handleCsvFile}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Generate Certificates
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table
          columns={columns}
          dataSource={data}
          style={{ width: "50%" }}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 380,
          }}
        />
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <Button type="primary" htmlType="submit">
          Download all Failed Records
        </Button>
      </div>

      {/* <Footer /> */}
      {/* <Button type="primary" onClick={() => setModalVisible(true)}>
        Bulk Certificate Generation
      </Button>
      <Modal
        title="Bulk Certificate Generation"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="generate"
            type="primary"
            htmlType="submit"
            onClick={handleUpload}
            disabled={!csvFile}
          >
            Generate Certificates
          </Button>,
        ]}
        form={form}
      >
        <Form
          name="uploadCsv"
          onFinish={handleUpload}
          encType="multipart/form-data"
          form={form}
        >
          <Form.Item name="csv">
            <Input
              className="inputBox"
              id="image-upload"
              type="file"
              accept=".csv"
              onChange={handleCsvFile}
            />
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};

export default BulkCertificates;
