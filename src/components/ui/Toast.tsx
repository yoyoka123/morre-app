'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex flex-col gap-2 pointer-events-none items-center w-full max-w-xs px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "bg-black/80 backdrop-blur-md text-white px-4 py-3 rounded-[16px] shadow-lg flex items-center gap-2 animate-fadeIn transition-all text-sm font-medium",
              toast.type === 'error' && "bg-red-500/90",
              toast.type === 'success' && "bg-[#1f1f1f]/90"
            )}
          >
            {toast.type === 'success' && <Check size={16} className="text-green-400" />}
            {toast.type === 'error' && <X size={16} />}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

