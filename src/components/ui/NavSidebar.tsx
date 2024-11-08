import { FolderOpen, Home, LayoutDashboard, Plus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';

export function NavSidebar() {
  return (
    <div className="flex h-screen w-[240px] flex-col border-r bg-white">
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-emerald-600">AI</span>
          <span>PARK</span>
        </div>
      </div>

      <Button className="mx-6 bg-blue-500 hover:bg-blue-600">
        <Plus className="mr-2 h-4 w-4" />새 프로젝트 생성
      </Button>

      <ScrollArea className="flex-1 px-3 py-6">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start font-normal">
            <Home className="mr-2 h-4 w-4" />홈
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            <FolderOpen className="mr-2 h-4 w-4" />
            프로젝트 목록
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            내보내기 내역
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold">Workspace</h2>
        </div>
      </ScrollArea>
    </div>
  );
}
