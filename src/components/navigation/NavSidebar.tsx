import { FC, useState } from 'react';
import {
  TbFileDatabase,
  TbFileMusic,
  TbFileTypography,
  TbFolders,
  TbFolderShare,
  TbLayoutSidebar,
  TbSmartHome,
} from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarButtonProps {
  icon: React.ElementType;
  label: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-col  group-[.expanded]/navbar:justify-start justify-center py-2 w-full group-[.expanded]/navbar:w-48 items-center px-2 ml-[-20px] rounded-lg cursor-pointer hover:bg-gray-50  group-[.expanded]/navbar:flex-row  group-[.expanded]/navbar:ml-2 group/sidebarButton">
      <Icon className="min-w-6 h-6 text-black group-hover/sidebarButton:text-primary" />
      <span
        className="ml-2.5 text-black overflow-hidden whitespace-nowrap   
        w-0 h-0 opacity-0 group-[.expanded]/navbar:w-auto group-[.expanded]/navbar:opacity-100  group-[.expanded]/navbar:h-auto group-hover/sidebarButton:text-primary"
      >
        {label}
      </span>
      <div
        className={
          'group-[.expanded]/navbar:absolute  text-xs opacity-100 group-[.expanded]/navbar:opacity-0 group-hover/sidebarButton:text-primary'
        }
      >
        {label}
      </div>
    </div>
  );
};

export function NavSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex h-screen w-[104px] flex-col border-r bg-white p-4 group/navbar ${isExpanded ? `expanded w-[244px]` : ''}`}
    >
      <div className="my-2">
        <div className="flex items-center gap-2 font-bold text-xl ">
          <span className="text-emerald-600">AI</span>
          <span className="opacity-0 group-[.expanded]/navbar:opacity-100 ">PARK</span>
        </div>
      </div>

      <Separator className="my-6" />

      <Button size="icon" icon className="ml-2">
        새 프로젝트 생성
      </Button>

      <div className="scrollArea py-6">
        <div className="flex flex-col items-center w-full  text-black text-body2 ml-2 group-[.expanded]/navbar:items-start">
          <div className="mr-4">
            <h2 className="py-2 text-overline self-start group-[.expanded]/navbar:ml-2">General</h2>
          </div>
          <div className="flex flex-col w-full translate-x-3 group-[.expanded]/navbar:w-full  group-[.expanded]/navbar:-translate-x-1">
            <SidebarButton icon={TbSmartHome} label="홈" />
            <SidebarButton icon={TbFolders} label="프로젝트" />
            <SidebarButton icon={TbFolderShare} label="내보내기" />
          </div>
        </div>
        <Separator className="my-4 " />
        <div className="py-2 ml-2 ">
          <h2 className="text-overline text-black whitespace-nowrap group-[.expanded]/navbar:ml-1">
            Workspace
          </h2>
        </div>
        <div className="mx-12 py-2 group-[.expanded]/navbar:-translate-x-1  group-[.expanded]/navbar:ml-1">
          <SidebarButton icon={TbFileTypography} label="TTS" />
          <SidebarButton icon={TbFileMusic} label="VC" />
          <SidebarButton icon={TbFileDatabase} label="CONCAT" />
        </div>
      </div>
      <div className="mt-auto h-20">
        <Separator className="my-4 " />
        <button className="mt-2 ml-4" onClick={() => setIsExpanded(!isExpanded)}>
          <TbLayoutSidebar className="w-6 h-6 group-[.expanded]/navbar:text-gray-300 text-black " />
        </button>
      </div>
    </div>
  );
}
