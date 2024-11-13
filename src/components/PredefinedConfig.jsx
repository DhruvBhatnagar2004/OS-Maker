// PresetCard.jsx
import React from "react";

const PresetCard = ({ title, description, color, isDefault }) => {
  return (
    <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
      <label className="label cursor-pointer flex justify-between items-center">
        <div>
          <span className="label-text text-white text-lg font-medium">
            {title}
          </span>
          <p className="text-gray-300 text-sm mt-1">
            {description}
          </p>
        </div>
        <input
          type="radio"
          name="predefined"
          className={`radio checked:bg-${color}-500 w-5 h-5`}
          defaultChecked={isDefault}
        />
      </label>
    </div>
  );
};

// PredefinedConfig.jsx
const presetConfigs = [
  {
    title: "Minimal",
    description: "Basic system with essential packages only",
    color: "red",
    isDefault: true
  },
  {
    title: "Standard", 
    description: "Balanced configuration for daily use",
    color: "blue",
    isDefault: false
  },
  {
    title: "Workstation",
    description: "Development environment with tools and utilities", 
    color: "violet",
    isDefault: false
  }
];

const PredefinedConfig = () => {
  return (
    <div className="mt-8 rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-2xl mb-6 text-white font-semibold text-center">
        Predefined Configurations
      </h2>
      <div className="flex space-x-4 justify-center">
        {presetConfigs.map((config) => (
          <PresetCard
            key={config.title}
            title={config.title}
            description={config.description}
            color={config.color}
            isDefault={config.isDefault}
          />
        ))}
      </div>
    </div>
  );
};

export default PredefinedConfig;