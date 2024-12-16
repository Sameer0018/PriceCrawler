import React, { useState, useEffect } from 'react';

const Filterdata = () => {
  const [esimPlans, setEsimPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  // Handle file upload and reading JSON
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    setError('');
    setFileName(file.name);

    try {
      // Read the JSON file
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result);
          setEsimPlans(jsonData.eSIM_plans); // Assuming the structure of the JSON is correct
        } catch (error) {
          setError('Invalid JSON format');
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Error reading the file');
        setLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // If data is still loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Group data by provider
  const groupedData = esimPlans.reduce((acc, item) => {
    const provider = item.name.split(' - ')[0]; // Extract provider name
    if (!acc[provider]) acc[provider] = [];
    acc[provider].push(item);
    return acc;
  }, {});

  // Extract the unique data sizes
  const dataSizes = [...new Set(esimPlans.map((item) => item.data))]; // Unique data sizes (e.g., 100MB, 1GB, etc.)

  // Extract the unique provider names (as columns)
  const providers = Object.keys(groupedData);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Mobile Data Plan Comparison</h2>

      {/* File Upload Input */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold">Upload eSIM Plans (JSON File)</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded"
        />
        {fileName && <p className="mt-2 text-sm text-gray-500">Selected file: {fileName}</p>}
      </div>

      {esimPlans.length === 0 && <p>No data available. Please upload a file.</p>}

      {esimPlans.length > 0 && (
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4 border-b">Data</th>
              {providers.map((provider) => (
                <th key={provider} className="py-3 px-4 border-b">{provider}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSizes.map((dataSize, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{dataSize}</td>
                {providers.map((provider) => {
                  const providerData = groupedData[provider].find((item) => item.data === dataSize);
                  return (
                    <td key={provider} className="py-3 px-4 border-b">
                      {providerData ? (
                        <>
                          <div className="font-semibold">{providerData.price}</div>
                          <div>{providerData.validity}</div>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Filterdata;
