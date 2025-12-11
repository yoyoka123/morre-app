'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, RotateCcw, Image as ImageIcon, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

// ============ 模拟数据 ============
const voices = [
  { id: '1', name: '台湾甜妹', description: '甜美可爱的邻家女孩' },
  { id: '2', name: '清冷御姐', description: '成熟稳重的高冷声线' },
  { id: '3', name: '元气少年', description: '充满活力的少年音' },
  { id: '4', name: '温润君子', description: '温柔儒雅的青年音' },
];

const DEFAULT_AGENT = {
  name: '明日香',
  desc: '第二适格者，也是福音战士2号机的驾驶员。是一位具备随意指使旁人的性格，并拥有偶像般容貌的少女。高傲而强势，火红的印象色与暴躁的脾气是其特征。混血儿，有四分之三德国血统和四分之一日本血统，所以外表更像欧洲人。在德国出生并长大，然而是美国公民。\n\n对身为EVA驾驶员感到骄傲，经常把头部接口装置当成发箍来佩戴，因为希望周遭的人知道自己是EVA驾驶员。',
  voiceId: '1',
  avatar: '/character.png'
};

export default function EditAgentPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 状态管理
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceList, setShowVoiceList] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState(DEFAULT_AGENT);

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem('agentData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...DEFAULT_AGENT, ...parsed });
      } catch (e) {
        console.error('Failed to parse agentData:', e);
      }
    }
  }, []);

  const selectedVoice = voices.find(v => v.id === formData.voiceId) || voices[0];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 播放音频
  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // 示例音频
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        showToast('请选择图片文件', 'error');
        return;
      }
      // 验证文件大小 (最大 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('图片大小不能超过 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, avatar: base64 });
        showToast('头像已更新', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 保存处理
  const handleSave = () => {
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    // 保存到 localStorage
    localStorage.setItem('agentData', JSON.stringify(formData));
    console.log('Saving data:', formData);
    setShowConfirmModal(false);
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1f1f1f] font-sans max-w-md mx-auto relative flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 pt-14 sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">编辑智能体</h1>
        <button
          onClick={() => setFormData(DEFAULT_AGENT)}
          className="p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <RotateCcw size={22} />
        </button>
      </header>

      <main className="flex-1 px-5 pb-24 overflow-y-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-2 mb-6">
          <div className="relative w-64 h-64 mb-4">
             {/* Circular Avatar */}
             <div className="w-full h-full rounded-full border-[6px] border-[#EAE6DD] shadow-lg overflow-hidden bg-white relative">
               <Image 
                 src={formData.avatar}
                 alt="Character"
                 fill
                 className="object-cover"
                 priority
               />
             </div>
             
             {/* Play Button Overlay */}
             <button 
               onClick={toggleAudio}
               className="absolute bottom-2 right-4 w-12 h-12 bg-[#C69C6D] hover:bg-[#b08b60] text-white rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 border-2 border-white"
             >
               {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
             </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={triggerFileInput}
              className="w-12 h-12 bg-[#F2EFE9] rounded-[16px] flex items-center justify-center text-gray-700 hover:bg-[#EAE6DD] transition-colors shadow-sm"
            >
              <ImageIcon size={20} />
            </button>
          </div>
        </div>

        {/* Voice Selection */}
        <div 
          onClick={() => setShowVoiceList(true)}
          className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] cursor-pointer mb-4 active:scale-[0.99] transition-transform"
        >
          <span className="text-[15px] font-medium text-gray-500">智能体声音</span>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-gray-900">{selectedVoice.name}</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>

        {/* Info Edit Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
          {/* Name Edit */}
          <div className="flex items-center justify-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Sparkles size={16} className="text-[#C69C6D]" />
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="text-xl font-bold text-gray-900 text-center outline-none bg-transparent min-w-[100px]"
            />
            <Sparkles size={16} className="text-[#C69C6D]" />
          </div>

          {/* Description Edit */}
          <textarea 
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            className="w-full h-64 text-[14px] leading-relaxed text-gray-600 bg-transparent outline-none resize-none"
            placeholder="输入智能体设定..."
          />
        </div>
      </main>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#F8F6F1] via-[#F8F6F1] to-transparent z-10 max-w-md mx-auto">
        <button 
          onClick={handleSave}
          className="w-full bg-[#1f1f1f] text-white py-4 rounded-[20px] font-medium text-[16px] shadow-lg active:scale-[0.98] transition-transform"
        >
          确认调整
        </button>
      </div>

      {/* Voice Selection Sheet */}
      {showVoiceList && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 animate-fadeIn" onClick={() => setShowVoiceList(false)} />
          <div className="relative bg-white rounded-t-[24px] p-6 pb-10 animate-slideUp">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">选择声音</h3>
            <div className="space-y-2">
              {voices.map(voice => (
                <div 
                  key={voice.id}
                  onClick={() => {
                    setFormData({...formData, voiceId: voice.id});
                    setShowVoiceList(false);
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-[16px] border transition-all cursor-pointer",
                    formData.voiceId === voice.id 
                      ? "border-[#1f1f1f] bg-gray-50" 
                      : "border-gray-100 hover:border-gray-300"
                  )}
                >
                  <div>
                    <div className="font-medium text-gray-900">{voice.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{voice.description}</div>
                  </div>
                  {formData.voiceId === voice.id && (
                    <div className="w-3 h-3 rounded-full bg-[#1f1f1f]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn p-4">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-xs animate-scaleIn shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">确认调整</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              是否保存对智能体"{formData.name}"的修改？
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-[16px] bg-gray-100 text-gray-700 font-medium active:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={confirmSave}
                className="flex-1 py-3 rounded-[16px] bg-[#1f1f1f] text-white font-medium active:bg-gray-800 transition-colors"
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

