'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Sparkles, Mic, Backpack, Soup, Music, Gamepad2, BookOpen, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============ 数据类型 ============
interface Badge {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  bgGradient: string;
  rank?: number; // 1, 2, 3 for top 3
  isUnlocked: boolean;
  condition: string; // 完成条件
  completedAt?: string; // 完成时间
}

// ============ 模拟数据 ============
const topBadges: Badge[] = [
  {
    id: '1',
    name: 'K歌达人',
    count: 365,
    icon: <Mic className="w-full h-full text-yellow-600" fill="currentColor" />,
    bgGradient: 'from-yellow-100 to-yellow-50',
    rank: 1,
    isUnlocked: true,
    condition: '累计K歌超过365次',
    completedAt: '2025.10.01 16:30'
  },
  {
    id: '2',
    name: '旅行达人',
    count: 365,
    icon: <Backpack className="w-full h-full text-green-600" fill="currentColor" />,
    bgGradient: 'from-green-100 to-green-50',
    rank: 2,
    isUnlocked: true,
    condition: '累计去往不同城市旅行365次',
    completedAt: '2025.09.15 10:20'
  },
  {
    id: '3',
    name: '美食达人',
    count: 365,
    icon: <Soup className="w-full h-full text-orange-600" />,
    bgGradient: 'from-orange-100 to-orange-50',
    rank: 3,
    isUnlocked: true,
    condition: '累计打卡美食店铺365次',
    completedAt: '2025.08.20 19:45'
  },
];

const allBadges: Badge[] = [
  {
    id: '4',
    name: '步行达人',
    count: 5,
    icon: <Soup className="w-full h-full text-orange-400" />, // 重复使用一下图标
    bgGradient: 'bg-orange-50',
    isUnlocked: true,
    condition: '带着崽崽日走2万步',
    completedAt: '2025.10.10 16:30'
  },
  {
    id: '5',
    name: '音乐达人',
    count: 5,
    icon: <Music className="w-full h-full text-orange-400" />,
    bgGradient: 'bg-orange-50',
    isUnlocked: true,
    condition: '累计收听音乐超过50小时',
    completedAt: '2025.11.11 09:00'
  },
  {
    id: '6',
    name: '探险达人',
    count: 5,
    icon: <Backpack className="w-full h-full text-green-500" />,
    bgGradient: 'bg-green-50',
    isUnlocked: true,
    condition: '累计探索5个新地点',
    completedAt: '2025.10.05 14:15'
  },
  {
    id: '7',
    name: '游戏达人',
    count: 1,
    icon: <Gamepad2 className="w-full h-full text-pink-400" />,
    bgGradient: 'bg-pink-50',
    isUnlocked: true,
    condition: '累计游戏时长超过10小时',
    completedAt: '2025.12.08 22:30'
  },
  {
    id: '8',
    name: '学习达人',
    count: 99,
    icon: <BookOpen className="w-full h-full text-blue-400" />,
    bgGradient: 'bg-blue-50',
    isUnlocked: true,
    condition: '累计学习打卡99天',
    completedAt: '2025.12.09 08:00'
  },
  {
    id: '9',
    name: '摄影达人',
    count: 6,
    icon: <Camera className="w-full h-full text-gray-500" />,
    bgGradient: 'bg-gray-100',
    isUnlocked: true,
    condition: '累计拍摄并上传6张照片',
    completedAt: '2025.11.25 11:20'
  },
  {
    id: '10',
    name: '早起达人',
    count: 0,
    icon: <Soup className="w-full h-full text-gray-400" />,
    bgGradient: 'bg-gray-100',
    isUnlocked: false,
    condition: '连续早起打卡7天',
  },
  {
    id: '11',
    name: '阅读达人',
    count: 0,
    icon: <Soup className="w-full h-full text-gray-400" />,
    bgGradient: 'bg-gray-100',
    isUnlocked: false,
    condition: '累计阅读书籍5本',
  },
  {
    id: '12',
    name: '运动达人',
    count: 0,
    icon: <Soup className="w-full h-full text-gray-400" />,
    bgGradient: 'bg-gray-100',
    isUnlocked: false,
    condition: '累计运动打卡30次',
  },
];

export default function BadgeWallPage() {
  const router = useRouter();

  // 动态计算已获得的徽章数量
  const obtainedCount = topBadges.filter(b => b.isUnlocked).length + allBadges.filter(b => b.isUnlocked).length;
  const totalCount = topBadges.length + allBadges.length;

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  const handleCloseModal = () => {
    setSelectedBadge(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-gray-900 font-sans max-w-md mx-auto relative pb-10">
      {/* Header */}
      <div className="sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-20 px-4 py-4 pt-14 flex items-center justify-center">
        <button
          onClick={() => router.back()}
          className="absolute left-4 p-2 -ml-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我们的100件小事</h1>
      </div>

      {/* Top 10 Section */}
      <div className="px-5 mt-2">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-gray-800 fill-current" />
            <h2 className="text-base font-bold text-gray-800">最高记录TOP10</h2>
          </div>
          <span className="text-xs text-gray-400 font-light">每日0点更新</span>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-3 gap-3">
          {topBadges.map((badge, index) => (
            <div 
              key={badge.id} 
              onClick={() => handleBadgeClick(badge)}
              className="bg-white rounded-2xl p-3 flex flex-col items-center relative shadow-sm cursor-pointer active:scale-95 transition-transform"
            >
              {/* Rank Number */}
              <div className="absolute top-1 left-2 text-3xl font-black italic text-gray-900 leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>
                {badge.rank}
              </div>
              
              {/* Icon Container */}
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-2 mt-4 bg-gradient-to-br p-3",
                badge.bgGradient
              )}>
                {badge.icon}
              </div>

              <div className="text-sm font-bold text-gray-800 mb-1">{badge.name}</div>
              <div className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-medium">
                达成{badge.count}次
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Wall Section */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-gray-800 fill-current" />
            <h2 className="text-base font-bold text-gray-800">小事墙</h2>
          </div>
          <span className="text-sm text-gray-900 font-bold">
            已获得 {obtainedCount} <span className="text-gray-400 font-normal">/ {totalCount}</span>
          </span>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-3 gap-3">
          {allBadges.map((badge) => (
            <div 
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center min-h-[140px] shadow-sm cursor-pointer active:scale-95 transition-transform"
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 bg-opacity-50 p-3",
                badge.bgGradient,
                !badge.isUnlocked && "grayscale opacity-50"
              )}>
                {badge.icon}
              </div>
              <div className={cn("text-sm font-medium mb-1", badge.isUnlocked ? "text-gray-800" : "text-gray-400")}>
                {badge.name}
              </div>
              <div className={cn("text-[10px]", badge.isUnlocked ? "text-gray-500" : "text-gray-300")}>
                {badge.isUnlocked ? `达成 ${badge.count} 次` : '未获得'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Full Screen Badge Details Overlay */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-fadeIn">
           
           {/* Icon Section */}
           <div className={cn(
             "w-48 h-48 mb-8 relative flex items-center justify-center transition-all duration-500 animate-scaleIn",
             !selectedBadge.isUnlocked && "grayscale opacity-60"
           )}>
             {/* Decorative Stars for unlocked state */}
             {selectedBadge.isUnlocked && (
               <>
                 <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-[#FFD666] animate-pulse" fill="currentColor" />
                 <Sparkles className="absolute top-10 -left-6 w-8 h-8 text-[#FFD666] animate-bounce" fill="currentColor" />
               </>
             )}
             
             {/* Large Icon */}
             <div className="w-full h-full drop-shadow-2xl">
                {selectedBadge.icon}
             </div>
           </div>

           {/* Name */}
           <h3 className="text-[28px] font-bold text-gray-900 mb-3 tracking-tight">
             {selectedBadge.name}
           </h3>

           {/* Condition */}
           <p className="text-[15px] text-gray-600 mb-8 font-medium text-center max-w-[80%] leading-relaxed">
             {selectedBadge.condition}
           </p>

           {/* Time & Count Info */}
           <div className="flex flex-col items-center gap-3 mb-16">
              <div className="text-[14px] text-gray-500 font-normal">
                {selectedBadge.isUnlocked 
                   ? `首次获得勋章时间：${selectedBadge.completedAt}` 
                   : '未解锁'
                }
              </div>
              
              {selectedBadge.isUnlocked && (
                <div className="text-[14px] text-gray-900 font-medium bg-gray-100 px-4 py-1.5 rounded-full">
                  达成次数：{selectedBadge.count} 次
                </div>
              )}
           </div>

           {/* Close Button */}
           <button
             onClick={handleCloseModal}
             className="w-14 h-14 rounded-full bg-[#EAE6DD] flex items-center justify-center text-gray-600 hover:opacity-90 transition-opacity shadow-sm active:scale-95"
           >
             <X size={28} />
           </button>
        </div>
      )}
    </div>
  );
}
