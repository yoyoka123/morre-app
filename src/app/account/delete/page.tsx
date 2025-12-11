'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export default function DeleteAccountPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { showToast } = useToast();

  const handleVerify = () => {
    if (phone.length !== 11) {
      showToast('请输入正确的手机号', 'error');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    // TODO: Implement actual delete logic
    console.log('Account deleted');
    setShowConfirmModal(false);
    showToast('账号已注销', 'success');
    // setTimeout(() => router.push('/login'), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1f1f1f] font-sans max-w-md mx-auto relative pb-10">
      {/* Header */}
      <div className="sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-20">
        <div className="relative flex items-center justify-center px-4 py-4 pt-14">
          <button
            onClick={() => router.back()}
            className="absolute left-4 p-2 -ml-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-900">注销账号</h1>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-6">
        {/* Warning Card */}
        <div className="bg-red-50 rounded-[20px] p-6 border border-red-100">
          <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-500">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-lg font-bold text-red-600">账号注销风险提示</h2>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-red-800/80 font-medium">注销账号后，您将无法恢复以下数据：</p>
            <ul className="list-disc list-inside text-sm text-red-800/70 space-y-1 ml-1">
              <li>所有聊天记录和互动数据</li>
              <li>已解锁的成就和徽章</li>
              <li>剩余的会员权益和订阅</li>
              <li>绑定的设备信息</li>
            </ul>
          </div>
        </div>

        {/* Verification Form */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
            请输入手机号确认
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入当前绑定的手机号"
            className="w-full bg-white border-none rounded-[16px] px-5 py-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 transition-all placeholder:text-gray-400"
            maxLength={11}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleVerify}
          disabled={!phone}
          className="w-full bg-white text-red-500 font-bold text-[15px] py-4 rounded-[20px] shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-red-100"
        >
          申请注销
        </button>
      </div>

      {/* Confirm Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="最终确认"
        footer={
          <div className="flex gap-3">
             <button 
               className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium active:bg-gray-200 transition-colors"
               onClick={() => setShowConfirmModal(false)}
             >
               我在想想
             </button>
             <button 
               className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold active:bg-red-600 transition-colors shadow-md shadow-red-200"
               onClick={handleDelete}
             >
               确认注销
             </button>
          </div>
        }
      >
        <p className="text-sm text-gray-600 text-center py-2 leading-relaxed">
          此操作不可撤销。<br/>
          点击确认后，您的账号将在 7 天内被永久删除。
        </p>
      </Modal>
    </div>
  );
}
