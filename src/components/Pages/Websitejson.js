import React, { useState } from 'react';

const Websitejson = () => {
  const [esimPlans, setEsimPlans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/json') {
      setLoading(true);
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);

          // Check if eSIM plans exist in the parsed data
          if (data.eSIM_plans) {
            setEsimPlans(data.eSIM_plans); // Set the eSIM plans
          } else {
            setError('eSIM plans not found in the uploaded file');
          }
        } catch (err) {
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
    } else {
      setError('Please upload a valid JSON file');
    }
  };

  // Handle JSON download
  const handleDownloadJson = () => {
    const jsonData = JSON.stringify({ eSIM_plans: filteredPlans }, null, 2); // Wrap the filtered plans in 'eSIM_plans'
    const blob = new Blob([jsonData], { type: 'application/json' }); // Create a Blob object
    const link = document.createElement('a'); // Create an invisible download link
    link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
    link.download = 'new_json.json'; // Set the file name
    link.click(); // Trigger the download
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter plans based on the selected providers (you can customize this part as per the actual requirements)
  const filteredPlans = esimPlans?.filter((plan) =>
    [plan.popularity, plan.price, plan.provider, plan.name, plan.notes, plan.data].some(
      (field) =>
        (field?.toLowerCase() || '').includes('airalo') ||
        (field?.toLowerCase() || '').includes('airhub') ||
        (field?.toLowerCase() || '').includes('gigsky') ||
        (field?.toLowerCase() || '').includes('nomad') ||
        (field?.toLowerCase() || '').includes('instabridge')||
        (field?.toLowerCase() || '').includes('unlimited')

    )
  ) || []; // Default to an empty array if esimPlans is null

  // Helper function to process the provider names
  const checkForProviders = (value) => {
    const lowerValue = value?.toLowerCase() || '';
    if (lowerValue.includes('airalo')) return 'Airalo';
    if (lowerValue.includes('airhub')) return 'Airhub';
    if (lowerValue.includes('gigsky')) return 'GigSky';
    if (lowerValue.includes('nomad')) return 'Nomad';
    if (lowerValue.includes('instabridge')) return 'Instabridge';
    if (lowerValue.includes('unlimited')) return 'Unlimited';
    return value || 'N/A'; // Default to 'N/A' if value is null/undefined
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">eSIM Plans</h1>

        {/* File Upload Input */}
        <div>
          <label htmlFor="file-upload" className="cursor-pointer text-blue-600">
            Upload your file
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            className="px-4 py-2 border rounded ml-2"
            style={{ display: 'none' }} // Hide the default file input
          />
          {fileName && <span className="ml-2 text-gray-600">{fileName}</span>}
        </div>

        {/* Button to trigger JSON download */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleDownloadJson}
        >
          Send Data to JSON
        </button>
      </div>

      {/* Display eSIM Plans in Table */}
      {filteredPlans.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Provider</th>
              <th className="px-4 py-2 border-b">Size/Data</th>
              <th className="px-4 py-2 border-b">Validity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Reference</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{checkForProviders(plan.name)}</td>
                <td className="px-4 py-2 border-b">{checkForProviders(plan.data)}</td>
                <td className="px-4 py-2 border-b">{checkForProviders(plan.validity)}</td>
                <td className="px-4 py-2 border-b">{checkForProviders(plan.price)}</td>
                <td className="px-4 py-2 border-b">{checkForProviders(plan.notes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No matching eSIM plans available</div>
      )}
    </div>
  );
};

export default Websitejson;
