
import React, { useEffect, useState } from 'react'
import axios from "axios";


import {dummyData} from '../../Data/data'

import { Button, Card } from 'antd';

function Studentview() {
  const [data, setData] = useState([]);
  const { Meta } = Card;
  
  useEffect(() => {
    // fetch('http://backend-api-url.com/data')
    //   .then(response => response.json())
    //   .then(data => setData(data))
    //   .catch(error => console.log(error));
    setData(dummyData)
  }, []);
  
  return (
    <div>
        <h1 style={{textAlign:"center"}}>Certificates you have achieved</h1>
        <div style={{display:"flex",flexWrap:"wrap",gap:"20px", marginTop:"20px",paddingLeft:"120px"}}>
          {data.map(item => (
            <Card
            hoverable
            style={{
              width: 350,
              height:340,
            }}
            cover={<img  alt="example" src={item.certImage} />}
          >
            <div style={{display:"flex",gap:"100px"}}>
            <Meta title={item.name} />
            <Button>Share</Button>
            </div>
            
          </Card>
          ))}
        </div>
    </div>
  );
}
export default Studentview
