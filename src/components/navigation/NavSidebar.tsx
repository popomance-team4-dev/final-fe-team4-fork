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
import logofull from '@/images/logofull.png';
import logomini from '@/images/logomini.png';

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
          'group-[.expanded]/navbar:absolute text-tiny opacity-100 group-[.expanded]/navbar:opacity-0 group-hover/sidebarButton:text-primary'
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
      className={`flex h-screen w-[104px] flex-col border-r bg-white px-6 pb-4 group/navbar ${isExpanded ? 'expanded w-[244px]' : ''}`}
    >
      <div className=" border-b flex items-center">
        <div className="h-[91px] w-full flex items-center gap-2">
          {/* 미니 로고 */}
          <span
            className={`flex items-center transition-opacity duration-300 ${
              isExpanded ? 'opacity-0 hidden' : 'opacity-100'
            }`}
          >
            <img src={logomini} alt="AI" className="h-6 w-auto" />
          </span>

          {/* 풀 로고 */}
          <span
            className={`transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <img src={logofull} alt="AI PARK" className="h-6 w-auto" />
          </span>
        </div>
      </div>

      {/* <Separator className="mb-6" /> */}

      <PlusButton text="새 프로젝트 생성" isExpanded={isExpanded} className="mt-6" />

      <div className="scrollArea py-6">
        <div className="flex flex-col w-full text-black text-body2">
          <div>
            <h2
              className={`pt-2 pb-3 text-overline  ${
                isExpanded ? 'ml-2 text-left' : 'ml-0 text-center'
              }`}
            >
              General
            </h2>
          </div>
          <div className="flex flex-col w-full gap-3">
            <NavSidebarButton icon={TbSmartHome} label="홈" />
            <NavSidebarButton icon={TbFolders} label="프로젝트" />
            <NavSidebarButton icon={TbFolderShare} label="내보내기" />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="pt-2 pb-3">
          <h2
            className={`pt-2 pb-3 text-overline ${
              isExpanded ? 'ml-2 text-left' : 'ml-0 text-center'
            }`}
          >
            Workspace
          </h2>
        </div>
        <div className="flex flex-col w-full gap-3">
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
