import { useState } from "react";
import { Modal, Upload, Button, message, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const BulkCertificates = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [csvFile, setCsvFile] = useState("");

  const handleCsvFile = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUploadCSV = (e) => {
    console.log("csvFile: ", csvFile);

    const formData = new FormData();
    formData.append("csv", csvFile);
    formData.append("id", id);
    console.log("formdata", formData);

    fetch("http://localhost:8080/batchcertificate/certificate/batch", {
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
        message.success("CSV file uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading CSV file:", error);
        message.error("Error uploading CSV file!");
      });
  };

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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Form layout="inline" onFinish={handleUploadCSV}>
          <h3 style={{ marginTop: "5px" }}>
            Upload CSV File <ArrowRightOutlined />{" "}
          </h3>
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
