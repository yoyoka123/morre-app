'use client';

import { ChevronLeft, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { todayTasks } from '@/lib/data';

export default function AchievementsPage() {
  const router = useRouter();
  
  // 计算统计数据
  const completedCount = 12;
  const totalCount = 100;

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-gray-900 font-sans max-w-md mx-auto relative pb-24">
      {/* Page Header */}
      <div className="sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-20">
        <div className="relative flex items-center justify-center px-4 py-4 pt-14">
          <button
            onClick={() => router.back()}
            className="absolute left-4 p-2 -ml-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-900">互动事件</h1>
        </div>
      </div>

      {/* 顶部统计区域 */}
      <div className="px-6 pt-2 pb-6">
        <div className="flex justify-between items-start">
          {/* 左侧文字 */}
          <div className="pt-2">
            <div className="text-xs text-gray-500 mb-1 font-medium">完成成就</div>
            <div className="text-5xl font-bold text-gray-900 leading-none tracking-tight mb-4">
              {completedCount}
              <span className="text-2xl text-gray-300 font-normal ml-2">/ {totalCount}</span>
            </div>
            
            <button 
              onClick={() => router.push('/achievements/wall')}
              className="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-[#EAE6DC] rounded-full active:scale-95 transition-transform"
            >
              <span className="text-[11px] font-medium text-[#6B665F]">我的成就徽章墙</span>
              <span className="text-[10px] text-[#6B665F]">▶</span>
            </button>
          </div>

          {/* 右侧插画 - Ramen Bowl */}
          <div className="relative w-32 h-32 mr-[-10px]">
             {/* 模拟拉面碗插画 */}
             <div className="absolute right-0 top-0 w-28 h-28 flex items-center justify-center">
                <div className="text-[80px] leading-none transform rotate-[-5deg] drop-shadow-md filter sepia-[0.3]">
                  🍜
                </div>
                {/* 装饰元素 */}
                <div className="absolute -top-2 right-0 text-3xl rotate-12">🎮</div>
                <div className="absolute bottom-0 -left-2 text-3xl -rotate-12">💤</div>
             </div>
          </div>
        </div>
      </div>

      {/* 今日互动列表 */}
      <div className="px-5">
        <h2 className="text-sm text-gray-500 mb-3 pl-1">今日互动 <span className="ml-1 text-gray-400">5</span></h2>
        
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "bg-white rounded-[20px] p-5 relative overflow-hidden transition-all",
                "shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]"
              )}
            >
              {/* 顶部行：复选框 + 标题 + 次数 */}
              <div className="flex items-start justify-between mb-2 relative z-10">
                  <div className="flex items-center gap-3">
                    {task.isCompleted ? (
                      <div className="bg-[#1f1f1f] text-white rounded-[6px] w-5 h-5 flex items-center justify-center shadow-sm">
                        <CheckSquare size={14} className="text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="border-[1.5px] border-gray-300 rounded-[6px] w-5 h-5 bg-transparent" />
                    )}
                    <h3 className="text-[16px] font-bold text-gray-900">
                    {task.title}
                  </h3>
                </div>
                <span className="text-[11px] text-gray-400 font-medium pt-1">
                  {task.countText}
                </span>
              </div>

              {/* 描述文本 */}
              <p className="text-[13px] text-gray-500 mb-4 pl-8 leading-relaxed relative z-10">
                {task.desc}
              </p>

              {/* 引用框 */}
              <div className="bg-gray-50 rounded-[12px] p-3 pl-4 relative z-10">
                {/* 引号图标模拟 */}
                <div className="absolute left-2 top-2 text-gray-300 text-2xl font-serif leading-none opacity-50">“</div>
                <p className="text-[12px] text-gray-600 leading-relaxed pl-2 relative z-10">
                  {task.aiQuote}
                </p>
              </div>

              {/* 完成印章 (仅已完成显示) */}
              {task.isCompleted && (
                <div className="absolute right-4 top-12 z-20 pointer-events-none opacity-90 transform rotate-[-15deg]">
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4C5B0] flex items-center justify-center relative bg-white/10 backdrop-blur-[1px]">
                    <div className="absolute inset-1 border border-[#D4C5B0] rounded-full opacity-50"></div>
                    <div className="flex flex-col items-center justify-center text-[#D4C5B0]">
                      <span className="text-[10px] font-medium">达成</span>
                      <span className="text-xl font-bold leading-none">{task.count}次</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
