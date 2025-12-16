export enum ToastVariant {
  DEFAULT = 'DEFAULT',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export interface ToastProps {
  id: string;
  message: string;
  order?: number;
  variant?: ToastVariant;
}

export interface ToasterProps {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
  onRemoveAll: () => void;
}
