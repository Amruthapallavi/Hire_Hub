import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}

      <div className="fixed top-5 right-5 flex flex-col space-y-3 z-50 max-w-xs">
        {toasts.map(({ id, message, type }) => (
          <ToastItem key={id} type={type} message={message} />
        ))}
      </div>

      <style>{`
        @keyframes flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

const ToastItem = ({
  message,
  type,
}: {
  message: string;
  type: ToastType;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  // Wavy gradient backgrounds with flowing animation
  const bgFlows = {
    success:
      "bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 bg-[length:400%_400%] animate-flow",
    error:
      "bg-gradient-to-r from-red-500 via-rose-600 to-pink-600 bg-[length:400%_400%] animate-flow",
    info:
      "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-[length:400%_400%] animate-flow",
  };

  // Simple icons for each type
  const icons = {
    success: (
      <svg
        className="w-5 h-5 text-white mr-2 flex-shrink-0"
        fill="none"
        stroke="currentColor"
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
        className="w-5 h-5 text-white mr-2 flex-shrink-0"
        fill="none"
        stroke="currentColor"
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
        className="w-5 h-5 text-white mr-2 flex-shrink-0"
        fill="none"
        stroke="currentColor"
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
        pointer-events-auto flex items-center rounded-lg shadow-lg px-4 py-3 text-white
        ${bgFlows[type]}
        transform transition-all duration-300 ease-in-out
        ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
      `}
      style={{
        backgroundSize: "400% 400%",
        animationTimingFunction: "ease-in-out",
        animationDuration: "6s",
        animationIterationCount: "infinite",
        animationName: "flow",
      }}
    >
      {icons[type]}
      <p className="text-sm font-medium select-text">{message}</p>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
};
