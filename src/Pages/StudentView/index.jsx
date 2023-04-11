import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "antd";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";

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
      }).catch((err)=>{
        console.log("err: ", err);
        
      })
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
          paddingLeft: "120px",
          minHeight: "60.8vh",
        }}
      >
        {
          Array.isArray(data) && data.length > 0
            ? data.map((item) => (
                <Card
                  hoverable
                  style={{
                    width: 350,
                    height: 300,
                  }}
                  cover={
                    <Image
                      src={`http://localhost:8080/student/certificateimages/${item.id}`}
                      alt={`${item.name}`}
                      preview={{
                        mask: (
                          <div style={{ background: "rgba(0, 0, 0, 0.5)" }} />
                        ),
                      }}
                    />
                  }
                >
                  <div style={{ display: "flex", gap: "100px" }}>
                    <Meta title={item.name} />
                    <Button>Share</Button>
                  </div>
                </Card>
              ))
            : null
          // <div style={{width:"100%"}}>
          //   <h3 style={{ textAlign: "center" }}>
          //     We do not have any certificate associated with your email address.
          //   </h3>
          // </div>
        }
      </div>
      <Footer />
    </div>
  );
}
export default Studentview;


{/* <Button onClick={showModal}>Share</Button>
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
</Modal> */}
