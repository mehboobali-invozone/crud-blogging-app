import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      
      <Sidebar isOpen={isOpen} />

      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>
        
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
