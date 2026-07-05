import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setPosition({
      top: rect.top - 36,
      left: rect.left + rect.width / 2,
    });
  }, [isVisible]);

  const tooltipContent = isVisible
    ? createPortal(
        <div
          className="fixed z-50 flex flex-col items-center pointer-events-none"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: "translateX(-50%)",
          }}
        >
          <span className="bg-gray-800 text-white text-xs rounded-md px-3 py-1.5 shadow-lg whitespace-nowrap block">
            {text}
          </span>
          <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-800"></div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        ref={triggerRef}
        className="flex items-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {tooltipContent}
    </>
  );
};

export default Tooltip;
