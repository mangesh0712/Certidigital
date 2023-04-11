import React from "react";
import "../../Styles/Templatedetail.css";
import { List, Card, Layout, theme, Button, Table, message } from "antd";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const TemplateDetail = () => {
  let { id } = useParams();
  const navigate=useNavigate();

  const batchData = [
    { id: 1, batch: "Web 16", count: 141 },
    { id: 2, batch: "Web 19", count: 92 },
    { id: 3, batch: "Web 20", count: 108 },
  ];

  const columns = [
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
      align: "center",
      width: "15%",
      // sorter: (a, b) => a.id - b.id,
      render: (text) => <span style={{ color: "#F94A29",fontWeight:"600" }}>{text}</span>,
    },
    {
      title: "Total Certificates count",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: "25%",
    },
  ];

  const handleDownloadCSV = () => {
    fetch(`http://localhost:8080/certificate/samplecsv/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        message.success("Downloading the Sample CSV file", 1.5);
        setTimeout(() => {
          const url = URL.createObjectURL(data);
          const a = document.createElement("a");
          a.href = url;
          // let TemplateName = record?.name;
          a.download = `Sample.csv`;
          document.body.appendChild(a);
          a.click();
        }, 1000);
      })
      .catch((err) => {
        console.log("err: ", err);
        message.error("Error saving the fields");
      });
  };

  
  return (
    <>
      <div className="templateDetailMainContainer">
        <HamburgerNavbar />
        <div className="templateDetailContainer">
          <div className="leftSideCertificateImageBox">
            <img
              width={"100%"}
              src="/CourseComplitionBlankTemplate.jpg"
              alt="CourseComplitionBlankTemplate"
            />
          </div>
          <div className="rightSideDetailsContainer">
            <div className="submitcsvDiv">
              <Button
                type="primary"
                block
                style={{
                  fontWeight: 600,
                }}
                // disabled={showCsvButton}
                onClick={() => handleDownloadCSV()}
              >
                Download sample CSV
              </Button>
              <Button
                style={{
                  background: "#1F2937",
                  color: "White",
                  fontWeight: 600,
                }}
                type="primary"
                block
                onClick={() => navigate(`/bulkCertificates/${id}`)}
              >
                Generate Batch Certificate
              </Button>
            </div>
            <Table
              style={{ minHeight: "61.2vh" }}
              columns={columns}
              dataSource={batchData}
              rowKey={(record) => record.id}
              size="small"
              pagination={false}
            ></Table>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default TemplateDetail;

// import React from "react";
// import "../../Styles/Templatedetail.css";
// import { List, Card, Layout, theme, Button } from "antd";
// import HamburgerNavbar from "../../Components/HamburgerNavbar";
// import Footer from "../../Components/Footer";

// const TemplateDetail = () => {
//   const { Header, Content, Footer, Sider } = Layout;
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const CertificateDetails = () => {
//     const certificate = {
//       name: "Certificate Name",
//       issuer: "Certificate Issuer",
//       date: "Certificate Date",
//       details: ["Detail 1", "Detail 2", "Detail 3"],
//     };

//     return (
//       <Card
//         title="Certificate Details"
//         style={{
//           width: 350,
//           height: 590,
//         }}
//       >
//         <p>
//           <b>Certificate Name : </b>
//           {certificate.name}
//         </p>
//         <p>
//           <b>Certificate Name : </b>
//           {certificate.issuer}
//         </p>
//         <p>
//           <b>Certificate Name : </b>
//           {certificate.date}
//         </p>

//         <Button
//           style={{ marginTop: "30px", marginLeft: "20px" }}
//           type="primary"
//         >
//           Generate Certificate
//         </Button>
//       </Card>
//     );
//   };

//   return (
//     <div>
//       <HamburgerNavbar />
//       <Layout>
//         <Layout style={{}}>
//           <Content style={{ margin: "15px 29px 0" }}>
//             <div
//             // style={{
//             //   padding: 12,
//             //   minHeight: 560,
//             //   background: colorBgContainer,
//             // }}
//             >
//               <img
//                 src="https://previews.123rf.com/images/andipanggeleng/andipanggeleng1706/andipanggeleng170600013/80860152-blank-certificate-template.jpg"
//                 width={930}
//                 height={510}
//                 alt=""
//               />
//             </div>
//           </Content>
//           {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
//         </Layout>
//         <Sider
//           width={300}
//           style={{
//             marginTop: 15,
//             // background: colorBgContainer,
//           }}
//         >
//           <CertificateDetails />
//         </Sider>
//       </Layout>
//       <Footer />
//     </div>
//   );
// };

// export default TemplateDetail;
