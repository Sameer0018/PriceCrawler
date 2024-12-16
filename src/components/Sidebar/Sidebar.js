import React from 'react';
import { FaHome, FaSms, FaFax, FaCog, FaHashtag } from 'react-icons/fa';
import { MdRssFeed, MdChat, MdOutlineCheckCircle, MdMic } from 'react-icons/md';
// import { SiSinch, SiElasticsip } from 'react-icons/si';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 h-screen p-5 border-r border-gray-200">
      <ul className="space-y-4">
        {/* Home */}
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <FaHome size={20} />
          <span>Home</span>
        </li>

        {/* Communication APIs */}
        <li className="mt-8 text-gray-500 uppercase text-sm font-semibold">Communication APIs</li>
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <FaSms size={20} />
          <span>SMS</span>
        </li>
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <MdRssFeed size={20} />
          <span>RCS <span className="text-yellow-600 text-xs bg-yellow-200 rounded px-2">BETA</span></span>
        </li>
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <MdChat size={20} />
          <span>Conversation API</span>
        </li>
        {/* <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <SiSinch size={20} />
          <span>Sinch Live Chat</span>
        </li> */}
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <FaHashtag size={20} />
          <span>Whatsapp</span>
        </li>
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <MdOutlineCheckCircle size={20} />
          <span>Verification</span>
        </li>
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <MdMic size={20} />
          <span>Voice & Video</span>
        </li>
        {/* <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <SiElasticsip size={20} />
          <span>Elastic SIP Trunking</span>
        </li> */}
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <FaFax size={20} />
          <span>Fax <span className="text-yellow-600 text-xs bg-yellow-200 rounded px-2">BETA</span></span>
        </li>
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600">
          <FaHashtag size={20} />
          <span>Numbers</span>
        </li>

        {/* Settings */}
        <li className="flex items-center text-gray-700 space-x-3 hover:text-blue-600 mt-8">
          <FaCog size={20} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
