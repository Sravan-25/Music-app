// components/ToastManager.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import Toast, { ToastProps } from './Toast';

interface ToastItem extends ToastProps {
  id: string;
}

export interface ToastContextType {
  showToast: (
    message: string,
    type: 'success' | 'error',
    duration?: number
  ) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

const ToastManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    message: string,
    type: 'success' | 'error',
    duration?: number
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export default ToastManager;
