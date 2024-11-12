import { FC } from 'react';
import { TbFolders, TbFolderShare, TbSmartHome } from 'react-icons/tb';

import { Button } from '@/components/buttons/CommonButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarButtonProps {
  icon: React.ElementType;
  label: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({ icon: Icon, label }) => {
  return (
    <div className="w-full flex items-center justify-start py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-50">
      <Icon className="mr-2.5" style={{ width: '24px', height: '24px', color: '#1b1b1b' }} />
      <span className="text-black">{label}</span>
    </div>
  );
};
export function NavSidebar() {
  return (
    <div className="flex h-screen w-[244px] flex-col border-r bg-white p-6">
      <div className="my-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-emerald-600">AI</span>
          <span>PARK</span>
        </div>
      </div>

      <Separator className="my-6" />

      <Button size="mid" icon>
        새 프로젝트 생성
      </Button>

      <ScrollArea className="flex-1 py-6">
        <div className="space-y-1  text-black text-body2">
          <h2 className="py-2 ml-2 text-overline">General</h2>
          <SidebarButton icon={TbSmartHome} label="홈" />
          <SidebarButton icon={TbFolders} label="프로젝트 목록" />
          <SidebarButton icon={TbFolderShare} label="내보내기 내역" />
        </div>

        <Separator className="my-4" />

        <div className="py-2 ml-2">
          <h2 className="text-overline text-black">Workspace</h2>
        </div>
      </ScrollArea>
    </div>
  );
}
