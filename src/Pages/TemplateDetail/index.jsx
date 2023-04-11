import React from "react";
import "../../Styles/Templatedetail.css";
import { List, Card, Layout, theme, Button, Table } from "antd";
import HamburgerNavbar from "../../Components/HamburgerNavbar";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const TemplateDetail = () => {

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
      render: (text, record) => (
        <Link to={`/templatedetail/${record.id}`}>{text}</Link>
      ),
    },
  ];

  
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
            {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h3>Web 16: </h3>
              <h3>30</h3>
            </div> */}
            <Table
              style={{ minHeight: "61.2vh" }}
              columns={columns}
              // dataSource={templates}
              rowKey={(record) => record.id}
              size="small"
              // pagination={{
              //   current: page,
              //   pageSize: pageSize,
              //   onChange: (page, pageSize) => {
              //     setPage(page);
              //     setpageSize(pageSize);
              //   },
              // }}
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
