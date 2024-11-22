import FileProgressDropdown, {
  FileProgressItem,
} from '@/components/custom/dropdowns/FileProgressDropdown';
import ProfileDropdown from '@/components/custom/dropdowns/ProfileDropdown';

interface FileProgressHeaderProps {
  name: string;
  email: string;
  imageUrl?: string;
  files: FileProgressItem[];
  onDeleteCompleted: () => void;
  onRetryFailed: () => void;
  onMyPage: () => void;
  onSignout: () => void;
}

export const FileProgressHeader = ({
  name,
  email,
  imageUrl,
  files,
  onDeleteCompleted,
  onRetryFailed,
  onMyPage,
  onSignout,
}: FileProgressHeaderProps) => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="space-y-2">
        <h1 className="text-[14px] font-bold">My work status</h1>
        <div className="relative">
          <FileProgressDropdown
            items={files}
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
