import React, { useState } from 'react';

const Uploadjsondb = () => {
  const [esimPlans, setEsimPlans] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showCountryInput, setShowCountryInput] = useState(false);
  const [error, setError] = useState('');

  // Handle file upload and reading
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setEsimPlans(data.eSIM_plans || []);
        setError('');
      } catch (err) {
        setError('Invalid JSON file.');
        console.error(err);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file.');
    };

    reader.readAsText(file);
  };

  // Group data by provider
  const groupedData = esimPlans.reduce((acc, item) => {
    const provider = item.name.split(' - ')[0];
    if (!acc[provider]) acc[provider] = [];
    acc[provider].push(item);
    return acc;
  }, {});

  // Extract unique data sizes
  const dataSizes = [...new Set(esimPlans.map((item) => item.data))];

  // Extract unique providers
  const providers = Object.keys(groupedData);

  // Save data to the API
  const saveToApi = async (data) => {
    const apiUrl = 'https://crawler.clay.in/api/ScrapPrice/InsertorUpdateScrapPrice';

    const uniqueNumber = Date.now() + Math.floor(Math.random() * 1000);
    const uniqueUrl = `https://example.com/${data.provider}-${data.sizeData}-${uniqueNumber}`;

    const requestBody = {
      id: 0,
      savedDate: new Date().toISOString(),
      country: selectedCountry, // Use the selected country here
      url: uniqueUrl,
      content: data.notes || '',
      provider: data.provider,
      size_Data: data.sizeData,
      validity: data.validity,
      price: data.price,
      reference: data.reference,
      createdBy: 'system',
      updatedBy: 'system',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      console.log(`Data for ${data.provider} saved successfully!`);
    } catch (err) {
      console.error(`Error saving data for ${data.provider}:`, err);
    }
  };

  // Handle saving the data
  const handleSaveData = () => {
    if (!selectedCountry) {
      setShowCountryInput(true);
      return;
    }

    esimPlans.forEach((plan) => {
      const provider = plan.name.split(' - ')[0];
      const dataSize = plan.data;
      const providerData = groupedData[provider].find((item) => item.data === dataSize);

      if (providerData) {
        const data = {
          provider: provider,
          sizeData: dataSize,
          validity: providerData.validity,
          price: providerData.price,
          reference: providerData.name,
          notes: providerData.notes || 'No notes available',
        };

        saveToApi(data);
      }
    });
  };

  // Handle setting the country and closing the input modal
  const handleCountrySubmit = () => {
    if (!selectedCountry.trim()) {
      alert('Please enter a valid country.');
      return;
    }
    setShowCountryInput(false);
    handleSaveData();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Upload and Save Data Plans</h2>

      {/* File upload input */}
      <div className="mb-4">
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
          Upload JSON File:
        </label>
        <input
          type="file"
          id="fileUpload"
          accept="application/json"
          onChange={handleFileUpload}
          className="mt-2"
        />
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Country input modal */}
      {showCountryInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Enter Country</h3>
            <input
              type="text"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Enter country name"
            />
            <button
              onClick={handleCountrySubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg mr-2"
            >
              Submit
            </button>
            <button
              onClick={() => setShowCountryInput(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display table if data is loaded */}
      {esimPlans.length > 0 && (
        <>
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

          <button
            onClick={handleSaveData}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save Data to API
          </button>
        </>
      )}
    </div>
  );
};

export default Uploadjsondb;
