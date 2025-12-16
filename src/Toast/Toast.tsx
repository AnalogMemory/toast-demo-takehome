import React, { ReactNode, useEffect, useState } from 'react';
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react';

import { ToastVariant, type ToastProps } from './types';

const TOAST_SPACING = 8;  // Spacing between toasts in px
const TOAST_SCALE = 0.05; // Scale factor for toasts behind
const TOAST_ZINDEX = 100; // Z-index high for toasts

const ToastIcons: Record<ToastVariant, ReactNode | null> = {
  DEFAULT: null,
  INFO: <Info className="h-4 w-4 text-blue-500" />,
  SUCCESS: <CircleCheck className="h-4 w-4 text-green-500" />,
  ERROR: <CircleX className="h-4 w-4 text-red-500" />,
  WARNING: <TriangleAlert className="h-4 w-4 text-yellow-500" />,
};

export const Toast: React.FC<ToastProps & { onRemove: () => void }> = (props) => {
  const {
    message,
    onRemove,
    variant = ToastVariant.DEFAULT,
    order
  } = props;

  const [isMounted, setIsMounted] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const mountTimer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(mountTimer);
  }, []);

  const Icon = ToastIcons[variant];

  const isVisible = order !== undefined && order >= 0;

  // Default styles for hidden toasts
  let toastCalculatedStyle: React.CSSProperties = {
    position: "absolute",
    opacity: 0,
  }
  if (isVisible) {
    const offset = order * TOAST_SPACING;
    const translateY = isMounted ? offset : offset - 50;
    const scale = 1 - (order * TOAST_SCALE);
    const opacity = isMounted ? 1 : 0;

    toastCalculatedStyle = {
      opacity: isRemoving ? 0 : opacity,
      position: order === 0 ? "relative" : "absolute",
      transform: isRemoving ? `translateY(-100%) scaleY(0)` : `translateY(${translateY}px) scale(${scale})`,
      zIndex: TOAST_ZINDEX - order,
    };
  }

  const handleOnRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 400)
  };

  return (
    <div className="pointer-events-none w-98 bottom-0 origin-bottom transition-all duration-500 ease-in-out" style={toastCalculatedStyle}>
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg outline outline-black/5 transition">
          <div className="py-4 pl-4 pr-2">
            <div className="flex items-start space-x-4">
              {Icon !== null && (
                <div className="shrink-0 py-1">
                  {Icon}
                </div>
              )}
              <div className="flex-1">
                <p className="text-left text-sm font-medium text-gray-900 overflow-hidden line-clamp-3 text-ellipsis wrap-anywhere whitespace-normal">
                  {message}
                </p>
              </div>
              <div className="flex shrink-0">
                <button
                  type="button"
                  className="p-1 cursor-pointer focus:outline-2 focus:outline-gray-300 rounded group"
                  onClick={handleOnRemove}
                >
                  <X className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
Toast.displayName = 'Toast';
