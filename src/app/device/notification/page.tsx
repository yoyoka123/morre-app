'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotificationSettings } from './store';
import { formatDays } from './types';

export default function NotificationSettingsPage() {
  const router = useRouter();
  const { settings, updateSettings, isLoaded } = useNotificationSettings();

  // 防止水合不匹配
  if (!isLoaded) return <div className="min-h-screen bg-[#F8F6F1]" />;

  const toggleEnabled = () => {
    updateSettings({ ...settings, enabled: !settings.enabled });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1f1f1f] font-sans max-w-md mx-auto relative pb-12">
      {/* Header */}
      <div className="sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-20">
        <div className="relative flex items-center justify-center px-4 py-4 pt-14">
          <button
            onClick={() => router.back()}
            className="absolute left-4 p-2 -ml-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">消息通知</h1>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="text-xs text-gray-500 mb-2 pl-2">智能体主动语音播报发消息</div>
        
        {/* Main Card */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
            
            {/* Toggle Switch Row */}
            <div className="p-5 flex items-center justify-between">
                <span className="text-[16px] font-medium text-gray-900">消息语音播报</span>
                <button 
                    onClick={toggleEnabled}
                    className={cn(
                        "w-12 h-7 rounded-full transition-colors relative duration-300",
                        settings.enabled ? "bg-[#FFB800]" : "bg-gray-200"
                    )}
                >
                    <div className={cn(
                        "absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300",
                        settings.enabled ? "translate-x-6" : "translate-x-1"
                    )} />
                </button>
            </div>

            {/* Divider if enabled */}
            {settings.enabled && (
                <div className="h-[1px] bg-gray-100 mx-5" />
            )}

            {/* Time Settings Area */}
            {settings.enabled && (
                <div className="p-5 pt-4 animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                         <div className="text-sm font-medium text-gray-900">设置语音播报时间</div>
                    </div>
                   
                    <div className="space-y-4">
                        {settings.schedules.map((schedule) => (
                            <div 
                                key={schedule.id}
                                onClick={() => router.push(`/device/notification/edit?id=${schedule.id}`)}
                                className="group cursor-pointer active:scale-[0.99] transition-transform"
                            >
                                <div className="text-[15px] font-medium text-gray-600 mb-1">
                                    {schedule.start}-{schedule.end} <span className="text-gray-400 ml-2 font-normal text-xs">{formatDays(schedule.days)}</span>
                                </div>
                            </div>
                        ))}
                        
                        {settings.schedules.length === 0 && (
                            <div className="text-gray-400 text-sm py-1">
                                暂无时间段
                            </div>
                        )}

                        <button 
                            onClick={() => router.push('/device/notification/edit')}
                            className="text-[#FFB800] text-sm font-medium mt-1 inline-block hover:opacity-80"
                        >
                            添加时间
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
