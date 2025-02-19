import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tablet({ data }) {
  const [col, setCol] = useState(() => {
    const savedCol = localStorage.getItem("col");
    return savedCol ? JSON.parse(savedCol) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleNav(value) {
    const copied = [...col, { id: value }];
    setCol(copied);
    localStorage.setItem("col", JSON.stringify(copied));
    navigate("/full", { state: { data: value } });
  }

  return (
    <div className="container mx-auto">
      <div className="py-5 flex flex-col gap-2 text-center">
        <h1 className="text-6xl text-blue-400">CRYPTOFOLIO WATCH LIST</h1>
        <p className="text-white">Get all the Info regarding your favorite Crypto Currency</p>
        <div className="w-full p-4 border rounded border-amber-50">
          <input type="text" className="outline w-full" placeholder="Search name" />
        </div>
      </div>

      <div className="container mx-auto">
        <table className="w-full text-white">
          <thead className="bg-blue-400">
            <tr>
              <th className="border border-gray-300 p-2">Coin</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">24h Change</th>
              <th className="border border-gray-300 p-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item) => (
              <tr 
                key={item.id} 
                className="border border-gray-300 hover:bg-gray-700 transition duration-200 cursor-pointer"
                onClick={() => handleNav(item.id)}
              >
                <td className="p-2 flex items-center gap-2">
                  <img className="w-8 h-8" src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p className={item.ath_change_percentage > 0 ? "text-green-500" : "text-red-500"}>
                      {item.ath_change_percentage.toFixed(2)}%
                    </p>
                  </div>
                </td>
                <td className="border-b border-gray-300 p-2">₹{item.low_24h}</td>
                <td className="p-2 flex gap-4">
                  <span className={item.atl > 0 ? "text-green-500" : "text-red-500"}>
                    {item.atl > 0 ? "+" : ""}
                    {item.atl.toFixed(2)}
                  </span>
                </td>
                <td className="border-b border-gray-300 p-2">${item.market_cap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button 
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50" 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <button 
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50" 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Tablet;
