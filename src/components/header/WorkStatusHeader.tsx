import ProfileDropdown from '@/components/dropdowns/ProfileDropdown';
import TTSDropdown, { TTSFile } from '@/components/dropdowns/TTSDropdown';

interface WorkStatusHeaderProps {
  name: string;
  email: string;
  imageUrl?: string;
  files: TTSFile[];
  onDeleteCompleted: () => void;
  onRetryFailed: () => void;
  onMyPage: () => void;
  onSignout: () => void;
}

export const WorkStatusHeader = ({
  name,
  email,
  imageUrl,
  files,
  onDeleteCompleted,
  onRetryFailed,
  onMyPage,
  onSignout,
}: WorkStatusHeaderProps) => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="space-y-2">
        <h1 className="text-[14px] font-bold">My work status</h1>
        <div className="relative">
          <TTSDropdown
            files={files}
            onDeleteCompleted={onDeleteCompleted}
            onRetryFailed={onRetryFailed}
          />
        </div>
      </div>
      <div className="mr-6">
        <ProfileDropdown
          name={name}
          email={email}
          imageUrl={imageUrl}
          onMyPage={onMyPage}
          onSignout={onSignout}
        />
      </div>
    </div>
  );
};
