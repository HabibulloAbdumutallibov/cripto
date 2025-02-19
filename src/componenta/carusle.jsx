import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";  // ⬅️ useNavigate import qilindi

function BasicDemo(props) {
  const data = props.data;
  const navigate = useNavigate();  // ⬅️ navigate funksiyasini chaqirish

  const [products, setProducts] = useState([]);
  const [col, setCol] = useState(() => {
    const savedCol = localStorage.getItem("col");
    return savedCol ? JSON.parse(savedCol) : [];  
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setProducts(data);
    }
  }, [data]);

  function handleNav(value) {
    const copied = [...col, { id: value }];
    setCol(copied);
    localStorage.setItem("col", JSON.stringify(copied));
    navigate("/full", { state: { data: value } });  // ⬅️ navigate ishlatilmoqda
  }

  const productTemplate = (item) => {
    return (
      <div onClick={() => handleNav(item.id)} className="text-current flex gap-4 justify-between items-center flex-col">
        <img src={item.image} alt={item.name} className="w-30 shadow-2" />
        <h3 className="text-white">{item.name}</h3>
        <p className={item.ath_change_percentage > 0 ? 'text-green-500' : 'text-red-500'}>{item.ath_change_percentage}</p>
      </div>
    );
  };

  const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 }
  ];

  return (
    <div className="container mx-auto p-20 bacc">
      <Carousel
        value={products}
        numVisible={5}
        numScroll={1}
        itemTemplate={productTemplate}
        autoplayInterval={2000}
        responsiveOptions={responsiveOptions}
        circular={false} 
      />
    </div>
  );
}

export default BasicDemo;
