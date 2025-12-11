'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, RotateCcw, Image as ImageIcon, Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ============ 模拟数据 ============
const DEFAULT_DESC = `第二适格者，也是福音战士2号机的驾驶员。是一位具备随意指使旁人的性格，并拥有偶像般容貌的少女。高傲而强势，火红的印象色与暴躁的脾气是其特征。混血儿，有四分之三德国血统和四分之一日本血统，所以外表更像欧洲人。在德国出生并长大，然而却是美国公民。
对身为EVA驾驶员感到骄傲，经常把头部接口装置当成发箍来佩戴，因为希望周遭的人知道自己是EVA驾驶员。`;

const VOICE_OPTIONS = [
  { id: '1', name: '台湾甜妹', preview: '/audio/sweet.mp3' },
  { id: '2', name: '清冷御姐', preview: '/audio/cool.mp3' },
  { id: '3', name: '元气少女', preview: '/audio/energetic.mp3' },
  { id: '4', name: '温柔学姐', preview: '/audio/gentle.mp3' },
];

export default function EditCharacterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [avatar, setAvatar] = useState('/character.png');
  const [name, setName] = useState('明日香');
  const [desc, setDesc] = useState(DEFAULT_DESC);
  const [voiceId, setVoiceId] = useState('1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showVoiceSheet, setShowVoiceSheet] = useState(false);

  // 初始化声音（如果在 URL 里有的话，模拟从声音列表页选完回来）
  // 实际上这里我用一个 Sheet 来做声音选择，体验更好，不需要跳页
  
  const currentVoice = VOICE_OPTIONS.find(v => v.id === voiceId) || VOICE_OPTIONS[0];

  // 播放声音模拟
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000); // 模拟播放3秒后停止
    }
  };

  // 更换图片
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  // 保存处理
  const handleSave = () => {
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    // TODO: 调用 API 保存
    console.log('Saved:', { name, desc, avatar, voiceId });
    setShowConfirmModal(false);
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1f1f1f] font-sans max-w-md mx-auto relative flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-20 px-4 py-4 pt-14 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-medium text-gray-900">编辑智能体</h1>
        <button 
          onClick={() => {
            // 重置逻辑
            setName('明日香');
            setDesc(DEFAULT_DESC);
            setAvatar('/character.png');
            setVoiceId('1');
          }}
          className="p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <RotateCcw size={22} className="text-gray-900" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 no-scrollbar">
        {/* Avatar Area */}
        <div className="relative flex flex-col items-center mt-6 mb-8">
          <div className="relative w-64 h-64 rounded-full border-8 border-[#EAE6DD] shadow-inner overflow-hidden bg-[#FFDAB9]">
            <Image 
              src={avatar}
              alt="Character Avatar"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Play Button */}
          <button 
            onClick={togglePlay}
            className="absolute bottom-2 right-10 w-12 h-12 bg-[#C69C72] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-10 text-white"
          >
            {isPlaying ? (
              <div className="flex gap-1 h-4 items-end justify-center">
                 <span className="w-1 bg-white animate-[bounce_1s_infinite] h-2"></span>
                 <span className="w-1 bg-white animate-[bounce_1.2s_infinite] h-4"></span>
                 <span className="w-1 bg-white animate-[bounce_0.8s_infinite] h-3"></span>
              </div>
            ) : (
              <Play size={20} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            hidden 
            accept="image/*" 
            onChange={handleImageUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 bg-[#F2EFE9] rounded-[18px] flex items-center justify-center text-gray-700 hover:bg-[#EAE6DD] transition-colors shadow-sm active:scale-95"
          >
            <ImageIcon size={22} />
          </button>
        </div>

        {/* Voice Selection */}
        <div 
          className="bg-white rounded-[16px] p-4 flex items-center justify-between mb-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
          onClick={() => setShowVoiceSheet(true)}
        >
          <span className="text-sm font-medium text-gray-500">智能体声音</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-900">{currentVoice.name}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Info Edit Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm mb-8">
          {/* Name Edit */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-gray-300">✦</span>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold text-center text-gray-900 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-gray-400 focus:outline-none transition-colors w-32"
            />
            <span className="text-gray-300">✦</span>
          </div>

          {/* Desc Edit */}
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full h-64 text-[14px] leading-relaxed text-gray-700 bg-transparent border-none resize-none focus:outline-none p-0"
          />
        </div>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#F8F6F1] via-[#F8F6F1] to-transparent z-10 max-w-md mx-auto">
        <button 
          onClick={handleSave}
          className="w-full py-3.5 bg-[#1f1f1f] text-white rounded-full font-semibold text-[15px] shadow-lg active:scale-[0.98] transition-all"
        >
          确认调整
        </button>
      </div>

      {/* Voice Selection Sheet (Full Screen Overlay) */}
      {showVoiceSheet && (
        <div className="fixed inset-0 z-50 bg-[#F8F6F1] animate-slideUp flex flex-col">
           <div className="px-4 py-4 pt-14 flex items-center justify-center relative">
             <button 
               onClick={() => setShowVoiceSheet(false)}
               className="absolute left-4 p-2 -ml-2 text-gray-800"
             >
               <ChevronLeft size={24} />
             </button>
             <h2 className="text-lg font-medium text-gray-900">选择声音</h2>
           </div>
           
           <div className="flex-1 overflow-y-auto px-5 py-2 space-y-3">
             {VOICE_OPTIONS.map((voice) => (
               <div 
                 key={voice.id}
                 onClick={() => {
                   setVoiceId(voice.id);
                   setShowVoiceSheet(false);
                 }}
                 className={cn(
                   "p-4 rounded-[20px] flex items-center justify-between cursor-pointer transition-all border-2",
                   voiceId === voice.id 
                     ? "bg-white border-black shadow-md" 
                     : "bg-white border-transparent shadow-sm hover:shadow-md"
                 )}
               >
                 <div className="flex items-center gap-4">
                   <div className={cn(
                     "w-10 h-10 rounded-full flex items-center justify-center",
                     voiceId === voice.id ? "bg-black text-white" : "bg-gray-100 text-gray-500"
                   )}>
                     <Play size={16} fill="currentColor" />
                   </div>
                   <span className={cn(
                     "font-medium",
                     voiceId === voice.id ? "text-gray-900" : "text-gray-600"
                   )}>{voice.name}</span>
                 </div>
                 {voiceId === voice.id && (
                   <div className="w-3 h-3 bg-black rounded-full" />
                 )}
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn p-5">
           <div className="bg-white rounded-[24px] p-6 w-full max-w-xs animate-scaleIn shadow-2xl">
             <h3 className="text-lg font-bold text-gray-900 text-center mb-2">确认调整</h3>
             <p className="text-sm text-gray-500 text-center mb-6">
               确认要保存对智能体的修改吗？
             </p>
             <div className="flex gap-3">
               <button 
                 onClick={() => setShowConfirmModal(false)}
                 className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm active:bg-gray-200 transition-colors"
               >
                 取消
               </button>
               <button 
                 onClick={confirmSave}
                 className="flex-1 py-3 bg-[#1f1f1f] text-white rounded-xl font-medium text-sm active:bg-black/90 transition-colors"
               >
                 确认
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
