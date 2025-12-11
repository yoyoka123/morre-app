'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Check, Info, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', isVisible, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none animate-fadeIn">
      <div className={cn(
        "flex flex-col items-center justify-center p-4 min-w-[120px] max-w-[200px] rounded-2xl shadow-xl backdrop-blur-md",
        "bg-black/75 text-white"
      )}>
        <div className="mb-2">
          {type === 'success' && <Check size={32} className="text-white" />}
          {type === 'error' && <AlertCircle size={32} className="text-white" />}
          {type === 'info' && <Info size={32} className="text-white" />}
        </div>
        <p className="text-sm font-medium text-center">{message}</p>
      </div>
    </div>
  );
}

