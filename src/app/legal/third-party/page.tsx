'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const thirdParties = [
  {
    name: '微信支付',
    company: '财付通支付科技有限公司',
    purpose: '支付服务',
    data: '订单信息、支付金额'
  },
  {
    name: '支付宝',
    company: '支付宝（中国）网络技术有限公司',
    purpose: '支付服务',
    data: '订单信息、支付金额'
  },
  {
    name: '极光推送',
    company: '深圳市和讯华谷信息技术有限公司',
    purpose: '消息推送',
    data: '设备标识、推送内容'
  },
  {
    name: '阿里云',
    company: '阿里云计算有限公司',
    purpose: '云服务',
    data: '服务运行数据'
  }
];

export default function ThirdPartyPage() {
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
          <h1 className="text-lg font-medium text-gray-900">第三方信息共享清单</h1>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-4">
        <p className="text-sm text-gray-500 leading-relaxed">
          为向您提供完整的服务，我们可能会与以下第三方共享您的部分信息。我们会要求第三方按照隐私政策保护您的信息安全。
        </p>

        {thirdParties.map((party, index) => (
          <div key={index} className="bg-white rounded-[20px] p-5 shadow-sm">
            <h2 className="text-[15px] font-bold text-gray-900 mb-1">{party.name}</h2>
            <p className="text-xs text-gray-400 mb-3">{party.company}</p>

            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-gray-400 w-16 flex-shrink-0">用途</span>
                <span className="text-gray-600">{party.purpose}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-16 flex-shrink-0">数据</span>
                <span className="text-gray-600">{party.data}</span>
              </div>
            </div>
          </div>
        ))}

        <p className="text-xs text-gray-400 text-center py-4">
          如有疑问，请联系 service@morre.com
        </p>
      </div>
    </div>
  );
}
