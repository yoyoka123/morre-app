'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, ChevronRight, Zap, Repeat2, Battery, FileAudio, BookOpen, Unplug } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasArrow?: boolean;
  onClick?: () => void;
  className?: string;
  labelClassName?: string;
}

function SettingItem({ icon, label, value, hasArrow = true, onClick, className, labelClassName }: SettingItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between py-4 px-1 cursor-pointer active:bg-gray-50 transition-colors",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-900">
          {icon}
        </div>
        <span className={cn("text-[15px] font-medium text-gray-900", labelClassName)}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-[13px] text-gray-500">{value}</span>}
        {hasArrow && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </div>
    </div>
  );
}

export default function DeviceSettingsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showUnbindModal, setShowUnbindModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Second step confirmation

  const handleFirstStepUnbind = () => {
    setShowUnbindModal(true);
  };

  const handleProceedToConfirm = () => {
    setShowUnbindModal(false);
    // Short delay to allow modal transition
    setTimeout(() => {
        setShowConfirmModal(true);
    }, 100);
  };

  const handleFinalUnbind = () => {
    console.log("Unbinding device...");
    setShowConfirmModal(false);
    showToast("设备已解绑", "success");
    // router.push('/device/list');
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
          <h1 className="text-lg font-bold text-gray-900">设备设置</h1>
          <button className="absolute right-4 p-2 -mr-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors">
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="px-5 mt-2 space-y-6">
        {/* Device Card */}
        <div className="relative flex items-center gap-5 py-4">
          {/* Device Image */}
          <div className="w-28 h-28 flex-shrink-0 relative rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-200">
             <Image 
               src="/character.png" 
               alt="Device"
               fill
               className="object-cover"
             />
          </div>

          {/* Device Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 mb-1">薇薇安</h2>
                <Battery size={20} className="text-gray-900" fill="currentColor" />
            </div>
            
            <div className="space-y-1 text-[11px] text-gray-500">
              <p>设备编号：Morre2A2B</p>
              <p>绑定时间：2026-02-01</p>
              <p>版本号：v 1.0</p>
            </div>
            
            {/* Switch Button */}
            <button 
              className="mt-3 flex items-center gap-1.5 bg-[#EAE6DC] self-start px-3 py-1.5 rounded-full active:scale-95 transition-transform"
              onClick={() => router.push('/device/list')}
            >
              <span className="text-xs font-medium text-[#6B665F]">摩尔01号</span>
              <Repeat2 size={12} className="text-[#6B665F]" />
            </button>
          </div>
        </div>

        {/* 聊天设置 */}
        <div>
          <h3 className="text-xs text-gray-500 mb-2 pl-1">聊天设置</h3>
          <div className="bg-white rounded-[20px] px-4 py-1 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
            <SettingItem 
              icon={<Zap className="w-4 h-4 fill-gray-900" />} 
              label="消息通知" 
              value="语音播报"
              onClick={() => router.push('/device/notification')}
            />
          </div>
        </div>

        {/* 硬件设置 */}
        <div>
          <h3 className="text-xs text-gray-500 mb-2 pl-1">硬件设置</h3>
          <div className="bg-white rounded-[20px] px-4 py-1 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
            <SettingItem 
              icon={<Zap className="w-4 h-4 fill-gray-900" />} 
              label="录音文件" 
              value="23"
              onClick={() => router.push('/device/recordings')}
            />
            <div className="h-[1px] bg-gray-100 mx-1" />
            <SettingItem 
              icon={<Zap className="w-4 h-4 fill-gray-900" />} 
              label="电子说明书"
              onClick={() => router.push('/device/manual')}
            />
            <div className="h-[1px] bg-gray-100 mx-1" />
            <SettingItem 
              icon={<Zap className="w-4 h-4 fill-gray-900" />} 
              label="解绑设备"
              labelClassName="text-gray-900"
              onClick={handleFirstStepUnbind}
            />
          </div>
        </div>
      </div>

      {/* Step 1: Warning Modal */}
      <Modal
        isOpen={showUnbindModal}
        onClose={() => setShowUnbindModal(false)}
        title="解绑设备"
      >
        <div className="flex flex-col items-center pt-2 pb-2">
           <div className="w-20 h-20 rounded-full border-[3px] border-[#EAE6DD] p-0.5 mb-4 relative overflow-hidden">
             <Image src="/character.png" alt="Device" fill className="rounded-full object-cover" />
           </div>
           
           <div className="text-[13px] text-gray-600 leading-relaxed text-left space-y-3 px-1">
             <p>
               设备 <span className="text-[#F59E0B] font-medium">VTYUYUI</span> ，解绑后您与 <span className="text-[#F59E0B] font-medium">沈宴之</span> 的录音数据将会存储云端，以及会员费用不可退回，会在下一个morre 硬件上继承。
             </p>
             <p>
               解绑后，你和智能体的点点滴滴回忆，日常生活的照片，踏过的足迹，一起的欢声笑语将会被清除，你确然要解绑吗？
             </p>
           </div>

           <div className="flex gap-3 w-full mt-6">
             <button
                onClick={() => setShowUnbindModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-[12px] font-medium active:scale-[0.98] transition-transform"
             >
                再想想
             </button>
             <button
                onClick={handleProceedToConfirm}
                className="flex-1 py-3 bg-[#FF4D4F] text-white rounded-[12px] font-bold active:scale-[0.98] transition-transform"
             >
                解绑
             </button>
           </div>
        </div>
      </Modal>

      {/* Step 2: Confirmation Modal */}
      <Modal
         isOpen={showConfirmModal}
         onClose={() => setShowConfirmModal(false)}
         title="确认继续解绑吗"
      >
         <div className="text-center pt-2">
            <p className="text-[14px] text-gray-500 leading-relaxed px-4 mb-6">
              确认继续解除 沈宴之的绑定吗，解绑后你和 TA 的过去全部清零，回忆消失
            </p>

            <div className="flex gap-3 w-full">
             <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full font-medium active:scale-[0.98] transition-transform"
             >
                取消
             </button>
             <button
                onClick={handleFinalUnbind}
                className="flex-1 py-3 bg-[#FF4D4F] text-white rounded-full font-bold active:scale-[0.98] transition-transform shadow-md shadow-red-100"
             >
                确认解绑
             </button>
           </div>
         </div>
      </Modal>

    </div>
  );
}
