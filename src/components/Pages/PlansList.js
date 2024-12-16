import React, { useState } from "react";


function PlansList() {
  // State to hold the uploaded JSON and transformed data
  const [jsonData, setJsonData] = useState(null);
  const [transformedData, setTransformedData] = useState(null);

  // Function to handle file input
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedData = JSON.parse(reader.result);
        transformData(parsedData);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  // Function to transform the data to the required format
  const transformData = (data) => {
    const transformed = data.eSIM_plans.map((plan) => {
      return {
        name: plan.name || "N/A",
        price: plan.price || "N/A",
        data: plan.data || "N/A",
        validity: plan.validity || "N/A",
      };
    });
    setJsonData(data);
    setTransformedData(transformed);
  };

  // Function to handle the download of transformed JSON data
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(transformedData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transformed_esim_plans.json";
    a.click();
    URL.revokeObjectURL(url); // Clean up after download
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Upload and Transform eSIM Plans</h1>

        {/* File Upload Section */}
        <div className="mb-6 text-center">
          <input
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        {/* Display Transformed Data */}
        {transformedData && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Data</th>
                  <th className="px-6 py-3 text-left">Validity</th>
                </tr>
              </thead>
              <tbody>
                {transformedData.map((plan, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{plan.name}</td>
                    <td className="px-6 py-4">{plan.price}</td>
                    <td className="px-6 py-4">{plan.data}</td>
                    <td className="px-6 py-4">{plan.validity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Download Button */}
        {transformedData && (
          <div className="mt-6 text-center">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            >
              Download Transformed JSON
            </button>
          </div>
        )}

        {/* Display Original JSON (optional) */}
        {jsonData && (
          <div className="mt-8 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Original JSON Data</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlansList;
