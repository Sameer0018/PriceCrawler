import React, { useState } from "react";

function Converttext() {
  const [fileContent, setFileContent] = useState(null);
  const [esimData, setEsimData] = useState(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        parseEsimData(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Parse eSIM data from the file content
  const parseEsimData = (data) => {
    const lines = data.split("\n");
    const plans = [];
    let i = 0;

    while (i < lines.length) {
      if (!lines[i].trim()) {
        i += 1;
        continue;
      }

      const plan = {};

      if (i < lines.length) {
        plan.popularity = lines[i].trim();
        i += 1;
      }

      if (i < lines.length) {
        plan.price = lines[i].trim();
        i += 1;
      }

      if (i < lines.length) {
        plan.data = lines[i].trim();
        i += 1;
      }

      if (i < lines.length) {
        plan.validity = lines[i].trim();
        i += 1;
      }

      if (i < lines.length) {
        plan.name = lines[i].trim();
        i += 1;
      }

      if (i < lines.length && lines[i].trim()) {
        plan.notes = lines[i].trim();
        i += 1;
      }

      if (Object.keys(plan).length > 1) {
        plans.push(plan);
      }
    }

    const result = { eSIM_plans: plans };
    setEsimData(result);
  };

  // Function to download the parsed JSON
  const handleDownload = () => {
    if (!esimData) return;

    const jsonBlob = new Blob([JSON.stringify(esimData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "esim_plans.json";
    link.click();
  };

  return (
    <div className="App">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">eSIM Plans Parser</h1>
  {/* Download Button */}
  {esimData && (
          <div className="mt-4">
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Download JSON
            </button>
          </div>
        )}
        {/* File input */}
        <div className="mb-4">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:bg-blue-500 file:text-white file:rounded-md file:border-none hover:file:bg-blue-600"
          />
        </div>

        {/* Show parsed data */}
        {esimData && (
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm text-gray-700">
              {JSON.stringify(esimData, null, 2)}
            </pre>
          </div>
        )}

        {/* Show a message if no file is uploaded */}
        {!fileContent && (
          <div className="mt-4 text-gray-500">Upload a .txt file to parse the eSIM plans.</div>
        )}

      
      </div>
    </div>
  );
}

export default Converttext;
