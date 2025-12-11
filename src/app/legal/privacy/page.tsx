'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-lg font-medium text-gray-900">隐私政策</h1>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <p className="text-xs text-gray-400 mb-4">更新日期：2025年1月1日</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">1. 信息收集</h2>
              <p>我们收集您在使用 Morre 服务时主动提供的信息，包括但不限于：账号信息、设备信息、使用记录等。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">2. 信息使用</h2>
              <p>我们使用收集的信息用于：提供和改进服务、个性化用户体验、保障账号安全、发送服务通知等。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">3. 信息共享</h2>
              <p>未经您的同意，我们不会与任何第三方共享您的个人信息，法律法规要求的情况除外。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">4. 信息安全</h2>
              <p>我们采用行业标准的安全措施保护您的个人信息，防止数据遭到未经授权的访问、使用或泄露。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">5. 您的权利</h2>
              <p>您有权访问、更正、删除您的个人信息。如需行使这些权利，请联系我们的客服团队。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">6. 联系我们</h2>
              <p>如您对本隐私政策有任何疑问，请通过 service@morre.com 联系我们。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
