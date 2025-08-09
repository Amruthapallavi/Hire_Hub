import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

import type { Toast, ToastType, ToastAction } from "../../types/types";
import { ToastItem } from "./ToastItem";

interface ToastContextType {
  toasts: Toast[];
  showToast: (
    message: string,
    type?: ToastType,
    action?: ToastAction,
    cancelAction?: ToastAction
  ) => number;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (
    message: string,
    type: ToastType = "info",
    action?: ToastAction,
    cancelAction?: ToastAction
  ): number => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, action, cancelAction }]);

    if (!action && !cancelAction) {
      setTimeout(() => removeToast(id), 3000);
    }

    return id;
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}

      <div className="fixed top-5 right-5 flex flex-col space-y-3 z-50 max-w-xs">
        {toasts.map(({ id, message, type, action, cancelAction }) => (
          <ToastItem
            key={id}
            id={id}
            type={type}
            message={message}
            action={action}
            cancelAction={cancelAction}
            onRemove={() => removeToast(id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
