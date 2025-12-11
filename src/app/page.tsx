'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Settings, PenLine, Mail, CalendarCheck, Battery, ChevronDown, Drama, Hexagon, Quote } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [characterName, setCharacterName] = useState('明日香');
  const [characterAvatar, setCharacterAvatar] = useState('/character.png');

  // 从 localStorage 加载智能体数据
  useEffect(() => {
    const loadAgentData = () => {
      const savedData = localStorage.getItem('agentData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.name) {
            setCharacterName(parsed.name);
          }
          if (parsed.avatar) {
            setCharacterAvatar(parsed.avatar);
          }
        } catch (e) {
          console.error('Failed to parse agentData:', e);
        }
      }
    };

    loadAgentData();
    window.addEventListener('popstate', loadAgentData);
    window.addEventListener('storage', loadAgentData);
    // 页面可见性变化时重新加载数据（从其他页面返回时）
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadAgentData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('popstate', loadAgentData);
      window.removeEventListener('storage', loadAgentData);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#F8F6F1] text-[#1f1f1f] font-sans pb-24">
      {/* Top Bar */}
      <header className="flex items-start justify-between px-5 pt-14 pb-4">
        <div className="flex flex-col gap-1">
           <h1 className="text-[28px] font-black tracking-tight text-black leading-none">Morre</h1>
           <div className="flex items-center gap-2">
             <div className="flex items-center text-[11px] text-gray-500 font-medium bg-white/50 px-1.5 py-0.5 rounded-md border border-gray-200/50">
               <Battery className="w-3.5 h-3.5 mr-1 text-gray-800" fill="currentColor" />
               <span className="text-gray-900">45%</span>
             </div>
             <div className="flex items-center gap-1 text-[11px] text-[#3BA55D] font-medium">
               <span className="w-1.5 h-1.5 rounded-full bg-[#3BA55D] animate-pulse"></span>
               连接中
             </div>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/settings">
            <button className="p-2.5 rounded-full bg-[#F2EFE9] hover:bg-[#EAE6DD] transition-colors">
              <Hexagon className="w-5 h-5 text-gray-900 stroke-[2.5]" />
            </button>
          </Link>
          <Link href="/device">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm relative cursor-pointer">
              <img
                src={characterAvatar}
                alt="User Avatar"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </header>

      <main className="px-5 space-y-8">
        {/* Character Hero Section */}
        <div className="relative flex flex-col items-center mt-4">
          {/* Main Device Circle */}
          <div className="relative w-72 h-72 mb-2">
             {/* Device Body */}
             <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#EAE6DD] to-[#F5F2EB] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border-4 border-white/40"></div>
             
             {/* Screen/Image Area */}
             <div className="absolute inset-4 rounded-full overflow-hidden bg-black shadow-inner border-[8px] border-[#D4C5B0]/20">
              <img
                src={characterAvatar}
                alt="Character"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Screen Reflection/Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none rounded-full"></div>
            </div>
          </div>

          {/* Name and Stats Row */}
          <div className="w-full flex items-end justify-between px-1 relative mt-[-10px] z-10">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{characterName}</h2>
              <Link href="/agent/edit">
                <button className="p-1.5 bg-[#EAE6DD] rounded-full hover:bg-[#DED9CE] transition-colors active:scale-95 shadow-sm">
                  <PenLine className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </Link>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold text-gray-900 leading-none tracking-tight">23</span>
              <span className="text-[10px] text-gray-400 font-medium mt-1 tracking-wide">陪伴天数</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Interaction Events */}
          <Link href="/achievements" className="block">
            <div className="bg-white rounded-[20px] p-3.5 pb-4 flex flex-col items-start gap-3 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] h-full relative overflow-hidden">
               {/* Background Decoration */}
               <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50/50 rounded-full blur-xl pointer-events-none"></div>
               
               <div className="w-9 h-9 rounded-[14px] bg-[#EEF2FF] text-[#5B7AD1] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CalendarCheck className="w-5 h-5" />
               </div>
               <div className="flex flex-col items-start gap-0.5">
                  <span className="font-bold text-gray-900 text-[13px]">互动事件</span>
                  <span className="text-[10px] text-gray-400 font-medium">今日2/5</span>
               </div>
            </div>
          </Link>

          {/* Letters */}
          <Link href="/letters" className="block">
            <div className="bg-white rounded-[20px] p-3.5 pb-4 flex flex-col items-start gap-3 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] h-full relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-50/50 rounded-full blur-xl pointer-events-none"></div>

               <div className="w-9 h-9 rounded-[14px] bg-[#FFF6E5] text-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
               </div>
               <div className="flex flex-col items-start gap-0.5">
                  <span className="font-bold text-gray-900 text-[13px]">我的信</span>
                  <span className="text-[10px] text-gray-400 font-medium">12.9来信</span>
               </div>
            </div>
          </Link>

          {/* Insights/Profile */}
          <Link href="/profile" className="block">
            <div className="bg-white rounded-[20px] p-3.5 pb-4 flex flex-col items-start gap-3 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] h-full relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-16 h-16 bg-pink-50/50 rounded-full blur-xl pointer-events-none"></div>

               <div className="w-9 h-9 rounded-[14px] bg-[#FFF0F5] text-[#D86F98] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Drama className="w-5 h-5" />
               </div>
               <div className="flex flex-col items-start gap-0.5">
                  <span className="font-bold text-gray-900 text-[13px]">对我的认识</span>
                  <div className="flex items-center text-[10px] text-gray-400 font-medium">
                    更新 <ChevronDown className="w-2.5 h-2.5 -rotate-90 ml-0.5" />
                  </div>
               </div>
            </div>
          </Link>
        </div>

        {/* Today's Interaction Section */}
        <div>
          <h3 className="text-[17px] font-bold text-gray-900 mb-3 pl-1">今日互动</h3>
          
          <div className="space-y-3">
            
            {/* 100 Little Things Card 1 */}
            <div
              className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.99] transition-transform relative overflow-hidden"
              onClick={() => router.push('/achievements')}
            >
               {/* Large Quote Mark Decoration */}
               <Quote className="absolute top-4 left-4 w-8 h-8 text-[#FFF6E5] fill-current transform rotate-180 z-0" />

               <div className="flex justify-between items-start mb-3 relative z-10">
                 <span className="px-2.5 py-1 bg-[#FFF6E5] text-[#8B6E4E] text-[10px] font-bold rounded-lg">
                   和TA的100件小事
                 </span>
                 <span className="text-[10px] text-gray-300 font-medium">12-15 10:00</span>
               </div>
               
               <p className="text-gray-800 text-[15px] leading-relaxed font-bold transition-all mb-4 relative z-10 pl-1 line-clamp-3">
                   刚好附近有枫叶街道，大概只有几百米哦~ 要不要一起去看看，我可以给你带路，现在正是最美的季节呢！
               </p>

               <div className="flex items-center justify-between border-t border-gray-50 pt-3 relative z-10">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-[4px] border-2 border-gray-300 flex items-center justify-center">
                     {/* Check mark if done */}
                   </div>
                   <span className="text-xs text-gray-600 font-medium">秋季赏枫叶</span>
                 </div>
                 <span className="text-[10px] text-gray-400">0次达成</span>
               </div>
            </div>

             {/* 100 Little Things Card 2 */}
             <div
               className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.99] transition-transform relative overflow-hidden"
               onClick={() => router.push('/achievements')}
             >
                <Quote className="absolute top-4 left-4 w-8 h-8 text-[#FFF6E5] fill-current transform rotate-180 z-0" />

                <div className="flex justify-between items-start mb-3 relative z-10">
                  <span className="px-2.5 py-1 bg-[#FFF6E5] text-[#8B6E4E] text-[10px] font-bold rounded-lg">
                    和TA的100件小事
                  </span>
                  <span className="text-[10px] text-gray-300 font-medium">12-15 10:00</span>
                </div>
                
                <p className="text-gray-800 text-[15px] leading-relaxed font-bold transition-all mb-4 relative z-10 pl-1 line-clamp-2">
                   元旦到了，要不要一起去滑雪
                </p>

                <div className="flex items-center justify-between border-t border-gray-50 pt-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-[4px] border-2 border-gray-300"></div>
                    <span className="text-xs text-gray-600 font-medium">冬日滑雪</span>
                  </div>
                  <span className="text-[10px] text-gray-400">0次达成</span>
                </div>
             </div>

            {/* Insight Card */}
            <div
              className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => router.push('/profile')}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-[#FFF0F5] text-[#D86F98] text-[10px] font-bold rounded-lg">
                  对我的认知画像
                </span>
                <span className="text-[10px] text-gray-300 font-medium">12-15 10:00</span>
              </div>
              <p className="text-gray-800 text-[15px] leading-relaxed font-medium mt-1">
                看起来像是一个上班族，早出晚归，饮食无规律，偶尔会出差
              </p>
            </div>

            {/* Daily Letter (Text Only) */}
             <div
               className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.99] transition-transform"
               onClick={() => router.push('/letter/1')}
             >
               <div className="flex justify-between items-start mb-3">
                 <span className="px-2.5 py-1 bg-[#EAF2FF] text-[#5B7AD1] text-[10px] font-bold rounded-lg">
                   每日来信
                 </span>
                 <span className="text-[10px] text-gray-300 font-medium">12-15 10:00</span>
               </div>
               <h4 className="text-[15px] font-bold text-gray-900 mb-1">和你轻声闲聊的片刻</h4>
               <p className="text-gray-400 text-[12px] leading-relaxed line-clamp-2">
                 XXXX，今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格外繁多吧？而且我留意到，你今天见...
               </p>
            </div>

            {/* Daily Letter (With Image) */}
            <div
               className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] cursor-pointer active:scale-[0.99] transition-transform flex gap-4"
               onClick={() => router.push('/letter/2')}
             >
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start mb-3">
                   <span className="px-2.5 py-1 bg-[#EAF2FF] text-[#5B7AD1] text-[10px] font-bold rounded-lg">
                     每日来信
                   </span>
                   <span className="text-[10px] text-gray-300 font-medium">12-15 10:00</span>
                 </div>
                 <h4 className="text-[15px] font-bold text-gray-900 mb-1">和你轻声闲聊的片刻</h4>
                 <p className="text-gray-400 text-[12px] leading-relaxed line-clamp-2">
                   XXXX，今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格...
                 </p>
               </div>
               <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50 relative rotate-2 shadow-sm mt-1">
                 <Image
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
                    alt="Letter Image"
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 border-[3px] border-white/50 rounded-xl pointer-events-none"></div>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
