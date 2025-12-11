'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  closeOnOutsideClick = true
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Escape 键关闭 Modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-fadeIn"
        onClick={closeOnOutsideClick ? onClose : undefined}
      />
      
      {/* Content */}
      <div className="bg-white rounded-[24px] w-full max-w-sm p-6 relative animate-scaleIn shadow-xl z-10">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
        >
          <X size={20} />
        </button>

        {title && (
          <h3 className="text-lg font-bold text-gray-900 text-center mb-4 mt-1">
            {title}
          </h3>
        )}

        <div className="text-gray-600">
          {children}
        </div>

        {footer && (
          <div className="mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

