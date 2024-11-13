import { FC } from 'react';
import { TbFolders, TbFolderShare, TbSmartHome } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
  icon: React.ElementType;
  label: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({ icon: Icon, label }) => {
  return (
    <div className="py-2 group-hover/navbar:py-0">
      <div className="w-full flex items-center justify-start py-0 px-2 group-hover/navbar:py-2 group-hover/navbar:px-2 rounded-lg cursor-pointer hover:bg-gray-50 ml-2">
        <Icon className="mr-2.5" style={{ minWidth: '24px', height: '24px', color: '#1b1b1b' }} />
        <span className="text-black opacity-0 w-0 h-0 group-hover/navbar:opacity-100 group-hover/navbar:w-auto group-hover/navbar:h-auto">
          {label}
        </span>
      </div>
      <div
        className={cn(
          'w-full flex justify-center overflow-visible',
          label === '홈' ? 'ml-[-8px]' : 'ml-[-7px]'
        )}
      >
        <span className="group-hover/navbar:absolute min-w-[40px] text-black opacity-100 w-auto h-auto group-hover/navbar:opacity-0 group-hover/navbar:w-0 group-hover/navbar:h-0 text-[11px] text-center">
          {label}
        </span>
      </div>
    </div>
  );
};

export function NavSidebar() {
  return (
    <div className="flex h-screen w-[104px] hover:w-[244px] flex-col border-r bg-white p-6 group/navbar">
      <div className="my-2">
        <div className="flex items-center gap-2 font-bold text-xl ">
          <span className="text-emerald-600">AI</span>
          <span className="opacity-0 group-hover/navbar:opacity-100">PARK</span>
        </div>
      </div>

      <Separator className="my-6" />

      <Button size="icon" icon>
        새 프로젝트 생성
      </Button>

      <ScrollArea className="flex-1 py-6">
        <div className="space-y-1  text-black text-body2">
          <h2 className="py-2 ml-2 text-overline">General</h2>
          <SidebarButton icon={TbSmartHome} label="홈" />
          <SidebarButton icon={TbFolders} label="프로젝트" />
          <SidebarButton icon={TbFolderShare} label="내보내기" />
        </div>
        <Separator className="my-4 mx-[-10px]" />
        <div className="py-2 ml-0 group-hover/navbar:ml-2">
          <h2 className="text-overline text-black whitespace-nowrap">Workspace</h2>
        </div>
      </ScrollArea>
    </div>
  );
}
