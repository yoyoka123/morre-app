'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-lg font-medium text-gray-900">用户协议</h1>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <p className="text-xs text-gray-400 mb-4">更新日期：2025年1月1日</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">1. 服务说明</h2>
              <p>Morre 是一款 AI 智能陪伴服务应用。使用本服务即表示您同意遵守本协议的所有条款。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">2. 账号注册</h2>
              <p>您需要提供真实、准确的个人信息进行注册。您有责任妥善保管账号信息，因账号被盗用造成的损失由您自行承担。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">3. 使用规范</h2>
              <p>您同意不会利用本服务从事任何违法活动，不发布违反法律法规、公序良俗的内容。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">4. 知识产权</h2>
              <p>Morre 的所有内容、设计、代码等知识产权归公司所有，未经授权不得复制、修改或传播。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">5. 服务变更</h2>
              <p>我们保留随时修改或中断服务的权利，并会提前通知用户。因服务变更造成的损失，在法律允许范围内免责。</p>
            </section>

            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-2">6. 争议解决</h2>
              <p>本协议的解释和执行均适用中华人民共和国法律。如发生争议，双方应友好协商解决。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
