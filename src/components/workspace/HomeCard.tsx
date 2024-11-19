import { TbArrowUpRight } from 'react-icons/tb';

interface HomeCardProps {
  title: string;
  description1: string;
  description2: string;
  number: string;
}

const HomeCard = ({ title, description1, description2, number }: HomeCardProps) => {
  return (
    <div className="relative w-[230px] h-[230px] flex-shrink-0 rounded-[16.238px] bg-white">
      <div className="absolute left-3 top-4">
        <div className="inline-flex px-[10px] py-1 items-center gap-[10px] rounded-[20px] border border-black">
          <span className="text-sm font-medium leading-5">{title}</span>
        </div>
      </div>

      <div className="absolute left-3 top-[68px]">
        <p className=" text-sm font-bold leading-5">{description1}</p>
        <p className=" text-sm font-bold leading-5">{description2}</p>
      </div>

      <div className="absolute left-3 bottom-0">
        <span className="text-gray-300  text-[80px] font-semibold leading-none">{number}</span>
      </div>

      <div className="absolute right-[10.78px] bottom-[15.78px]">
        <div className="relative w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
          <TbArrowUpRight className="text-xl text-primary" />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
