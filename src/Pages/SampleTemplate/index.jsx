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
  const [refreshLoading, setRerfreshLoading] = useState(false);

  // useEffect(() => {
  //   getImages();
  // }, []);

  // const getImages = () => {
  //   setRerfreshLoading(true);
  //   setImages([]);
  //   setTimeout(() => {
  //     fetch("http://localhost:8080/images")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setImages(data);
  //         console.log(data);
  //         setRerfreshLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setRerfreshLoading(false);
  //       });
  //   }, 1000);
  // };

  // const handleDeleteImage = (id, image) => {
  //   fetch(`http://localhost:8080/images/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setImages(images.filter((image) => image.id !== id));
  //       if (image === selectedImage) {
  //         setSelectedImage(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  // };

  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  // };

  //localhost:8080/template/uploadtemplate

  // 'http://localhost:8080/template/uploadtemplate'

  const handleSubmitForm = (values) => {
    console.log("values: ", values);
    const formData = new FormData();
    // formData.append("image", values.sampleTemplate[0].originFileObj);
    formData.append("image", values.sampleTemplate[0]);

    fetch("http://localhost:8080/template/uploadtemplate", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("error",error);
      });
  };

  return (
    <div className="sampleTemplateContainer">
      <div className="sampleTemplateMainSection">
        <div className="templateUploadSection">
          <Form onFinish={handleSubmitForm} layout="inline">
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
                      if (fileList && fileList[0]?.size > 2000000) {
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
                    if (file.size > 2000000) {
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
                accept=".png,.jpeg,.jpg"
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
              <div>
                <img
                  src={selectedImage}
                  alt={selectedImage}
                  width={"90%"}
                  // onClick={() => setSelectedImage(null)}
                />
              </div>
              <div className="nextButtonDiv">
                <Button type="primary">Save & Next</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}

      <div className="sampleTemplateRightSection">
        <div className="refreshButtonDiv">
          <Button
            type="primary"
            icon={refreshLoading ? <LoadingOutlined /> : <RedoOutlined />}
            // onClick={getImages}
          >
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
                // onClick={() => handleImageClick(e.image)}
              />
              <div
                className="templateImageDeleteIcon"
                // onClick={() => handleDeleteImage(e.id, e.image)}
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
