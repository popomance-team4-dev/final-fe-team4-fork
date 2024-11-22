import React, { useState } from 'react';
import { TbDotsVertical, TbPencil, TbTrash } from 'react-icons/tb';
interface KebabMenuProps {
  onRename: () => void;
  onDelete: () => void;
}
const KebabMenu: React.FC<KebabMenuProps> = ({ onRename, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    setIsOpen(false);
    action();
  };
  return (
    <div className="relative">
      <button
        className="hover:bg-gray-100 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <TbDotsVertical size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 py-1 w-48 p-1 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
          <button
            className="w-full px-3 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2 rounded-md"
            onClick={(e) => handleClick(e, onRename)}
          >
            <TbPencil size={16} />
            파일명 변경
          </button>
          <button
            className="w-full px-3 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center gap-2 rounded-md"
            onClick={(e) => handleClick(e, onDelete)}
          >
            <TbTrash size={16} />
            삭제
          </button>
        </div>
      )}
    </div>
  );
};
export default KebabMenu;
