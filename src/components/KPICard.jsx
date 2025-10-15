import React from 'react';

const KPICard = ({ title, value, unit, icon, color = "blue", subtitle, trend, trendValue }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200", 
      text: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600", 
      iconBg: "bg-green-100"
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-600",
      iconBg: "bg-yellow-100"
    },
    purple: {
      bg: "bg-purple-50", 
      border: "border-purple-200",
      text: "text-purple-600",
      iconBg: "bg-purple-100"
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`${currentColor.bg} ${currentColor.border} border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
          <div className="mt-2 flex items-baseline">
            <p className={`text-3xl font-bold ${currentColor.text}`}>
              {value}
            </p>
            {unit && (
              <span className="ml-1 text-lg font-medium text-gray-500">
                {unit}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                {trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '➡️'} {trendValue}
              </span>
              <span className="text-xs text-gray-500 ml-1">since last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`${currentColor.iconBg} rounded-lg p-3`}>
            <div className={`text-2xl ${currentColor.text}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;