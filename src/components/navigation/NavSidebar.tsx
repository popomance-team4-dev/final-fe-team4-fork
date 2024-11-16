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

import { PlusButton } from '@/components/buttons/PlusButton';
import { Separator } from '@/components/ui/separator';

interface NavSidebarButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const NavSidebarButton: FC<NavSidebarButtonProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col group-[.expanded]/navbar:justify-start justify-center py-2 w-full group-[.expanded]/navbar:w-48 items-center px-2 rounded-lg cursor-pointer hover:bg-gray-50 group-[.expanded]/navbar:flex-row group/NavsidebarButton"
    >
      <Icon className="min-w-6 h-6 text-black group-hover/NavsidebarButton:text-primary" />
      <span
        className="ml-2.5 text-black overflow-hidden whitespace-nowrap   
        w-0 h-0 opacity-0 group-[.expanded]/navbar:w-auto group-[.expanded]/navbar:opacity-100  group-[.expanded]/navbar:h-auto group-hover/NavsidebarButton:text-primary"
      >
        {label}
      </span>
      <div
        className={
          'group-[.expanded]/navbar:absolute text-xs opacity-100 group-[.expanded]/navbar:opacity-0 group-hover/NavsidebarButton:text-primary'
        }
      >
        {label}
      </div>
    </button>
  );
};

export function NavSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex h-screen w-[104px] flex-col border-r bg-white p-4 group/navbar ${isExpanded ? 'expanded w-[244px]' : ''}`}
    >
      <div className="my-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-emerald-600">AI</span>
          <span className="opacity-0 group-[.expanded]/navbar:opacity-100">PARK</span>
        </div>
      </div>

      <Separator className="my-6" />

      <PlusButton text="새 프로젝트 생성" isExpanded={isExpanded} className="ml-2" />

      <div className="scrollArea py-6">
        <div className="flex flex-col w-full text-black text-body2">
          <div>
            <h2 className="py-2 text-overline ml-3">General</h2>
          </div>
          <div className="flex flex-col w-full">
            <NavSidebarButton icon={TbSmartHome} label="홈" />
            <NavSidebarButton icon={TbFolders} label="프로젝트" />
            <NavSidebarButton icon={TbFolderShare} label="내보내기" />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="py-2">
          <h2 className="text-overline text-black whitespace-nowrap ml-2">Workspace</h2>
        </div>
        <div className="flex flex-col w-full">
          <NavSidebarButton icon={TbFileTypography} label="TTS" />
          <NavSidebarButton icon={TbFileMusic} label="VC" />
          <NavSidebarButton icon={TbFileDatabase} label="CONCAT" />
        </div>
      </div>
      <div className="mt-auto h-20">
        <Separator className="my-4" />
        <button
          className="mt-2 ml-4 p-2 rounded-lg hover:bg-gray-50"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? '사이드바 축소' : '사이드바 확장'}
        >
          <TbLayoutSidebar className="w-6 h-6 group-[.expanded]/navbar:text-gray-300 text-black" />
        </button>
      </div>
    </div>
  );
}
