import React from "react";

const Home = () => {
  return (
    <div>
      <h2 className="text-5xl font-bold mb-4">Home</h2>
      <div className="flex bg-[#272f36] text-[#ffffff] p-8 font-bold items-center gap-4">
        <span>Good afternoon, Sameer</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-gray-200 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold">SMS</h3>
          <p>Send messages to customers around the world</p>
        </div>
        <div className="p-6 bg-gray-200 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold">RCS (Beta)</h3>
          <p>Create interactive, app-like messages</p>
        </div>
        <div className="p-6 bg-gray-200 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold">Verification</h3>
          <p>Verify customers with SMS, Voice & Flash call</p>
        </div>
        <div className="p-6 bg-gray-200 rounded shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold">WhatsApp</h3>
          <p>Send WhatsApp messages</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
