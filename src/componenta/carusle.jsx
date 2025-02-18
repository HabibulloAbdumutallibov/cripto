import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";

function BasicDemo(props) {
  const data = props.data;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setProducts(data);
    }
  }, [data]);



  const productTemplate = (item) => {
    return (
      <div className="text-current flex gap-4 justify-between items-center flex-col">
        <img src={item.image} alt={item.name} className="w-30 shadow-2" />
        <h3 className="text-white">{item.name}</h3>
        <p className={item.ath_change_percentage > 0 ? 'text-green-500' : 'text-red-500'}>{item.ath_change_percentage}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-20 bacc">
      <Carousel
        value={products}
        numVisible={4}
        numScroll={1}
        itemTemplate={productTemplate}
        autoplayInterval={2000}
      />
    </div>
  );
}

export default BasicDemo;
