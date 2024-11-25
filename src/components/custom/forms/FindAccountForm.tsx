import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FindAccountProps {
  type: 'ID' | 'PW';
}

interface FindAccountState {
  name: string;
  email?: string;
  phone: string;
  verificationCode: string;
  isPhoneVerified: boolean;
}

const FindAccount: React.FC<FindAccountProps> = ({ type }) => {
  const [formData, setFormData] = useState<FindAccountState>({
    name: '',
    email: '',
    phone: '',
    verificationCode: '',
    isPhoneVerified: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneVerification = () => {
    // 전화번호 인증 로직
    console.log('Sending verification code to:', formData.phone);
  };

  const handleVerificationConfirm = () => {
    // 인증번호 확인 로직
    setFormData((prev) => ({
      ...prev,
      isPhoneVerified: true,
    }));
  };

  const handleSubmit = () => {
    // 폼 제출 로직
    console.log('Submitting form:', formData);
  };

  return (
    <div className="flex flex-col w-full max-w-[360px] gap-6">
      <h1 className="text-3xl font-bold">{type === 'ID' ? '아이디 찾기' : '비밀번호 찾기'}</h1>

      <p className="text-gray-600">
        {type === 'ID'
          ? '회원정보에 등록된 연락처로 본인 확인을 진행하여 아이디를 찾아보세요.'
          : '회원정보에 등록된 연락처로 본인 확인을 해 주시면 비밀번호를 재설정할 수 있어요.'}
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-base font-medium mb-1 block">이름</label>
          <Input
            variant="signin"
            type="text"
            name="name"
            placeholder="홍길동"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {type === 'PW' && (
          <div>
            <label className="text-base font-medium mb-1 block">이메일 (아이디)</label>
            <Input
              variant="signin"
              type="email"
              name="email"
              placeholder="aipark@aipark.ai"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <label className="text-base font-medium mb-1 block">전화번호</label>
          <div className="flex gap-2">
            <Input
              variant="signin"
              type="tel"
              name="phone"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Button
              variant="secondary"
              size="md"
              onClick={handlePhoneVerification}
              disabled={!formData.phone}
            >
              인증 전송
            </Button>
          </div>
        </div>

        <div>
          <label className="text-base font-medium mb-1 block">인증 번호</label>
          <div className="flex gap-2">
            <Input
              variant="signin"
              type="text"
              name="verificationCode"
              placeholder="******"
              value={formData.verificationCode}
              onChange={handleInputChange}
            />
            <Button
              variant="secondary"
              size="md"
              onClick={handleVerificationConfirm}
              disabled={!formData.verificationCode}
            >
              인증 확인
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="default"
        size="default"
        onClick={handleSubmit}
        disabled={!formData.isPhoneVerified}
      >
        {type === 'ID' ? '아이디 찾기' : '비밀번호 재설정'}
      </Button>
    </div>
  );
};
export default FindAccount;
