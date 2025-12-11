'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function DataCollectionPage() {
  const router = useRouter();

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
          <h1 className="text-lg font-medium text-gray-900">个人信息收集清单</h1>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-4">
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3">基础信息</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span>手机号码</span>
              <span className="text-gray-400">账号注册与登录</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span>昵称</span>
              <span className="text-gray-400">个性化展示</span>
            </div>
            <div className="flex justify-between py-2">
              <span>头像</span>
              <span className="text-gray-400">个性化展示</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3">设备信息</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span>设备型号</span>
              <span className="text-gray-400">设备适配</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span>操作系统</span>
              <span className="text-gray-400">服务优化</span>
            </div>
            <div className="flex justify-between py-2">
              <span>设备标识符</span>
              <span className="text-gray-400">安全验证</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3">使用信息</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span>对话记录</span>
              <span className="text-gray-400">服务提供</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span>语音数据</span>
              <span className="text-gray-400">语音交互</span>
            </div>
            <div className="flex justify-between py-2">
              <span>操作日志</span>
              <span className="text-gray-400">问题排查</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center py-4">
          以上信息仅用于提供服务，不会用于其他目的
        </p>
      </div>
    </div>
  );
}
