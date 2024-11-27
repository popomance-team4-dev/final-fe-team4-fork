import ProfileDropdown from '@/components/custom/dropdowns/ProfileDropdown';

interface MainHeaderProps {
  name: string;
  email: string;
  // imageUrl?: string;
  onMyPage: () => void;
  onSignout: () => void;
}

// export const MainHeader = ({ name, email, imageUrl, onMyPage, onSignout }: MainHeaderProps) => {
export const MainHeader = ({ name, email, onMyPage, onSignout }: MainHeaderProps) => {
  return (
    <div className="flex items-center justify-between pt-[26px]">
      <div className="space-y-2">
        <div className="relative">
          <p className="text-xl font-bold text-gray-900">{name}님, 반갑습니다!</p>
        </div>
      </div>
      <div className="mr-6">
        <ProfileDropdown
          name={name}
          email={email}
          // imageUrl={imageUrl}
          onMyPage={onMyPage}
          onSignout={onSignout}
        />
      </div>
    </div>
  );
};

export default MainHeader;
