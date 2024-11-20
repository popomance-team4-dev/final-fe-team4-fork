import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TermsAgreement from '@/components/terms/TermsAgreement';
import TermsDialog from '@/components/terms/TermsDialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { TERMS } from '@/constants/terms';
import { SignupFormData } from '@/types/signup';
import { SignupFormRequest, signupFormSchema } from '@/utils/signupSchema';

const SignupForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      gender: '',
      birth_date: '',
      phone: '',
      terms: [],
    },
  });

  const [termsDialog, setTermsDialog] = useState({
    open: false,
    title: '',
    content: '',
    type: '' as 'service' | 'privacy',
  });

  const [isAllTermsFlow, setIsAllTermsFlow] = useState(false);

  const onSubmit = (data: SignupFormData) => {
    const requestData = SignupFormRequest(data);
    console.log(requestData);
  };

  const handleEmailCheck = () => {
    const email = form.getValues('email');
    // api 준비되면 실제 이메일 중복 체크 구현
    console.log('이메일 중복 체크:', email);
  };

  const handleOpenTerms = (type: 'service' | 'privacy', isAll: boolean = false) => {
    setIsAllTermsFlow(isAll);
    setTermsDialog({
      open: true,
      title: type === 'service' ? '서비스 이용약관' : '개인정보 처리방침',
      content: type === 'service' ? TERMS.SERVICE : TERMS.PRIVACY,
      type,
    });
  };

  const handleAgreeTerms = (type: 'service' | 'privacy') => {
    const currentTerms = form.getValues('terms') || [];

    if (!currentTerms.includes(type)) {
      form.setValue('terms', [...currentTerms, type], { shouldValidate: true });
    }

    if (isAllTermsFlow && type === 'service') {
      setTimeout(() => {
        handleOpenTerms('privacy', true);
      }, 100);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-9 space-y-5">
        <div className="flex flex-col space-y-2">
          <FormLabel className="text-black font-medium">
            이메일 (아이디) <span className="text-red-500">*</span>
          </FormLabel>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="aipark@aipark.ai"
                      className="h-[50px] placeholder:text-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={handleEmailCheck} className="w-[100px] h-[50px] text-md">
              중복 확인
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">
                비밀번호 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="8-50자의 비밀번호를 입력해 주세요."
                  className="h-[50px] placeholder:text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">
                비밀번호 확인 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요."
                  className="h-[50px] placeholder:text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-black font-medium">
                  이름 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="이름을 입력해주세요."
                    className="h-[50px] placeholder:text-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-black font-medium">성별</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="선택"
                  className="h-[50px]"
                  items={[
                    { value: 'male', label: '남성' },
                    { value: 'female', label: '여성' },
                  ]}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-medium">
                전화번호 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="010-0000-0000"
                  className="h-[50px] placeholder:text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <TermsAgreement control={form.control} onOpenTerms={handleOpenTerms} />

        <Button type="submit" className="my-8 w-full">
          회원 가입하기
        </Button>

        <TermsDialog
          open={termsDialog.open}
          onOpenChange={(open) => setTermsDialog((prev) => ({ ...prev, open }))}
          title={termsDialog.title}
          content={termsDialog.content}
          type={termsDialog.type}
          onAgree={handleAgreeTerms}
        />
      </form>
    </Form>
  );
};

export default SignupForm;
