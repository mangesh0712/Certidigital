import { useEffect, useState } from "react";
import { Modal, Upload, Button, message, Form, Input, Table } from "antd";
import { useParams } from "react-router-dom";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";

const BulkCertificates = () => {
  let { id } = useParams();
  const [batchName, setBatchName] = useState("");
  const [csvFile, setCsvFile] = useState("");
  const [mailData, setMailData] = useState([]);

  const handleBatchName = (e) => {
    const { value } = e.target;
    setBatchName(value);
  };

  const handleCsvFile = (e) => {
    setCsvFile(e.target.files[0]);
  };


  const handleUploadCSV = async (e) => {
    console.log("csvFile: ", csvFile);

    const formData = new FormData();
    formData.append("csv", csvFile);
    // formData.append("id", id);
    formData.append("batch", batchName);
    console.log("formdata", formData);

    try {
      const response = await fetch(
        `http://localhost:8080/batchcertificate/certificate/batch/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.text();

      console.log("data: ", data);
      message.success("CSV file uploaded successfully!");

      const mailData = await getMailStatus();
      setMailData(mailData);

      const interval = setInterval(async () => {
        const updatedMailData = await getMailStatus();
        setMailData(updatedMailData);

        if (!updatedMailData.some((item) => item.result === null)) {
          clearInterval(interval);
          console.log("Inside clear");
        } else {
          console.log("continue");
        }
      }, 2000);
    } catch (error) {
      console.error("Error uploading CSV file:", error);
      message.error("Error uploading CSV file!");
    }
  };

  const getMailStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/batchcertificate/email-status"
      );
      const data = await response.json();
      console.log("data: ", data);
      return data;
    } catch (err) {
      console.log("err: ", err);
      return [];
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "40%",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "result",
      width: "30%",
      align: "center",
      render: (result) => {
        return result === null ? (
          <LoadingOutlined />
        ) : // ) : result?.success ? (
        result?.accepted.length >= 1 || result?.success ? (
          <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} />
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
              // { min: 4, message: "name should be greater than 4 letters" },
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Table
          columns={columns}
          // dataSource={data}
          dataSource={mailData.map((row, index) => ({ ...row, key: index }))}
          style={{ width: "50%" }}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 415,
          }}
        />
      </div>
    </>
  );
};

export default BulkCertificates;
