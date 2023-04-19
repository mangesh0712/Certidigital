import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "antd";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";

import { FacebookIcon, TwitterIcon, LinkedinIcon,WhatsappIcon } from "react-share";

function Studentview() {
  const [data, setData] = useState([]);
  const { Meta } = Card;
  const authDetails = JSON.parse(localStorage.getItem("authDetails"));
  let token = authDetails?.token;

  useEffect(() => {
    handleStudentCertificate();
  }, []);

  const handleStudentCertificate = () => {
    fetch("http://localhost:8080/student/certificate", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setData(data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div>
      <HamburgerNavbar />
      {Array.isArray(data) && data.length > 0 ? (
        <h3 style={{ textAlign: "center", height: "6vh" }}>
          Certificates you have achieved
        </h3>
      ) : (
        <h3 style={{ textAlign: "center", height: "6vh" }}>
          We do not have any certificate associated with your email address.
        </h3>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
          justifyContent: "center",
          minHeight: "57.9vh",
          marginBottom: 20,
        }}
      >
        {Array.isArray(data) && data.length > 0
          ? data.map((item) => (
              <Card
                key={item.id}
                hoverable
                style={{
                  width: "auto",
                  height: data.length <= 4 ? 330 : "auto",
                }}
                cover={
                  <Image
                    src={`http://localhost:8080/student/certificateimages/${item.id}`}
                    alt={`${item.batch}`}
                    style={{ width: 350 }}
                    preview={{
                      mask: (
                        <div style={{ background: "rgba(0, 0, 0, 0.5)" }} />
                      ),
                    }}
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    color: "green",
                  }}
                >
                  <Meta title={item.batch} />
                  {/* <Button>Share</Button> */}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ color: "#F94A29" }}>Share:</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "65%",
                    }}
                  >
                    <FacebookShareButton
                      url={`http://localhost:8080/student/certificateimages/${item.id}`}
                      quote={item.name}
                    >
                      <FacebookIcon round={true} size={40}></FacebookIcon>
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={`http://localhost:8080/student/certificateimages/${item.id}`}
                      title={item.name}
                    >
                      <WhatsappIcon round={true} size={40} />
                    </WhatsappShareButton>
                    <TwitterShareButton
                      url={`http://localhost:8080/student/certificateimages/${item.id}`}
                      title={item.name}
                    >
                      <TwitterIcon round={true} size={40} />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={`http://localhost:8080/student/certificateimages/${item.id}`}
                      title={item.name}
                    >
                      <LinkedinIcon round={true} size={40} />
                    </LinkedinShareButton>
                  </div>
                </div>
              </Card>
            ))
          : null}
      </div>
      <Footer />
    </div>
  );
}
export default Studentview;

{
  /* <Button onClick={showModal}>Share</Button>
<Modal
  open={visible}
  onCancel={handleCancel}
  footer={null}
  title="Share Certificate"
  backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
>
  <Row gutter={[16, 16]}>
    <Col span={8}>
      <FacebookShareButton
        url={`http://localhost:8080/student/certificateimages/${item.id}`}
        quote={item.name}
      >
        Facebook
      </FacebookShareButton>
    </Col>
    <Col span={8}>
      <TwitterShareButton
        url={`http://localhost:8080/student/certificateimages/${item.id}`}
        title={item.name}
      >
        Twitter
      </TwitterShareButton>
    </Col>
    <Col span={8}>
      <LinkedinShareButton
        url={`http://localhost:8080/student/certificateimages/${item.id}`}
        title={item.name}
      >
        LinkedIn
      </LinkedinShareButton>
    </Col>
  </Row>
</Modal> */
}
