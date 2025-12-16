import React, { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge'
import { CircleArrowDown, CircleArrowUp, Trash } from 'lucide-react';

import { Toast } from './Toast';
import { ToasterProps } from './types';

const MAX_TOASTS = 3;

const getToastOrder = (isExpanded: boolean, index: number, toastsLength: number): number => {
  if (isExpanded) return 0;
  return index >= toastsLength - MAX_TOASTS ? toastsLength - index - 1 : -1;
};

export const Toaster: React.FC<ToasterProps> = (props) => {
  const { toasts, onRemove, onRemoveAll } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleExpandToaster = () => {
    if (toasts.length > 1) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCollapseToaster = () => {
    setIsExpanded(false);
  };

  const handleRemoveAll = () => {
    onRemoveAll();
    setIsExpanded(false);
    setIsHovered(false);
  };

  const handleMouseEnterToaster = useCallback(() => {
    if(!isExpanded) {
      setIsHovered(!isHovered);
    }
  }, [isExpanded, isHovered]);

  const handleMouseLeaveToaster = useCallback(() => {
    if(!isExpanded) {
      setIsHovered(!isHovered);
    }
  }, [isExpanded, isHovered]);

  return <div className="flex flex-col items-center fixed top-5 inset-x-0 z-50 w-full">
    <div
      className="px-12 relative"
      onMouseEnter={handleMouseEnterToaster}
      onMouseLeave={handleMouseLeaveToaster}
    >
      <div className="bg-white z-100 w-100 h-6 fixed top-0 pointer-events-none">
        {/* Hack: Invisible element to hide when toasts behind the top toasts are taller */}
      </div>
      <ol
        className={twMerge("w-98 mx-auto flex flex-col-reverse", isExpanded && "gap-3")}
        onClick={handleExpandToaster}
      >
        {
          toasts.map((t, index) => {
            // Get a sort order between 0 and MAX_TOASTS (exclusive) for the toasts that will be visible
            const order = getToastOrder(isExpanded, index, toasts.length);
            return (<Toast key={t.id} order={order} id={t.id} message={t.message} variant={t.variant} onRemove={() => onRemove(t.id)} />)
          })
        }
      </ol>
      <div className="absolute top-0 right-0 flex flex-col space-y-2">
        {isExpanded && (
          <>
            <button onClick={handleCollapseToaster} className="group p-1 cursor-pointer">
              <CircleArrowUp className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition" />
            </button>
            <button onClick={handleRemoveAll} className="group p-1 cursor-pointer">
              <Trash className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition" />
            </button>
          </>
        )}
        {!isExpanded && isHovered && (
          <>
            <button onClick={handleExpandToaster} className="group p-1 cursor-pointer">
              <CircleArrowDown className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition" />
            </button>
          </>
        )}
      </div>
    </div>
  </div>
}
Toaster.displayName = 'Toaster';
