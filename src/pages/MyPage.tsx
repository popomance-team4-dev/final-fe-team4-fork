import EditProfileForm from '@/components/custom/forms/EditProfileForm';
import MainHeader from '@/components/section/header/MainHeader';
import jisuImage from '@/images/avatar/jisu.jpg';
import PageLayout from '@/layouts/PageLayout';

const MyPage = () => {
  const defaultValues = {
    email: 'aipark@aipark.ai',
    name: '김바타',
    phoneNumber: '010-1234-1234',
  };

  return (
    <PageLayout
      variant="main"
      header={
        <MainHeader
          name="김바타"
          email="aipark@aipark.ai"
          imageUrl={jisuImage}
          onMyPage={() => {}}
          onSignout={() => console.log('로그아웃')}
        />
      }
    >
      <div className="pl-[120px] pr-8 py-8">
        <h1 className="text-2xl font-bold mb-8">마이페이지</h1>
        <EditProfileForm defaultValues={defaultValues} avatarUrl={jisuImage} />
      </div>
    </PageLayout>
  );
};

export default MyPage;
