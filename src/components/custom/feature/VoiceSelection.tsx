import { TbChevronLeft, TbChevronRight, TbUpload } from 'react-icons/tb';

import { RadioGroup } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePagination } from '@/hooks/usePagination';

import VoiceCard from '../cards/VoiceCard';

const ITEMS_PER_PAGE = 4;

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
}

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
    <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-lg p-4">
      <TbUpload className="w-8 h-8 mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground mb-4">WAV, MP3 파일 지원 (최대 10MB)</p>
      <input
        type="file"
        id="voice-upload"
        className="hidden"
        accept="audio/*"
        onChange={handleFileSelect}
      />
      <label
        htmlFor="voice-upload"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 cursor-pointer"
      >
        음성 파일 선택하기
      </label>
    </div>
  );
};

const PresetVoiceList = ({
  voices,
  selectedVoice,
  onVoiceSelect,
}: {
  voices: TargetVoice[];
  selectedVoice: string;
  onVoiceSelect: (id: string) => void;
}) => {
  const { currentPage, setCurrentPage, getCurrentPageItems, totalPages } = usePagination({
    data: voices,
    itemsPerPage: ITEMS_PER_PAGE,
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
      <div className="min-h-[260px] mb-2">
        <RadioGroup value={selectedVoice} onValueChange={onVoiceSelect}>
          {currentVoices.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              isSelected={selectedVoice === voice.id}
              onSelect={() => onVoiceSelect(voice.id)}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between px-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-secondary transition-colors ${
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
          className={`h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-secondary transition-colors ${
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

const VoiceSelection = ({
  presetVoices,
  customVoices,
  selectedVoice,
  onVoiceSelect,
  onVoiceUpload,
}: VoiceSelectionProps) => {
  return (
    <Tabs defaultValue="preset" className="w-full">
      <TabsList className="w-full mb-4">
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
          <ScrollArea className="h-full">
            <div>
              {customVoices.length > 0 ? (
                <RadioGroup value={selectedVoice} onValueChange={onVoiceSelect}>
                  {customVoices.map((voice) => (
                    <VoiceCard
                      key={voice.id}
                      voice={voice}
                      isSelected={selectedVoice === voice.id}
                      onSelect={() => onVoiceSelect(voice.id)}
                    />
                  ))}
                </RadioGroup>
              ) : (
                <CustomVoiceUpload onUpload={onVoiceUpload} />
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default VoiceSelection;
