import { useCallback, useState } from 'react';

import type { ToastProps } from './Toast';
import { createDemoToast, Toaster } from './Toast';

import './App.css';

export default function App() {
  const [toasts, setToasts] = useState<ToastProps[]>(() => []);

  const addToast = useCallback(() => {
    setToasts(prevToasts => [...prevToasts, createDemoToast()]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <h1 className="text-balance text-6xl font-semibold text-gray-900">
          Peregrine Toasts
        </h1>

        <div className="flex items-center justify-center gap-x-6">
          <button
            onClick={addToast}
            className="cursor-pointer rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-gray-700"
          >
            Add Toast
          </button>
        </div>
      </div>

      <Toaster toasts={toasts} onRemove={removeToast} onRemoveAll={removeAllToasts} />
    </>
  );
}
