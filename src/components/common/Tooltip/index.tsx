import React, { useState } from "react";

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 flex flex-col items-center">
          {/* whitespace-nowrap заставляет блок растянуться на всю ширину текста */}
          <span className="bg-gray-800 text-white text-xs rounded-md px-3 py-1.5 shadow-lg whitespace-nowrap block">
            {text}
          </span>
          {/* Стрелочка тултипа */}
          <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
