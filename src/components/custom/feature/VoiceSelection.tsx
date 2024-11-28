import { TbChevronLeft, TbChevronRight, TbMicrophone, TbUpload } from 'react-icons/tb';

import { RadioGroup } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks/usePagination';

import VoiceCard from '../cards/VoiceCard';

interface TargetVoice {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  type: 'preset' | 'custom';
}

interface VoiceSelectionProps {
  presetVoices: TargetVoice[];
  customVoices: TargetVoice[];
  selectedVoice: string;
  onVoiceSelect: (id: string) => void;
  onVoiceUpload: (file: File) => void;
  onVoiceDelete?: (id: string) => void;
  onVoiceEdit?: (id: string, type: 'name' | 'description') => void;
}

interface VoiceListProps {
  voices: TargetVoice[];
  selectedVoice: string;
  onVoiceSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, type: 'name' | 'description') => void;
}

const PresetVoiceList = ({
  voices,
  selectedVoice,
  onVoiceSelect,
  onDelete,
  onEdit,
}: VoiceListProps) => {
  const { currentPage, setCurrentPage, getCurrentPageItems, totalPages } = usePagination({
    data: voices,
    itemsPerPage: 4,
  });

  const currentVoices = getCurrentPageItems();

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  return (
    <div>
      <div className="h-[300px] mb-8">
        <RadioGroup value={selectedVoice} onValueChange={onVoiceSelect}>
          {currentVoices.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              isSelected={selectedVoice === voice.id}
              onSelect={() => onVoiceSelect(voice.id)}
              onDelete={onDelete && (() => onDelete(voice.id))}
              onEdit={onEdit && ((type) => onEdit(voice.id, type))}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between px-4">
        <button
          onClick={handlePrevPage}
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
          onClick={handleNextPage}
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
    <div className="flex flex-col items-center justify-center h-[300px] border border-gray-200 rounded-lg bg-white">
      <div className="flex flex-col items-center gap-1 mb-6">
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
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white border border-gray-200 hover:bg-gray-100 h-9 px-4 py-2 cursor-pointer"
      >
        <TbUpload className="w-4 h-4" />
        파일 업로드
      </label>
    </div>
  );
};

const VoiceSelection = ({
  presetVoices,
  customVoices,
  selectedVoice,
  onVoiceSelect,
  onVoiceUpload,
  onVoiceDelete,
  onVoiceEdit,
}: VoiceSelectionProps) => {
  return (
    <Tabs defaultValue="preset" className="w-full">
      <TabsList className="w-full mb-3">
        <TabsTrigger value="preset" className="flex-1">
          프리셋
        </TabsTrigger>
        <TabsTrigger value="custom" className="flex-1">
          내 음성
        </TabsTrigger>
      </TabsList>

      <div className="h-[358px]">
        <TabsContent value="preset">
          <PresetVoiceList
            voices={presetVoices}
            selectedVoice={selectedVoice}
            onVoiceSelect={onVoiceSelect}
          />
        </TabsContent>

        <TabsContent value="custom">
          {customVoices.length > 0 ? (
            <PresetVoiceList
              voices={customVoices}
              selectedVoice={selectedVoice}
              onVoiceSelect={onVoiceSelect}
              onDelete={onVoiceDelete}
              onEdit={onVoiceEdit}
            />
          ) : (
            <CustomVoiceUpload onUpload={onVoiceUpload} />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default VoiceSelection;
