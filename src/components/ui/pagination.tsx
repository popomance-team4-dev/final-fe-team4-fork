import React from 'react';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              currentPage === i + 1 ? 'bg-gray-900' : 'bg-gray-200'
            }`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Pagination;
