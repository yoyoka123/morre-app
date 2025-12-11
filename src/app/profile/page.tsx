'use client';

import { useRouter } from 'next/navigation';
import { Home, Building2, Coffee, Star, ChevronLeft, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// 模拟数据
const profileData = {
  basicInfo: {
    name: '小明',
    nickname: '明明',
    age: 28,
    gender: '男',
    occupation: '办公室的班的工作',
  },
  summary: '看起来是一个热爱生活的上班族，喜欢在周末探索城市的咖啡馆，工作日节奏紧凑但懂得调节。最近似乎对摄影产生了兴趣，偶尔会在朋友圈分享城市街拍。',
  lifestyle: {
    frequentPlaces: [
      { icon: 'home', label: '家', location: '望京' },
      { icon: 'work', label: '公司', location: '中关村' },
      { icon: 'cafe', label: '咖啡馆', frequency: '3次/周' },
    ],
    activityRadius: {
      value: 8.5,
      unit: 'km',
      label: '日均',
    },
    explorationIndex: 4,
    schedule: {
      leaveHome: '08:32',
      returnHome: '21:15',
      regularityPercent: 80,
    },
    habits: {
      weekendMode: '外出探索型',
      diet: '不太规律',
      exercise: '偶尔运动',
      sleep: '一般',
    },
  },
};

const PlaceIcon = ({ type }: { type: string }) => {
  const iconClass = "w-5 h-5 text-slate-600";
  switch (type) {
    case 'home': return <Home className={iconClass} />;
    case 'work': return <Building2 className={iconClass} />;
    case 'cafe': return <Coffee className={iconClass} />;
    default: return <Home className={iconClass} />;
  }
};

const HandDrawnCircle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "relative border-2 border-slate-800/80 rounded-[255px/15px] px-4 py-2 rotate-[-1deg]",
    "before:absolute before:inset-0 before:border before:border-slate-800/30 before:rounded-[200px/20px] before:rotate-[2deg] before:-z-10",
    className
  )}>
    {children}
  </div>
);

const PaperCard = ({ children, className, rotate = 0 }: { children: React.ReactNode, className?: string, rotate?: number }) => (
  <div 
    className={cn(
      "bg-[#fdfbf7] relative shadow-lg transform transition-transform duration-300 hover:scale-[1.01] hover:rotate-0",
      className
    )}
    style={{ 
      transform: `rotate(${rotate}deg)`,
      // 简单的 CSS 纹理模拟旧纸张
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
      // 撕裂边缘效果模拟 (Mask image 或者简单的 jagged border 图片会更好，这里用 clip-path 模拟不规则边缘)
      clipPath: 'polygon(0% 0%, 100% 1%, 100% 98%, 98% 100%, 95% 99%, 92% 100%, 88% 99%, 85% 100%, 82% 99%, 78% 100%, 75% 99%, 72% 100%, 68% 99%, 65% 100%, 62% 99%, 58% 100%, 55% 99%, 52% 100%, 48% 99%, 45% 100%, 42% 99%, 38% 100%, 35% 99%, 32% 100%, 28% 99%, 25% 100%, 22% 99%, 18% 100%, 15% 99%, 12% 100%, 8% 99%, 5% 100%, 2% 99%, 0% 100%)'
    }}
  >
    {children}
  </div>
);

export default function ProfilePage() {
  const router = useRouter();
  const { basicInfo, summary, lifestyle } = profileData;

  return (
    <div className="min-h-screen bg-[#5D4037] max-w-md mx-auto relative font-sans overflow-hidden">
      {/* 皮革质感背景叠加 */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leather'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leather)'/%3E%3C/svg%3E")`,
          backgroundBlendMode: 'multiply'
        }}
      />

      {/* 缝线装饰 (模拟皮具缝线) */}
      <div className="absolute top-2 bottom-2 left-2 right-2 border-2 border-dashed border-[#8D6E63] rounded-[24px] pointer-events-none opacity-50" />

      {/* 顶部 Header */}
      <header className="relative z-10 pt-12 pb-6 px-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-1 -ml-1 text-[#D7CCC8] hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[#D7CCC8] text-lg font-medium tracking-wide">
          我的点滴：{basicInfo.name}
        </h1>
        <div className="w-6" /> {/* 占位 */}
      </header>

      <main className="relative z-10 px-4 pb-24 space-y-[-10px]">
        {/* 卡片一：TA 眼中的你 */}
        <PaperCard rotate={-1} className="p-6 pb-8 rounded-sm shadow-xl z-20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center text-slate-500">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium mb-0.5">TA 眼中的你</div>
                <div className="text-[10px] text-slate-400 scale-90 origin-left">基于对话和轨迹分析生成</div>
              </div>
            </div>
            <div className="font-handwriting text-slate-800/60 text-lg rotate-[-5deg]">
              查看详情...
            </div>
          </div>

          <div className="bg-[#F5F1E8] rounded-lg p-4 mb-4 border border-slate-200/50">
            <div className="font-bold text-slate-800 mb-1">
              {basicInfo.name} <span className="font-normal text-slate-600">({basicInfo.nickname})</span>
            </div>
            <div className="text-xs text-slate-600">
              {basicInfo.age}岁，{basicInfo.gender}，{basicInfo.occupation}
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-slate-800 font-medium">
            {summary}
          </p>
        </PaperCard>

        {/* 卡片二：生活轨迹与方式 */}
        <PaperCard rotate={1} className="p-6 pb-8 rounded-sm shadow-lg z-10 pt-10 mt-[-20px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center text-slate-500">
              <span className="text-xs font-bold">L</span>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium mb-0.5">生活轨迹与方式</div>
              <div className="text-[10px] text-slate-400 scale-90 origin-left">基于轨迹和对话数据分析</div>
            </div>
          </div>

          {/* 常去地点 */}
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 mb-3 font-bold">常去地点</h3>
            <div className="flex justify-between gap-2">
              {lifestyle.frequentPlaces.map((place, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <HandDrawnCircle className="flex flex-col items-center justify-center w-full aspect-square mb-1 bg-white/50">
                    <PlaceIcon type={place.icon} />
                    <span className="text-xs font-bold text-slate-700 mt-1">{place.label}</span>
                  </HandDrawnCircle>
                  <span className="text-[10px] text-slate-500 font-medium">{place.location || place.frequency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 活动半径 */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-xs text-slate-500 font-bold">活动半径</h3>
              <span className="text-xs text-slate-500">{lifestyle.activityRadius.label}</span>
            </div>
            <div className="flex items-end justify-between mb-1">
              <span className="text-sm text-slate-400">日均</span>
              <span className="text-xl font-bold text-slate-800">
                {lifestyle.activityRadius.value} <span className="text-sm font-normal text-slate-500">{lifestyle.activityRadius.unit}</span>
              </span>
            </div>
            {/* 手绘风格进度条 */}
            <div className="h-3 w-full border border-slate-800/20 rounded-full p-[2px] relative">
              <div 
                className="h-full bg-[#64B5F6] rounded-l-full relative overflow-hidden"
                style={{ width: `${Math.min(lifestyle.activityRadius.value / 15 * 100, 100)}%` }}
              >
                {/* 蜡笔纹理叠加 */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`
                }} />
              </div>
            </div>
          </div>

          {/* 城市探索指数 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-slate-500 font-bold">城市探索指数</h3>
              <span className="text-xs text-slate-500">活跃探索</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={cn(
                    "w-5 h-5", 
                    star <= lifestyle.explorationIndex 
                      ? "text-[#FFCA28] fill-[#FFCA28]" 
                      : "text-slate-200"
                  )} 
                />
              ))}
            </div>
          </div>

          {/* 作息规律 */}
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 mb-3 font-bold">作息规律</h3>
            <div className="flex justify-between items-center mb-2 text-sm text-slate-700">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full border border-orange-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                </div>
                <span>出门 {lifestyle.schedule.leaveHome}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full border border-indigo-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-800 rounded-full" />
                </div>
                <span>到家 {lifestyle.schedule.returnHome}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-10">规律度</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFB74D] rounded-full"
                  style={{ width: `${lifestyle.schedule.regularityPercent}%` }}
                >
                   <div className="w-full h-full opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`
                  }} />
                </div>
              </div>
              <span className="text-xs text-slate-700 font-medium">{lifestyle.schedule.regularityPercent}%</span>
            </div>
          </div>

          {/* 生活方式 */}
          <div>
            <h3 className="text-xs text-slate-500 mb-3 font-bold">生活方式</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F5F1E8] p-3 rounded-md text-xs text-slate-700 space-y-1">
                <div>周末模式：{lifestyle.habits.weekendMode}</div>
                <div>运动习惯：{lifestyle.habits.exercise}</div>
              </div>
              <div className="bg-[#F5F1E8] p-3 rounded-md text-xs text-slate-700 space-y-1">
                <div>饮食习惯：{lifestyle.habits.diet}</div>
                <div>睡眠质量：{lifestyle.habits.sleep}</div>
              </div>
            </div>
          </div>
        </PaperCard>
      </main>

      {/* 底部按钮 */}
      <div className="fixed bottom-6 left-0 right-0 px-8 z-30 flex justify-center pointer-events-none">
        <button 
          onClick={() => router.back()}
          className="pointer-events-auto bg-[#3E2723] text-[#D7CCC8] px-8 py-3 rounded-lg shadow-[0_4px_14px_rgba(0,0,0,0.4)] font-medium text-sm border border-[#5D4037] active:scale-95 transition-transform"
        >
          返回
        </button>
      </div>
      
      {/* 底部装饰星号 */}
      <div className="absolute bottom-6 right-6 text-[#D7CCC8] opacity-50">
        <Sparkles className="w-6 h-6" />
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}
