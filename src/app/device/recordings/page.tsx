'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MoreVertical, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============ 数据类型 ============
interface RecordFile {
  id: string;
  title: string;
  duration: string; // e.g. "00:00:12"
  date: string; // e.g. "今天 15:30" or "9.30 15:30"
  isPlaying?: boolean; // 仅用于前端状态控制
}

// ============ 模拟数据 ============
const initialRecords: RecordFile[] = [
  { id: '1', title: '这是录音内容AI总结的标题', duration: '00:00:12', date: '今天 15:30' },
  { id: '2', title: '这是录音内容AI总结的标题', duration: '00:00:12', date: '9.30 15:30' },
  { id: '3', title: '这是录音内容AI总结的标题', duration: '00:00:12', date: '2024.12.30 15:30' },
];

export default function RecordingsPage() {
  const router = useRouter();
  const [records, setRecords] = useState<RecordFile[]>(initialRecords);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [actionSheetId, setActionSheetId] = useState<string | null>(null);

  // 播放控制
  const togglePlay = (id: string) => {
    if (currentPlayingId === id) {
      setCurrentPlayingId(null);
    } else {
      setCurrentPlayingId(id);
    }
  };

  // 菜单控制 - 打开底部 Action Sheet
  const openActionSheet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActionSheetId(id);
  };

  // 关闭菜单
  const closeActionSheet = () => {
    setActionSheetId(null);
  };

  // 删除录音
  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
    closeActionSheet();
  };

  // 下载录音 (模拟)
  const handleDownload = (id: string) => {
    // TODO: Implement actual download logic
    console.log('Download record:', id);
    closeActionSheet();
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
          <h1 className="text-lg font-medium text-gray-900">录音文件</h1>
        </div>
      </div>

      <div className="px-5 mt-2 space-y-3">
        {records.map((record) => (
          <div 
            key={record.id}
            className="bg-white rounded-[20px] p-4 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] relative"
          >
            {/* 标题栏 */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[15px] font-medium text-gray-900 pr-8 line-clamp-1">
                {record.title}
              </h3>
              <button 
                className="absolute top-3 right-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                onClick={(e) => openActionSheet(record.id, e)}
              >
                <MoreVertical size={16} />
              </button>
            </div>

            {/* 播放条区域 */}
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-3 flex-1">
                 <button 
                   onClick={() => togglePlay(record.id)}
                   className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex-shrink-0"
                 >
                   {currentPlayingId === record.id ? (
                     <Pause size={12} fill="currentColor" />
                   ) : (
                     <Play size={12} fill="currentColor" className="ml-0.5" />
                   )}
                 </button>
                 
                  <div className="flex items-center gap-[2px] h-4 flex-1 max-w-[120px]">
                    {[...Array(12)].map((_, i) => {
                      // Use a deterministic height based on index instead of Math.random()
                      // This avoids hydration mismatch errors
                      const height = 30 + (Math.sin(i) * 30 + 30); 
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "w-[2px] rounded-full bg-gray-300 transition-all duration-300",
                            currentPlayingId === record.id && "animate-pulse bg-gray-800",
                          )}
                          style={{ 
                            height: `${height}%` 
                          }}
                        />
                      );
                    })}
                  </div>
               </div>

               <span className="text-xs text-gray-400 font-mono tabular-nums">
                 {record.duration}
               </span>
            </div>

            {/* 底部日期 */}
            <div className="text-[11px] text-gray-400">
              {record.date}
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部 Action Sheet 模态框 */}
      {actionSheetId && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black/40 animate-fadeIn backdrop-blur-[1px]"
            onClick={closeActionSheet}
          />
          
          {/* 菜单内容 */}
          <div className="relative z-10 w-full max-w-md mx-auto px-4 pb-8 animate-slideUp">
             <div className="bg-white rounded-[20px] overflow-hidden shadow-xl mb-3">
               <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-2 mb-1" />
               
               <button 
                 className="w-full py-4 text-[17px] text-gray-900 font-medium active:bg-gray-50 transition-colors"
                 onClick={() => handleDownload(actionSheetId)}
               >
                 下载
               </button>
               
               <div className="h-[1px] bg-gray-100" />
               
               <button 
                 className="w-full py-4 text-[17px] text-red-500 font-medium active:bg-red-50 transition-colors"
                 onClick={() => handleDelete(actionSheetId)}
               >
                 删除
               </button>
             </div>

             <button 
               className="w-full bg-white rounded-[20px] py-4 text-[17px] text-gray-900 font-semibold shadow-lg active:scale-[0.98] transition-all"
               onClick={closeActionSheet}
             >
               取消
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
