import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>Good afternoon, Sameer</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Credits</button>
      </div>
    </div>
  );
};

export default Navbar;
