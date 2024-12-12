import type { Meta, StoryObj } from '@storybook/react';
import { TbAlertCircle, TbMicrophone, TbPlayerPlay, TbX } from 'react-icons/tb';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const meta = {
  title: 'ui/dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: `
Dialog는 화면 위에 표시되는 작은 창으로, 사용자에게 중요한 내용을 보여주거나 입력을 받을 때 사용합니다.

### Import
\`\`\`tsx
import {
  Dialog,
  DialogTrigger,  // 팝업창 열기 버튼
  DialogContent,  // 팝업창 내용
  DialogHeader,   // 팝업창 상단부
  DialogFooter,   // 팝업창 하단부
  DialogTitle,    // 팝업창 제목
  DialogDescription,  // 팝업창 설명
} from '@/components/ui/dialog';
\`\`\`

### 기본 사용법

\`\`\`tsx
<Dialog>
  <DialogTrigger>
    <Button>열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명</DialogDescription>
    </DialogHeader>
    여기에 내용이 들어갑니다.
    <DialogFooter>
      <Button>확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### 주요 기능

1. **편리한 사용**
   - ESC 키로 닫기 가능
   - 바깥 영역 클릭으로 닫기 가능
   - 모바일에서도 잘 작동

2. **자동 정렬**
   - 화면 중앙에 자동으로 위치
   - 모바일/데스크톱 모두 대응
   - 스크롤 자동 처리

3. **다양한 크기**
   - 모바일: 360px
   - 데스크톱: 480px
   - 필요에 따라 조절 가능
   

<br />

### 주의사항

1. **내용**
   - 꼭 필요한 내용만 넣기
   - 너무 많은 내용은 피하기
   - 명확한 제목과 설명 사용하기

2. **버튼**
   - 버튼 이름은 명확하게
   - 위험한 작업은 한 번 더 확인
   - 취소 옵션 제공하기

3. **디자인**
   - 충분한 여백 주기
   - 읽기 쉬운 글자 크기 사용
   - 모바일에서 확인하기
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------------
// 스토리 컴포넌트들
// --------------------------------------------------------

/**
 * 기본적인 Dialog 사용 예시입니다.
 * 음성 생성을 위한 설정 다이얼로그를 보여줍니다.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">기본 팝업창</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] md:max-w-[480px] p-5 md:p-7">
        <DialogHeader className="space-y-3 mb-5 md:mb-7">
          <DialogTitle className="text-xl font-bold">음성 생성하기</DialogTitle>
          <DialogDescription className="text-gray-500 text-base">
            새로운 음성을 생성하기 위한 설정을 해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 mb-7">
          <div className="space-y-2.5">
            <Label htmlFor="voice" className="text-base">
              목소리 선택
            </Label>
            <Input id="voice" defaultValue="김성우" className="h-11" />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="speed" className="text-base">
              재생 속도
            </Label>
            <Input
              id="speed"
              defaultValue="1.0"
              type="number"
              min="0.5"
              max="2.0"
              step="0.1"
              className="h-11"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full gap-3 mt-6">
            <DialogClose asChild>
              <Button size="sm" variant="outline" className="flex-1 h-11">
                취소
              </Button>
            </DialogClose>
            <Button size="sm" type="submit" className="flex-1 h-11">
              생성하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 삭제 확인을 위한 Dialog 예시입니다.
 * 위험한 작업에 대한 사용자 확인을 받습니다.
 */
export const DeleteConfirm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          음성 파일 삭제
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] md:max-w-[480px] p-5 md:p-7">
        <DialogHeader className="space-y-3 mb-5 md:mb-7">
          <div className="flex items-center gap-2 text-destructive">
            <TbAlertCircle className="w-6 h-6" />
            <DialogTitle className="text-xl font-bold">삭제 확인</DialogTitle>
          </div>
          <DialogDescription className="text-gray-500 text-base">
            선택한 음성 파일을 삭제하시겠습니까?
            <br />이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full gap-3">
            <DialogClose asChild>
              <Button size="sm" variant="outline" className="flex-1 h-11">
                취소
              </Button>
            </DialogClose>
            <Button size="sm" variant="destructive" className="flex-1 h-11">
              삭제
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 음성 정보를 보여주는 Dialog 예시입니다.
 * 상세 정보와 미리듣기 기능을 제공합니다.
 */
export const VoiceInfo: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          음성 정보 보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] md:max-w-[480px] p-5 md:p-7">
        <DialogHeader className="mb-5 md:mb-7">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">음성 정보</DialogTitle>
            <DialogClose asChild>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <TbX className="h-5 w-5" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="space-y-5 mb-7">
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.jpg" alt="음성 프로필" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h4 className="text-xl font-bold">김성우</h4>
              <p className="text-gray-500 text-base">한국어 / 남성</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 text-base">음성 특징</Label>
              <p className="text-gray-600">차분하고 신뢰감 있는 목소리</p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 text-base">추천 용도</Label>
              <p className="text-gray-600">내레이션, 다큐멘터리</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" className="w-full h-11 mt-6">
            <TbPlayerPlay className="mr-2 h-5 w-5" />
            미리듣기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * 프로젝트 설정을 위한 Dialog 예시입니다.
 * 프로젝트의 기본 설정을 변경할 수 있습니다.
 */
export const ProjectSettings: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">프로젝트 설정</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] md:max-w-[480px] p-5 md:p-7">
        <DialogHeader className="space-y-3 mb-5 md:mb-7">
          <DialogTitle className="text-xl font-bold">프로젝트 설정</DialogTitle>
          <DialogDescription className="text-gray-500 text-base">
            프로젝트의 기본 설정을 변경할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 mb-7">
          <div className="space-y-2.5">
            <Label htmlFor="projectName" className="text-base">
              프로젝트명
            </Label>
            <Input id="projectName" defaultValue="새 음성 프로젝트" className="h-11" />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="voiceType" className="text-base">
              음성 종류
            </Label>
            <Input id="voiceType" defaultValue="TTS" className="h-11" />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="quality" className="text-base">
              품질 설정
            </Label>
            <Input id="quality" defaultValue="높은 품질" className="h-11" />
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full gap-3 mt-6">
            <DialogClose asChild>
              <Button size="sm" variant="outline" className="flex-1 h-11">
                취소
              </Button>
            </DialogClose>
            <Button size="sm" type="submit" className="flex-1 h-11">
              저장
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const VoiceGeneration: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <TbMicrophone className="mr-2 h-4 w-4" />
          음성 생성
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] md:max-w-[480px] p-5 md:p-7">
        <DialogHeader className="space-y-3 mb-5 md:mb-7">
          <DialogTitle className="text-xl font-bold">음성 생성</DialogTitle>
          <DialogDescription className="text-gray-500 text-base">
            원하는 음성 모델과 설정을 선택하여 자연스러운 음성을 생성하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mb-7">
          <div className="space-y-2.5">
            <Label className="text-base">음성 모델</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="음성 모델을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="model1">차분한 남성 음성</SelectItem>
                <SelectItem value="model2">밝은 여성 음성</SelectItem>
                <SelectItem value="model3">전문적인 내레이터</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base">음성 속도</Label>
            <Slider defaultValue={[1]} min={0.5} max={2} step={0.1} />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0.5x</span>
              <span>1x</span>
              <span>2x</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base">음성 톤</Label>
            <Slider defaultValue={[0]} min={-10} max={10} step={1} />
            <div className="flex justify-between text-sm text-gray-500">
              <span>낮음</span>
              <span>기본</span>
              <span>높음</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base">텍스트 입력</Label>
            <textarea
              className="w-full h-24 p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="변환할 텍스트를 입력하세요..."
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full gap-3 mt-6">
            <DialogClose asChild>
              <Button size="sm" variant="outline" className="flex-1 h-11">
                취소
              </Button>
            </DialogClose>
            <Button size="sm" className="flex-1 h-11">
              생성하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const VoiceConversion: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <TbPlayerPlay className="mr-2 h-4 w-4" />
          음성 변환
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] md:max-w-[480px] p-5 md:p-7">
        <DialogHeader className="space-y-3 mb-5 md:mb-7">
          <DialogTitle className="text-xl font-bold">음성 변환</DialogTitle>
          <DialogDescription className="text-gray-500 text-base">
            기존 음성을 다른 목소리로 자연스럽게 변환합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mb-7">
          <div className="space-y-2.5">
            <Label className="text-base">음성 입력 방식</Label>
            <Tabs defaultValue="file" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="file" className="flex-1">
                  <TbPlayerPlay className="mr-2 h-4 w-4" />
                  파일 업로드
                </TabsTrigger>
                <TabsTrigger value="record" className="flex-1">
                  <TbMicrophone className="mr-2 h-4 w-4" />
                  음성 녹음
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="mt-4">
                <div className="rounded-lg border-2 border-dashed p-8">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-gray-50 p-4">
                      <TbPlayerPlay className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">음성 파일을 업로드하세요</p>
                      <p className="text-sm text-gray-500">WAV, MP3 파일 (최대 10MB)</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      파일 선택
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="record" className="mt-4">
                <div className="rounded-lg border p-8">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-20 w-20 rounded-full hover:bg-gray-100 hover:text-gray-900"
                    >
                      <TbMicrophone className="h-8 w-8" />
                    </Button>
                    <div className="space-y-2">
                      <p className="font-medium">음성을 녹음하세요</p>
                      <p className="text-sm text-gray-500">최대 녹음 시간: 5분</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2.5">
            <Label className="text-base">변환할 음성 모델</Label>
            <Select>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="변환할 음성을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voice1">밝은 여성 음성</SelectItem>
                <SelectItem value="voice2">차분한 남성 음성</SelectItem>
                <SelectItem value="voice3">활기찬 청년 음성</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full gap-3 mt-6">
            <DialogClose asChild>
              <Button size="sm" variant="outline" className="flex-1 h-11">
                취소
              </Button>
            </DialogClose>
            <Button size="sm" className="flex-1 h-11">
              변환하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
