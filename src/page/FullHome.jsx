import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FreSlider from "../componenta/FreSlider";
import { Home, Search, User } from "lucide-react";

function FullPage() {
  const location = useLocation();
  const { data } = location.state || {};

  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataTime, setDataTime] = useState(true);

  useEffect(() => {
    if (!data) return;

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${data}`)
      .then((response) => {
        setCoinData(response.data);
        setDataTime(response.data.market_data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data]);
  // console.log(coinData);
  // console.log(dataTime);

  if (!data) return <h1>Ma'lumot yo‘q</h1>;

  return (
    <div className="w-full p-4 flex bg-black  text-amber-50">
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : coinData ? (
        <div className="flex gap-2 ">
                 <div className=" p-4  w-3/12 border-r flex flex-col gap-6  border-r-amber-50 ">
            <div className="flex flex-col gap-3 justify-center items-center">
              <img
                className="w-30"
                src={coinData.image?.small}
                alt={coinData.name}
              />
              <h1 className="text-6xl">{coinData.name}</h1>
            </div>

            <p>
              Market Cap:{" "}
              {(() => {
                if (!coinData.description) return "Ma'lumot topilmadi";
                const desc = Object.values(coinData.description).find(
                  (desc) => desc.length > 0
                );
                return desc
                  ? desc.slice(0, 200) + (desc.length > 200 ? "..." : "")
                  : "Ma'lumot topilmadi";
              })()}
            </p>

            <p className="text-xl mt-4">Rank: {coinData.market_cap_rank}</p>
            <p className="text-xl">
              Current Price: ₹{coinData.market_data?.current_price?.inr}
            </p>
                  </div>
                 <div className=" p-4   w-full ">
                 <FreSlider datatime={dataTime}></FreSlider>
                 </div>
        </div>
      ) : (
        <p>Ma'lumot topilmadi</p>
      )}
    </div>
  );
}

export default FullPage;
