import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { SignupFormData } from '@/types/signup';
import { signupFormSchema, transformFormToRequest } from '@/utils/signupSchema';

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

  const onSubmit = (data: SignupFormData) => {
    const requestData = transformFormToRequest(data);
    console.log(requestData);
  };

  const handleEmailCheck = () => {
    const email = form.getValues('email');
    console.log('이메일 중복 체크:', email);
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

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="all-terms"
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue('terms', ['age', 'service', 'privacy']);
                } else {
                  form.setValue('terms', []);
                }
              }}
              checked={form.watch('terms').length === 3}
              className="h-[18px] w-[18px]"
            />
            <label htmlFor="all-terms" className="text-sm font-medium">
              모두 동의
            </label>
          </div>

          <FormField
            control={form.control}
            name="terms"
            render={() => (
              <FormItem>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex h-[18px] items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('age')}
                              onCheckedChange={(checked) => {
                                const currentTerms = field.value || [];
                                if (checked) {
                                  field.onChange([...currentTerms, 'age']);
                                } else {
                                  field.onChange(currentTerms.filter((value) => value !== 'age'));
                                }
                              }}
                              className="h-[18px] w-[18px]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center">
                      <label className="text-sm font-medium">
                        <span className="text-primary">(필수)</span> 만14세 이상
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex h-[18px] items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('service')}
                              onCheckedChange={(checked) => {
                                const currentTerms = field.value || [];
                                if (checked) {
                                  field.onChange([...currentTerms, 'service']);
                                } else {
                                  field.onChange(
                                    currentTerms.filter((value) => value !== 'service')
                                  );
                                }
                              }}
                              className="h-[18px] w-[18px]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center">
                      <label className="text-sm font-medium">
                        <span className="text-primary">(필수)</span> 이용약관 동의{' '}
                        <button type="button" className="text-gray-400 hover:text-gray-600 ml-2">
                          보기
                        </button>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex h-[18px] items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('privacy')}
                              onCheckedChange={(checked) => {
                                const currentTerms = field.value || [];
                                if (checked) {
                                  field.onChange([...currentTerms, 'privacy']);
                                } else {
                                  field.onChange(
                                    currentTerms.filter((value) => value !== 'privacy')
                                  );
                                }
                              }}
                              className="h-[18px] w-[18px]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center">
                      <label className="text-sm font-medium">
                        <span className="text-primary">(필수)</span> 개인정보 수집 · 이용 동의{' '}
                        <button type="button" className="text-gray-400 hover:text-gray-600 ml-2">
                          보기
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="my-8 w-full">
          회원 가입하기
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
