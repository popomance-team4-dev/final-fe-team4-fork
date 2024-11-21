import React from 'react';
import { TbAlertCircleFilled, TbX } from 'react-icons/tb';

interface FileUploadAlertProps {
  message: string;
  onClose: () => void;
}

const FileUploadAlert: React.FC<FileUploadAlertProps> = ({ message, onClose }) => {
  return (
    <div className="pt-5 w-full">
      <div className="flex items-center justify-between h-8 px-4 border border-red-500 bg-red-50 rounded-md">
        <div className="flex items-center gap-3 text-red-600">
          <TbAlertCircleFilled className="h-4 w-4" />
          <span className="text-overline">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-800 hover:text-gray-900 focus:outline-none"
          aria-label="Close alert"
        >
          <TbX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FileUploadAlert;
