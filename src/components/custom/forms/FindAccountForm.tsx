import React, { useState } from 'react';

import { findID, findPassword } from '@/api/profileAPI';
import { ResultDialog } from '@/components/custom/dialogs/FindResultDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FindAccountProps {
  type: 'ID' | 'PW';
}

interface FindAccountState {
  name: string;
  email: string;
  phone: string;
}

const FindAccount: React.FC<FindAccountProps> = ({ type }) => {
  const [formData, setFormData] = useState<FindAccountState>({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      if (type === 'ID') {
        if (!formData.name || !formData.phone) {
          throw new Error('이름과 전화번호를 모두 입력해주세요.');
        }

        const response = await findID({
          name: formData.name,
          phoneNumber: formData.phone,
        });

        if (response.data.email) {
          setResultMessage(`찾으시는 아이디는 [ ${response.data.email} ] 입니다.`);
          setResultDialogOpen(true);
        } else {
          throw new Error(response.data?.message || '일치하는 사용자 정보를 찾을 수 없습니다.');
        }
      } else {
        if (!formData.email || !formData.phone) {
          throw new Error('이메일과 전화번호를 모두 입력해주세요.');
        }

        const response = await findPassword({
          email: formData.email,
          phoneNumber: formData.phone,
        });

        if (response.data.password) {
          setResultMessage(`임시 비밀번호는 [ ${response.data.password} ] 입니다.`);
          setResultDialogOpen(true);
        } else {
          setError(response.data?.message || '일치하는 사용자 정보를 찾을 수 없습니다.');
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '오류가 발생했습니다. 다시 시도해주세요.';

      setError(errorMessage);
      setResultDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-[360px] gap-6">
        <h1 className="text-3xl font-bold">{type === 'ID' ? '아이디 찾기' : '비밀번호 찾기'}</h1>

        <p className="text-gray-600">
          {type === 'ID'
            ? '회원정보에 등록된 이름과 연락처로 아이디를 찾아보세요.'
            : '회원정보에 등록된 아이디와 연락처로 비밀번호를 확인하세요.'}
        </p>

        <div className="flex flex-col gap-4">
          {type === 'ID' ? (
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
          ) : (
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
            <Input
              variant="signin"
              type="tel"
              name="phone"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Button variant="default" size="default" onClick={handleSubmit}>
          {type === 'ID' ? '아이디 찾기' : '비밀번호 찾기'}
        </Button>
      </div>

      <ResultDialog
        open={resultDialogOpen}
        onOpenChange={setResultDialogOpen}
        title={type === 'ID' ? '아이디 찾기 결과' : '비밀번호 찾기 결과'}
        message={resultMessage}
      />
    </>
  );
};

export default FindAccount;
