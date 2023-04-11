

import React from 'react'
import "../../Styles/Templatedetail.css";
import {List,Card ,Layout,theme, Button  } from 'antd';

const TemplateDetail = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const CertificateDetails = () => {
        const certificate = {
          name: 'Certificate Name',
          issuer: 'Certificate Issuer',
          date: 'Certificate Date',
          details: ['Detail 1', 'Detail 2', 'Detail 3'],
        };
      
        return (
          <Card title="Certificate Details"  
          style={{
            width: 350,
            height:590,
          }} >
            <p><b>Certificate Name : </b>{certificate.name}</p>
            <p><b>Certificate Name : </b>{certificate.issuer}</p>
            <p><b>Certificate Name : </b>{certificate.date}</p>
          
            <Button style={{marginTop:"30px", marginLeft:"50px"}} type='primary'>Generate Certificate</Button>
          </Card>
        );
      };



  return (
    <div >
        <Layout>
            <Layout
            style={{

            }}>
                <Content style={{ margin: '15px 29px 0' }}>
                  <div style={{ padding: 12, minHeight: 560, background: colorBgContainer }}>
                    <img src="https://previews.123rf.com/images/andipanggeleng/andipanggeleng1706/andipanggeleng170600013/80860152-blank-certificate-template.jpg" width={930} height={510} alt="" />
                  </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
            </Layout>
            <Sider width={340}  style={{
              background: colorBgContainer,
            }}> 
                <CertificateDetails />
            </Sider>
       </Layout>
       
    </div>
  )
}

export default TemplateDetail