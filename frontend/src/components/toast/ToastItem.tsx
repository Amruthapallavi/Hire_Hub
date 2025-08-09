import React, { useEffect, useState } from "react";
import type { Toast } from "../../types/types";

interface ToastItemProps extends Toast {
  onRemove: () => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type,
  action,
  cancelAction,
  onRemove,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    if (!action && !cancelAction) {
      const timer = setTimeout(() => setShow(false), 2700);
      return () => clearTimeout(timer);
    }
  }, [action, cancelAction]);

  const wrappedAction = action
    ? {
        label: action.label,
        onClick: () => {
          action.onClick();
          onRemove();
        },
      }
    : undefined;

  const wrappedCancelAction = cancelAction
    ? {
        label: cancelAction.label,
        onClick: () => {
          cancelAction.onClick();
          onRemove();
        },
      }
    : undefined;

  const styles = {
    success: "bg-white border-l-4 border-green-500 text-[#072E4A]",
    error: "bg-white border-l-4 border-red-600 text-[#072E4A]",
    info: "bg-white border-l-4 border-[#072E4A] text-[#072E4A]",
  };

  const icons = {
    success: (
      <svg
        className="w-5 h-5 mr-2 flex-shrink-0"
        fill="none"
        stroke="#072E4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg
        className="w-5 h-5 mr-2 flex-shrink-0"
        fill="none"
        stroke="#072E4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    info: (
      <svg
        className="w-5 h-5 mr-2 flex-shrink-0"
        fill="none"
        stroke="#072E4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  return (
    <div
      className={`
        pointer-events-auto flex items-center justify-between rounded-md shadow-md px-5 py-3
        ${styles[type]}
        transform transition-all duration-300 ease-in-out
        ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
      `}
      style={{ minWidth: 280 }}
    >
      <div className="flex items-center">
        {icons[type]}
        <p className="text-sm font-medium select-text">{message}</p>
      </div>

      {(wrappedAction || wrappedCancelAction) && (
        <div className="flex space-x-2 ml-4">
          {wrappedAction && (
            <button
              onClick={wrappedAction.onClick}
              className="bg-[#072E4A] text-white px-3 py-1 rounded-md text-sm hover:bg-[#051e33] transition"
            >
              {wrappedAction.label}
            </button>
          )}
          {wrappedCancelAction && (
            <button
              onClick={wrappedCancelAction.onClick}
              className="bg-gray-200 text-[#072E4A] px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition"
            >
              {wrappedCancelAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
