import { FC } from 'react';
import { TbFolders, TbFolderShare, TbSmartHome } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarButtonProps {
  icon: React.ElementType;
  label: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex  flex-col  items-center px-2 py-2 ml-[-20px] rounded-lg cursor-pointer hover:bg-gray-50 group-hover/navbar:py-2  group-hover/navbar:flex-row  group-hover/navbar:ml-2">
      <Icon className="min-w-[24px] h-6 text-[#1b1b1b]" />
      <span
        className="ml-2.5 text-black overflow-hidden whitespace-nowrap   
        w-0 h-0 opacity-0 group-hover/navbar:w-auto group-hover/navbar:opacity-100  group-hover/navbar:h-auto"
      >
        {label}
      </span>
      <div
        className={
          'group-hover/navbar:absolute  text-[11px] opacity-100 group-hover/navbar:opacity-0'
        }
      >
        {label}
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
