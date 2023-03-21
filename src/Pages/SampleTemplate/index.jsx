import { Button, Form, Upload } from "antd";
import { UploadOutlined, RedoOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "../../Styles/sampleTemplate.css";

const SampleTemplate = () => {
    const [fileList,setFileList]=useState([])
  return (
    <div className="sampleTemplateContainer">
      <div className="sampleTemplateMainSection">
        <div className="templateUploadSection">
          <Form
            onFinish={(values) => {
              console.log({ values });
              console.log(fileList);
            }}
            layout="inline"
          >
            <Form.Item
              label="Sample Template"
              name={"sampleTemplate"}
              valuePropName="fileList"
              getValueFromEvent={(event) => {
                return event?.fileList;
              }}
              rules={[
                {
                  required: true,
                  message: "Please upload the sample template",
                },
                {
                  validator(_, fileList) {
                    return new Promise((resolve, reject) => {
                      if (fileList && fileList[0]?.size > 1000000) {
                        reject("File size exceeded");
                      } else {
                        resolve("Success");
                      }
                    });
                  },
                },
              ]}
            >
              <Upload
                maxCount={1}
                beforeUpload={(file) => {
                  return new Promise((resolve, reject) => {
                    if (file.size > 1000000) {
                      reject("File size exceeded");
                    } else {
                      resolve("Success");
                    }
                  });
                }}
                customRequest={(info) => {
                  setFileList([info.file]);
                }}
                showUploadList={false}
                accept=".png,.jpeg,.jpg,.pdf"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add Template
            </Button>
          </Form>
          {fileList[0]?.name}
        </div>
        <div>
          <img src={fileList[0]?.name} alt="" />
        </div>
      </div>
      <div className="sampleTemplateRightSection">
        <Button type="primary" icon={<RedoOutlined />}>Refresh</Button>
      </div>
    </div>
  );
};

export default SampleTemplate;
