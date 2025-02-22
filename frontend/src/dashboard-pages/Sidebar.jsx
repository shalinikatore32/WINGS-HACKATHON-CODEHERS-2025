import React, { useState } from "react";
import {
  FaBars,
  FaChartPie,
  FaCalendarAlt,
  FaRegRegistered ,
  FaPlus,
  FaUsers,
  FaTicketAlt,
  FaChartLine,
  FaRegCreditCard,
  FaUserPlus,
  FaFileUpload,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const menuItems = [
    { icon: <FaChartPie />, label: "Dashboard", path: "/dashboard" },
    {
     icon:<FaRegRegistered/>, label:"Registered", path:"/dashboard/registered"
    },
    {
      icon: <FaCalendarAlt />,
      label: "My Events",
      path: "/dashboard/my-events",
    },
    {
      icon: <FaPlus />,
      label: "Create Event",
      path: "/dashboard/create-event",
    },
    {
      icon: <FaRegCreditCard />,
      label: "Card Creation",
      path: "/dashboard/card-creation",
    },
    {
      icon: <FaUsers />,
      label: "Attendees",
      path: "/dashboard/attendees",
      children: [
        {
          icon: <FaUserPlus />,
          label: "Manually",
          path: "/dashboard/attendees/send-manual",
        },
        {
          icon: <FaFileUpload />,
          label: "Upload CSV File",
          path: "/dashboard/attendees/send-csv",
        },
        {
          icon: <FaPaperPlane />,
          label: "Send Invites",
          path: "/dashboard/attendees/send-invites",
        },
      ],
    },
    {
      icon: <FaTicketAlt />,
      label: "Ticket Sales",
      path: "/dashboard/ticket-sales",
    },
    {
      icon: <FaChartLine />,
      label: "Analytics & Reports",
      path: "/dashboard/analytics",
    },
   
  ];

  return (
    <div
      className={`bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col h-full shadow-lg ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-500">
        {!isCollapsed && <span className="text-xl font-semibold">Menu</span>}
        <button className="focus:outline-none">
          <FaBars />
        </button>
      </div>
      <nav className="flex flex-col p-2 space-y-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link to={item.path}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
            </Link>
            {!isCollapsed && item.children && (
              <div className="ml-6">
                {item.children.map((child, childIndex) => (
                  <Link to={child.path} key={childIndex}>
                    <SidebarItem
                      icon={child.icon}
                      label={child.label}
                      isCollapsed={isCollapsed}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, isCollapsed }) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-indigo-700 rounded-md cursor-pointer transition-colors duration-200 group">
      <div className="text-lg">{icon}</div>
      {!isCollapsed && (
        <span className="ml-4 text-white group-hover:text-gray-200">
          {label}
        </span>
      )}
    </div>
  );
}

export default Sidebar;