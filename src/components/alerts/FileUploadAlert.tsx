import React from 'react';
import { TbAlertCircleFilled, TbX } from 'react-icons/tb';

interface FileUploadAlertProps {
  message: string;
  onClose: () => void;
}

export const ALERT_MESSAGES = {
  VC_UPLOAD_REQUIRED: 'VC 작업을 시작하려면 반드시 오디오 파일을 업로드해 주세요.',
  CONCAT_UPLOAD_REQUIRED: 'VC 작업을 시작하려면 반드시 오디오 파일을 업로드해 주세요.',
};

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
