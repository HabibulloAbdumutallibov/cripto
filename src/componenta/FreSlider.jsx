import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Details({ datatime }) {

  const [time , setTime] = useState(datatime.price_change_24h_in_currency)

  const valuesArray = Object.values(time|| {});  
  console.log(datatime);


  function getTimeIntervals(count = valuesArray.length) {
    const now = new Date(); 
    const times = [];
  
    for (let i = 0; i < count; i++) {
      const newTime = new Date(now.getTime() - i * 40 * 60 * 1000);
      times.unshift(newTime.toLocaleTimeString()); 
    }
  
    return times;
  }
  
  const timeArray = getTimeIntervals(valuesArray.length); 
  console.log(timeArray);

  
  const dataa = {
    labels: timeArray,
    datasets: [
      {
        label: "Sotuvlar",
        data: valuesArray,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  function hendal24h(){
    setTime(datatime.price_change_24h_in_currency)
  }

  function hendal1d(){
    setTime(datatime.price_change_percentage_1y_in_currency)
  }

  function hendal247hd(){
    setTime(datatime.price_change_percentage_7d_in_currency)
  }

  function hendal241oy(){
    setTime(datatime.price_change_percentage_30d_in_currency)
  }
  return (
    <div className="bg-[#14161A] h-[91.1vh] w-full">
      { (
          <div>
              <Line data={dataa} />
              <div className="flex gap-3 justify-center items-center mt-5">
      <button
        className={`p-4 px-10 rounded ${
          time === datatime?.price_change_24h_in_currency ? "bg-green-600" : "bg-blue-600"
        }`}
        onClick={() => setTime(datatime?.price_change_24h_in_currency)}
      >
        24h_in_currency
      </button>

      <button
        className={`p-4 px-10 rounded ${
          time === datatime?.price_change_percentage_1y_in_currency ? "bg-green-600" : "bg-blue-600"
        }`}
        onClick={() => setTime(datatime?.price_change_percentage_1y_in_currency)}
      >
        1y_in_currency
      </button>

      <button
        className={`p-4 px-10 rounded ${
          time === datatime?.price_change_percentage_7d_in_currency ? "bg-green-600" : "bg-blue-600"
        }`}
        onClick={() => setTime(datatime?.price_change_percentage_7d_in_currency)}
      >
        7d_in_currency
      </button>

      <button
        className={`p-4 px-10 rounded ${
          time === datatime?.price_change_percentage_30d_in_currency ? "bg-green-600" : "bg-blue-600"
        }`}
        onClick={() => setTime(datatime?.price_change_percentage_30d_in_currency)}
      >
        30d_in_currency
      </button>
    </div>
          </div>
            
      ) }
    </div>
  );
}

export default Details;

