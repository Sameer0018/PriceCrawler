import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import eye icon from react-icons

const PriceCrawler = () => {
  const [esimPlans, setEsimPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("usa"); // Default to 'usa'
  const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility state
  const navigate = useNavigate();

  const handleNavigateDate = () => {
    navigate("/PriceCrawlerdate");
  };

  const fetchEsimPlans = async (country) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://crawler.clay.in/api/ScrapPrice/GetScrapPrice?country=${country.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch eSIM plans");
      }
      const data = await response.json();

      if (data.isSuccess) {
        setEsimPlans(data.scrapPriceModels); // Use the correct property from the response
      } else {
        setEsimPlans([]); // If no valid data, clear esimPlans
        setError("No data available for the selected country.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    fetchEsimPlans(country);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    fetchEsimPlans(selectedCountry);
  }, [selectedCountry]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const groupedData = esimPlans.reduce((acc, item) => {
    const provider = item.provider; // Use 'provider' directly from the API response
    if (!acc[provider]) acc[provider] = [];
    acc[provider].push(item);
    return acc;
  }, {});

  const dataSizes = [...new Set(esimPlans.map((item) => item.size_Data))];

  // Sort sizes in ascending order
  const sizeOrder = (a, b) => {
    const parseSize = (size) => {
      const unitMultiplier = { MB: 1, GB: 1000 };
      const match = size.match(/(\d+)(MB|GB)/);
      return match ? parseInt(match[1]) * unitMultiplier[match[2]] : Infinity;
    };
    return parseSize(a) - parseSize(b);
  };

  const sortedDataSizes = dataSizes.sort(sizeOrder);

  // Sort providers to ensure "Airhub" appears first
  const providers = Object.keys(groupedData).sort((a, b) =>
    a === "Airhub" ? -1 : b === "Airhub" ? 1 : a.localeCompare(b)
  );

  const getPriceStyle = (price) => {
    const numericPrice = parseFloat(price.replace("$", ""));
    if (numericPrice > 5.0) return "text-red-600 font-semibold";
    if (numericPrice <= 4.0) return "text-green-600 font-semibold";
    return "text-gray-700";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center">Price Comparison</h1>
     
      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h1 className="text-5xl font-bold mb-4">User Manual:</h1>
            <div className="text-sm space-y-4">
            <h3 className="font-semibold">How to Use</h3>
              <ul className="list-disc pl-5">
                <li><strong>View Default Data:</strong> By default, the table shows USA prices when the page loads.</li>
                <li><strong>Change Country:</strong> Use the dropdown to select a country. The table updates with the relevant competitor pricing.</li>
                <li><strong>Search Prices by Date:</strong> Click the "Date Search" button. Choose a date to load the data for that day.</li>
              </ul>
<h2 className="text-5xl font-semibold">Features</h2>
              <ul className="list-disc pl-5">
                <li><strong>Country Selection:</strong> Use the dropdown menu labeled "Select Country" to choose a country. Supported countries: USA, Japan, Canada, UK, Germany, Italy. The price table will update dynamically to show the data for the selected country.</li>
                <li><strong>Search by Date:</strong> Click the "Date Search" button. A date selection input will appear. Select a date to filter and view the price comparison data for that specific day.</li>
              </ul>
              
              
              <h3 className="font-semibold">Future Goals</h3>
              <ul className="list-disc pl-5">
                <li>Support for more countries.</li>
                <li>Option to update prices directly from the table to Airhub.</li>
              </ul>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={handleCloseModal}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown for country selection */}
      <div className="flex justify-between items-center gap-4 rounded-lg shadow-md">
        {/* Left section for Country selection */}
        <div className="flex flex-col mb-4 w-1/2">
          <label htmlFor="country" className="text-xl font-semibold mb-2">
            Select Country:
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="usa">USA</option>
            <option value="japan">Japan</option>
            <option value="canada">Canada</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="italy">Italy</option>
          </select>
        </div>
       
        {/* Right section for Date input and Search Button */}
        <div className="flex flex-col items-end w-1/2">
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleNavigateDate}
          >
            Date Search
          </button>
        </div>
        <div 
        onClick={handleOpenModal}
        className="flex flex-col items-end p-4 bg-blue-500 rounded-full cursor-pointer text-white hover:bg-blue-600"
      >
        <FaEye size={24} />
      </div>
      </div>

      {/* Table with data or no data message */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-4 border-b">Country</th>
            <th className="py-3 px-4 border-b">Data</th>
            {providers.map((provider) => (
              <th key={provider} className="py-3 px-4 border-b">
                {provider}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {esimPlans.length === 0 ? (
            <tr>
              <td colSpan={providers.length + 2} className="py-3 px-4 text-center text-gray-500">
                No data available for this country
              </td>
            </tr>
          ) : (
            sortedDataSizes.map((dataSize, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-transform: uppercase font-bold">{selectedCountry}</td>
                <td className="py-3 px-4 border-b font-bold">{dataSize}</td>
                {providers.map((provider) => {
                  const providerData = groupedData[provider].find(
                    (item) => item.size_Data === dataSize
                  );
                  return (
                    <td key={provider} className="py-3 px-4 border-b">
                      {providerData ? (
                        <>
                          <div>{providerData.validity}</div>
                          <div className={getPriceStyle(providerData.price)}>{providerData.price}</div>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PriceCrawler;
