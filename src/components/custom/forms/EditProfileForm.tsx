import { Separator } from '@radix-ui/react-separator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { EditConfirm } from '@/components/custom/dialogs/EditProfileDialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfileFormData {
  email: string;
  name: string;
  phoneNumber: string;
}

interface EditProfileFormProps {
  defaultValues: ProfileFormData;
  avatarUrl: string;
}

const EditProfileForm = ({ defaultValues, avatarUrl }: EditProfileFormProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues,
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  const handleConfirmSubmit = () => {
    console.log('회원정보 수정 확인');
    setIsModalOpen(false);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="profile">나의 회원정보</TabsTrigger>
          <TabsTrigger value="security">비밀번호 설정</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <h2 className="text-lg font-semibold mb-4">나의 회원정보</h2>
          <Separator className="h-[1px] bg-gray-200 mb-6 w-full" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <div className="w-[240px]">
                      <FormLabel className="text-black font-medium">
                        이메일 (아이디)
                        <div className="text-sm text-gray-500 font-normal">
                          이메일 주소는 변경할 수 없습니다.
                        </div>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        className="flex-1 max-w-[320px] h-[50px] border-none text-black "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Separator className="h-[1px]  bg-gray-200 w-full" />

              <div className="flex  items-center gap-4">
                <div className="w-[240px]">
                  <FormLabel className="w-[240px] h-[58px] text-black font-medium">
                    사진
                    <div className="text-sm text-gray-500 font-normal">
                      현재 기본 이미지로만 표시됩니다.
                    </div>
                  </FormLabel>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={avatarUrl} />
                    </Avatar>
                  </div>
                </div>
              </div>

              <Separator className="h-[1px] bg-gray-200 w-full" />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <div className="w-[240px] h-[55px] flex items-center">
                      <FormLabel className="text-black font-medium">
                        이름 <span className="text-red-500">*</span>
                        <div className="text-sm text-gray-500 font-normal">
                          나의 프로필에 게시되는 이름입니다.
                        </div>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input {...field} className="flex-1 max-w-[320px] h-[50px]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Separator className="h-[1px] bg-gray-200 w-full" />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <div className="w-[240px] h-[55px] flex items-center">
                      <FormLabel className="text-black font-medium">
                        전화번호 <span className="text-red-500">*</span>
                        <div className="text-sm text-gray-500 font-normal">
                          전화번호 수정 시 인증이 필요합니다.
                        </div>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input {...field} className="flex-1 max-w-[320px] h-[50px]" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="security">
          <h2 className="text-lg font-semibold mb-4">비밀번호 설정</h2>
          <Separator className="h-[1px] bg-gray-200 mb-6 w-full" />
          <Form {...form}>
            <form className="flex flex-col space-y-6">
              <FormItem className="flex items-center gap-4">
                <FormLabel className="text-black font-medium w-[240px]">
                  현재 비밀번호 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="현재 비밀번호를 입력해 주세요."
                    className="max-w-[320px] h-[50px]"
                  />
                </FormControl>
              </FormItem>

              <Separator className="h-[1px] bg-gray-200 w-full" />

              <FormItem className="flex items-center gap-4">
                <FormLabel className="text-black font-medium w-[240px]">
                  새 비밀번호 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="새 비밀번호를 입력해 주세요."
                    className="max-w-[320px] h-[50px]"
                  />
                </FormControl>
              </FormItem>

              <FormItem className="flex items-center gap-4">
                <FormLabel className="text-black font-medium w-[240px]">
                  새 비밀번호 확인 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="새 비밀번호를 확인해 주세요."
                    className="max-w-[320px] h-[50px]"
                  />
                </FormControl>
              </FormItem>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <Separator className="h-[1px] bg-gray-200 mt-6 mb-16" />
      <div className="flex space-x-4">
        <Button type="button" size="sm" variant="outline">
          취소
        </Button>
        <Button type="submit" size="sm" onClick={() => setIsModalOpen(true)}>
          회원정보 수정
        </Button>
      </div>

      <EditConfirm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirmSubmit}
      />
    </>
  );
};

export default EditProfileForm;
