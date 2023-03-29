

import { useState, useEffect } from 'react';
import { Image, Pagination } from 'antd';


const Alltemplate = () => {
    const [data, setData] = useState([]);
    const images = [
        { src: 'https://th.bing.com/th/id/OIP.x-jsFaVzCeRA4ZUuT7WrIQHaFu?w=249&h=192&c=7&r=0&o=5&pid=1.7', alt: 'Image 1', width: 300, height: 300 },
        { src: 'https://i.pinimg.com/736x/74/80/22/748022a9a37f3cbc181200ff48b97972.jpg', alt: 'Image 2', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.ACNGfdV4xlkDzij03NPjDwHaFC?pid=ImgDet&rs=1', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.ACNGfdV4xlkDzij03NPjDwHaFC?pid=ImgDet&rs=1', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.8OaVrtfGOmFnLPk5P2G7JQHaFv?pid=ImgDet&w=1300&h=1009&rs=1', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://radiosalesschool.com/wp-content/uploads/2015/06/263634-blank-certificate-borders-templates-free.png', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.2nID8rRskE_q7GeHXkFI5wHaGH?pid=ImgDet&rs=1', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://i.pinimg.com/originals/6e/f2/75/6ef275185644ab0b53b74fb764686367.jpg', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.KoONWvOUnYVHOzIN077-tAHaFA?pid=ImgDet&rs=1', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.sskyftBiJRRW8DfmPSkKhAHaFC?pid=ImgDet&rs=1', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://i.pinimg.com/736x/74/80/22/748022a9a37f3cbc181200ff48b97972.jpg', alt: 'Image 3', width: 300, height: 300 },
        { src: 'https://th.bing.com/th/id/OIP.DXGB0eQpgcR0OHyWAVcyywHaF6?pid=ImgDet&rs=1', alt: 'Image 3', width: 300, height: 300 },
      ];
      const [currentPage, setCurrentPage] = useState(1);
      const imagesPerPage = 10;
      const startIndex = (currentPage - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      const currentImages = images.slice(startIndex, endIndex);
    useEffect(() => {
      fetch('/api/templates')
        .then(response => response.json())
        .then(data => setData(data));
    }, []);
  return (
    <div style={{padding:"40px", backgroundColor:"rgb(112, 96, 159)"}}>
         {currentImages.map(image => (
          <Image src={image.src} alt={image.alt} width={250} height={270} />
         ))}
         <Pagination
            current={currentPage}
            pageSize={imagesPerPage}
            total={images.length}
            onChange={page => setCurrentPage(page)}
           
       />
    </div>
  )
}

export default Alltemplate