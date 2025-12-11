'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotificationSettings } from '../store';
import { NotificationSchedule, WEEKDAYS, formatDays } from '../types';
import { Modal } from '@/components/ui/Modal';

function EditScheduleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { settings, updateSettings, isLoaded } = useNotificationSettings();

  const [start, setStart] = useState('18:00');
  const [end, setEnd] = useState('07:00');
  const [days, setDays] = useState<number[]>([]); 
  const [isReady, setIsReady] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // New state for modal

  useEffect(() => {
    if (isLoaded) {
      if (id) {
        const schedule = settings.schedules.find(s => s.id === id);
        if (schedule) {
          setStart(schedule.start);
          setEnd(schedule.end);
          setDays(schedule.days);
        }
      } else {
        setDays([0, 1, 2, 3, 4, 5, 6]);
      }
      setIsReady(true);
    }
  }, [isLoaded, id, settings.schedules]);

  if (!isReady) return <div className="min-h-screen bg-[#F8F6F1]" />;

  const handleSave = () => {
    const newSchedule: NotificationSchedule = {
      id: id || Date.now().toString(),
      start,
      end,
      days
    };

    let newSchedules = [...settings.schedules];
    if (id) {
      const index = newSchedules.findIndex(s => s.id === id);
      if (index !== -1) {
        newSchedules[index] = newSchedule;
      }
    } else {
      newSchedules.push(newSchedule);
    }

    updateSettings({ ...settings, schedules: newSchedules });
    router.back();
  };

  const confirmDelete = () => {
    if (!id) return;
    const newSchedules = settings.schedules.filter(s => s.id !== id);
    updateSettings({ ...settings, schedules: newSchedules });
    router.back();
  };

  const toggleDay = (dayIndex: number) => {
    if (days.includes(dayIndex)) {
      setDays(days.filter(d => d !== dayIndex));
    } else {
      setDays([...days, dayIndex].sort());
    }
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
          <h1 className="text-lg font-bold text-gray-900">语音播报时间</h1>
          {id && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="absolute right-4 p-2 -mr-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 mt-4 space-y-6">
        {/* Preview Card */}
        <div className="bg-[#EAE6DC] rounded-[24px] p-6 relative overflow-hidden">
            <div className="relative z-10">
                <div className="text-2xl font-bold text-[#1f1f1f] mb-2">
                    {start}-{end}
                </div>
                <div className="text-sm text-[#6B665F]">
                    {formatDays(days)}
                </div>
            </div>
            {/* Clock Icon Decoration */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                <Clock size={80} className="text-white" fill="currentColor" />
            </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
            
            {/* Start Time */}
            <div className="relative flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    <span className="text-[15px] font-medium text-gray-900">开始</span>
                </div>
                <div className="relative">
                    <span className="text-[17px] font-medium text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg">
                        {start}
                    </span>
                    <input 
                        type="time" 
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                </div>
            </div>

            {/* End Time */}
            <div className="relative flex items-center justify-between py-3 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full border border-gray-400" />
                    <span className="text-[15px] font-medium text-gray-900">结束</span>
                </div>
                <div className="relative">
                    <span className="text-[17px] font-medium text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg">
                        {end}
                    </span>
                    <input 
                        type="time" 
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                </div>
            </div>

            {/* Weekdays Selector */}
            <div className="flex justify-between items-center px-1">
                {WEEKDAYS.map((day, index) => {
                    const isSelected = days.includes(index);
                    return (
                        <button
                            key={index}
                            onClick={() => toggleDay(index)}
                            className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                                isSelected 
                                    ? "bg-[#1f1f1f] text-white shadow-md" 
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Save Button */}
        <button
            onClick={handleSave}
            className="w-full bg-white text-[#FFB800] text-[16px] font-bold py-4 rounded-[20px] shadow-sm active:scale-[0.98] transition-transform"
        >
            保存
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="确认删除"
        footer={
          <div className="flex gap-3">
             <button
               onClick={() => setShowDeleteConfirm(false)}
               className="flex-1 py-3 bg-gray-100 rounded-[12px] text-gray-600 font-medium active:scale-[0.98] transition-transform"
             >
               取消
             </button>
             <button
               onClick={confirmDelete}
               className="flex-1 py-3 bg-red-500 text-white rounded-[12px] font-medium active:scale-[0.98] transition-transform"
             >
               删除
             </button>
          </div>
        }
      >
        <p className="text-center text-gray-500 text-[15px]">
          确定要删除这个语音播报时间段吗？此操作无法撤销。
        </p>
      </Modal>
    </div>
  );
}

export default function EditSchedulePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F6F1]" />}>
      <EditScheduleContent />
    </Suspense>
  );
}
