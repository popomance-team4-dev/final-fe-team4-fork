import {
  TbChevronLeft,
  TbChevronRight,
  TbClock,
  TbMicrophone,
  TbPlus,
  TbUpload,
  TbVolume,
} from 'react-icons/tb';

import { RadioGroup } from '@/components/ui/radio-group';
import { usePagination } from '@/hooks/usePagination';

import VoiceCard from '../cards/VoiceCard';

interface TargetVoice {
  id: string;
  name: string;
  description: string;
}

interface VoiceSelectionProps {
  customVoices: TargetVoice[];
  selectedVoice: string;
  onVoiceSelect: (id: string) => void;
  onVoiceUpload: (file: File) => void;
  onVoiceDelete?: (id: string) => void;
  onVoiceEdit?: (newName: string) => void;
}

interface VoiceListProps {
  voices: TargetVoice[];
  selectedVoice: string;
  onVoiceSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (newName: string) => void;
}

const VoiceList = ({ voices, selectedVoice, onVoiceSelect, onDelete, onEdit }: VoiceListProps) => {
  const { currentPage, setCurrentPage, getCurrentPageItems, totalPages } = usePagination({
    data: voices,
    itemsPerPage: 4,
  });

  return (
    <div>
      <div className="h-[292px] mb-4">
        <RadioGroup value={selectedVoice} onValueChange={onVoiceSelect}>
          {getCurrentPageItems().map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              isSelected={selectedVoice === voice.id}
              onSelect={() => onVoiceSelect(voice.id)}
              onDelete={onDelete && (() => onDelete(voice.id))}
              onEdit={onEdit}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between px-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed text-muted-foreground'
              : 'text-foreground'
          }`}
        >
          <TbChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-muted-foreground">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed text-muted-foreground'
              : 'text-foreground'
          }`}
        >
          <TbChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const CustomVoiceUpload = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB를 초과할 수 없습니다.');
        return;
      }
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="w-full max-w-md px-0 mb-2">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <ul className="space-y-3">
            {[
              {
                icon: <TbMicrophone className="w-4 h-4" />,
                text: '깨끗한 음질의 음성 파일을\n준비해주세요.',
              },
              {
                icon: <TbVolume className="w-4 h-4" />,
                text: '배경 소음이 없는 음성 파일을 권장합니다.',
              },
              {
                icon: <TbClock className="w-4 h-4" />,
                text: '30초 이상의 음성 파일을\n권장합니다.',
              },
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100/50">
                  {item.icon}
                </div>
                <span className="text-sm text-blue-800 whitespace-pre-line">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 my-[33px]">
        <div className="p-3 rounded-full bg-gray-50 mb-2">
          <TbMicrophone className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-sm font-medium">음성 파일을 업로드하세요</h3>
        <p className="text-xs text-muted-foreground">WAV, MP3 파일 지원 (최대 10MB)</p>
      </div>

      <input
        type="file"
        id="voice-upload"
        className="hidden"
        accept="audio/*"
        onChange={handleFileSelect}
      />
      <label
        htmlFor="voice-upload"
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white border border-gray-200 hover:bg-gray-50 h-9 px-4 py-2 cursor-pointer"
      >
        <TbUpload className="w-4 h-4" />
        파일 업로드
      </label>
    </div>
  );
};

const VoiceSelection = ({
  customVoices,
  selectedVoice,
  onVoiceSelect,
  onVoiceUpload,
  onVoiceDelete,
  onVoiceEdit,
}: VoiceSelectionProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB를 초과할 수 없습니다.');
        return;
      }
      onVoiceUpload(file);
    }
  };

  return (
    <div className="w-full">
      {customVoices.length > 0 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TbMicrophone className="w-4 h-4 text-primary" />
            <h2 className="text-sm">내 음성 목록</h2>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="voice-upload-header"
              className="hidden"
              accept="audio/*"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="voice-upload-header"
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white border border-gray-200 hover:bg-gray-50 h-9 px-4 py-2 cursor-pointer"
            >
              <TbPlus className="w-4 h-4" />
              파일 추가
            </label>
          </div>
        </div>
      )}

      <div className="mb-10">
        {customVoices.length > 0 ? (
          <VoiceList
            voices={customVoices}
            selectedVoice={selectedVoice}
            onVoiceSelect={onVoiceSelect}
            onDelete={onVoiceDelete}
            onEdit={onVoiceEdit}
          />
        ) : (
          <CustomVoiceUpload onUpload={onVoiceUpload} />
        )}
      </div>
    </div>
  );
};

export default VoiceSelection;
