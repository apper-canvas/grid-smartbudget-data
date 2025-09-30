import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Header = () => {
  const navItems = [
    { path: "/", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/transactions", label: "Transactions", icon: "ArrowLeftRight" },
    { path: "/budget", label: "Budget", icon: "PiggyBank" },
    { path: "/goals", label: "Goals", icon: "Target" }
  ];
  
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg shadow-md">
              <ApperIcon name="Wallet" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SmartBudget
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <ApperIcon name={item.icon} size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200">
              <ApperIcon name="Bell" size={20} />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200">
              <ApperIcon name="Settings" size={20} />
            </button>
          </div>
        </div>
        
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <ApperIcon name={item.icon} size={18} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;