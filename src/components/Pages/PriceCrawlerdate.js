import React, { useState, useEffect } from "react";

const PriceCrawlerdate = () => {
  const [esimPlans, setEsimPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Japan"); // Default to 'usa'
  const [selectedDate, setSelectedDate] = useState("2024-12-09"); // Default to a specific date

  const fetchEsimPlans = async (country, date) => {
    setLoading(true);
    setError("");
    console.log('country, sale',country,date)
    try {
      const response = await fetch(
        `https://crawler.clay.in/api/ScrapPrice/GetScrapPriceBySavedDateAndCountry?savedDate=${date}&country=${country.toLowerCase()}`
      );
      console.log('Response status:', response.status); // Log the status
      if (!response.ok) {
        throw new Error("Failed to fetch eSIM plans");
      }
      const data = await response.json();

      if (data.isSuccess) {
        setEsimPlans(data.scrapPriceModels); // Directly use the fetched scrapPriceModels
      } else {
        setError("Failed to retrieve valid data");
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
    fetchEsimPlans(country, selectedDate); // Fetch data based on the selected country and date
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    fetchEsimPlans(selectedCountry, date); // Fetch data based on the selected date and country
  };

  useEffect(() => {
    fetchEsimPlans(selectedCountry, selectedDate); // Fetch on mount
  }, [selectedCountry, selectedDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const groupedData = esimPlans.reduce((acc, item) => {
    const provider = item.provider; // Group data by provider
    if (!acc[provider]) acc[provider] = [];
    acc[provider].push(item);
    return acc;
  }, {});

  const dataSizes = [...new Set(esimPlans.map((item) => item.size_Data))]; // Extract unique data sizes

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

        {/* Right section for Date input */}
        <div className="flex flex-col items-end w-1/2">
          <label htmlFor="date" className="text-xl font-semibold mb-2">
            Select Date:
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

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
          {sortedDataSizes.map((dataSize, index) => (
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
                        <div className={getPriceStyle(providerData.price)}>
                          {providerData.price}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceCrawlerdate;
