
import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Button, Table } from 'antd';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

const SampleTemplate = () => {
  const [fname, setFName] = useState("");
  const [file, setFile] = useState("");
  
   const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  }

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    const res = await axios.post("http://localhost:8080/images", formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log("errror")
    } else {
      history("/templates")
    }
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Upload Template</h1>
      <Form>
      <div style={{width:"500px",height:"200px",margin:"auto",border:"1px solid black",padding:"30px", marginTop:"10px",backgroundColor:"black"}}>
        <Form.Item name="name">
            <Input placeholder="Name" value={fname} onChange={setdata} /> 
        </Form.Item>
          <Form.Item name="image">
        
              <Input
                id="image-upload"
                type="file"
                onChange={setimgfile}
                // accept="image/*"
                // style={{ display: "none" }}
              />
          
        </Form.Item>
        <Form.Item>
          <Button variant="contained" style={{marginLeft:"180px"}} onClick={addUserData} >
            SUBMIT
          </Button>
        </Form.Item>
        </div>
        
      </Form>
      {/* <Table dataSource={tableData} columns={columns} /> */}
    </div>
  );
};

export default SampleTemplate;



