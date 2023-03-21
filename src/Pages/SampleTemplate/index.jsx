import { Button, Form, Upload } from "antd";
import {
  UploadOutlined,
  RedoOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "../../Styles/sampleTemplate.css";

const SampleTemplate = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    fetch("http://localhost:8080/images")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteImage = (id, image) => {
    fetch(`http://localhost:8080/images/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setImages(images.filter((image) => image.id !== id));
        if (image === selectedImage) {
          setSelectedImage(null);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

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
        <div className="fullSizeTemplateImageContainer">
          {selectedImage && (
            <div className="fullSizeTemplateImage">
              <img
                src={selectedImage}
                alt={selectedImage}
                width={"90%"}
                onClick={() => setSelectedImage(null)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="sampleTemplateRightSection">
        <div className="refreshButtonDiv">
          <Button type="primary" icon={<RedoOutlined />} onClick={getImages}>
            Refresh
          </Button>
        </div>
        <div className="sampleTemplateImages">
          {images.map((e, i) => (
            <div key={e.id} className="templateImageContainer">
              <img
                src={e.image}
                alt={e.image}
                width={"100%"}
                onClick={() => handleImageClick(e.image)}
              />
              <div
                className="templateImageDeleteIcon"
                onClick={() => handleDeleteImage(e.id, e.image)}
              >
                <DeleteOutlined />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleTemplate;
