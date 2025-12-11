'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

const plans = [
  {
    id: 'monthly',
    name: '月度会员',
    price: '19.9',
    period: '/月',
    features: ['无限畅聊', '加强记忆', '专属徽章', '优先体验新功能'],
    recommend: false
  },
  {
    id: 'yearly',
    name: '年度会员',
    price: '199',
    period: '/年',
    save: '省 ¥40',
    features: ['包含月度所有权益', '年度专属礼包', '生日惊喜', '数据永久保存'],
    recommend: true
  }
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const { showToast } = useToast();

  const handleSubscribe = () => {
    // TODO: Implement payment logic
    showToast('支付功能接入中...', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1f1f1f] font-sans max-w-md mx-auto relative pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[#F8F6F1]/95 backdrop-blur-sm z-20">
        <div className="relative flex items-center justify-center px-4 py-4 pt-14">
          <button
            onClick={() => router.back()}
            className="absolute left-4 p-2 -ml-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-900">Morre 会员</h1>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
           <div className="w-20 h-20 bg-gradient-to-br from-[#FFD666] to-[#FFAB00] rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-yellow-200">
             <Crown size={40} className="text-white" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-2">解锁更多权益</h2>
           <p className="text-gray-500 text-sm">让陪伴更长久，让记忆更深刻</p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "relative rounded-[24px] p-6 border-2 transition-all cursor-pointer overflow-hidden",
                selectedPlan === plan.id 
                  ? "bg-white border-[#FFD666] shadow-lg shadow-yellow-100 scale-[1.02]" 
                  : "bg-white border-transparent shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] opacity-80"
              )}
            >
              {plan.recommend && (
                <div className="absolute top-0 right-0 bg-[#FFD666] text-[#1f1f1f] text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                  推荐
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  {plan.save && (
                    <span className="inline-block bg-red-50 text-red-500 text-[10px] px-1.5 py-0.5 rounded mt-1 font-medium">
                      {plan.save}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <span className="text-sm font-medium text-gray-500 mr-0.5">¥</span>
                    <span className="text-2xl font-bold text-[#1f1f1f]">{plan.price}</span>
                    <span className="text-sm text-gray-400">{plan.period}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#FFD666]/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#B28800]" />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 p-5 max-w-md mx-auto safe-area-bottom">
        <button
          onClick={handleSubscribe}
          className="w-full bg-[#1f1f1f] text-white font-bold text-[16px] py-4 rounded-[20px] shadow-lg shadow-gray-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          立即订阅
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-3">
          订阅即表示同意 <span className="underline">会员服务协议</span>
        </p>
      </div>
    </div>
  );
}
