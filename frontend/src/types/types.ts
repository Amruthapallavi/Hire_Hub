export type ToastType = "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  action?: ToastAction;
  cancelAction?: ToastAction;
}
