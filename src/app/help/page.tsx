'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

const faqs = [
  {
    question: '如何连接 Morre 设备？',
    answer: '打开手机蓝牙，进入 App 的设备页面，点击"添加设备"，按照提示完成配对即可。首次使用需要长按设备电源键 3 秒开机。'
  },
  {
    question: '设备无法连接怎么办？',
    answer: '1. 确保设备已开机且电量充足\n2. 确保手机蓝牙已开启\n3. 尝试在手机蓝牙设置中删除配对记录后重新配对\n4. 重启设备和手机后重试'
  },
  {
    question: '如何成为会员？',
    answer: '进入设置页面，点击"订阅会员"卡片，选择适合您的套餐完成支付即可。会员权益将立即生效。'
  },
  {
    question: '会员可以退款吗？',
    answer: '根据相关法律法规，虚拟商品一经购买不支持退款。如有特殊情况，请联系客服处理。'
  },
  {
    question: '如何导出我的数据？',
    answer: '目前数据导出功能正在开发中，敬请期待。您可以在录音文件页面单独下载录音文件。'
  },
  {
    question: '如何注销账号？',
    answer: '进入设置页面，滑动到底部找到"注销账号"选项。注销后所有数据将被永久删除，请谨慎操作。'
  }
];

export default function HelpPage() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleContactEmail = () => {
    navigator.clipboard.writeText('service@morre.com');
    showToast('邮箱已复制', 'success');
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
          <h1 className="text-lg font-medium text-gray-900">反馈与帮助</h1>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-6">
        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleContactEmail}
            className="bg-white rounded-[20px] p-5 shadow-sm flex flex-col items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-medium text-gray-900">邮件反馈</p>
              <p className="text-xs text-gray-400 mt-0.5">service@morre.com</p>
            </div>
          </button>

          <button
            className="bg-white rounded-[20px] p-5 shadow-sm flex flex-col items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-medium text-gray-900">在线客服</p>
              <p className="text-xs text-gray-400 mt-0.5">工作日 9:00-18:00</p>
            </div>
          </button>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-gray-500" />
            <h2 className="text-[15px] font-bold text-gray-900">常见问题</h2>
          </div>

          <div className="bg-white rounded-[20px] overflow-hidden shadow-sm">
            {faqs.map((faq, index) => (
              <div key={index}>
                {index > 0 && <div className="h-[1px] bg-gray-50 mx-4" />}
                <div
                  className="p-4 cursor-pointer active:bg-gray-50 transition-colors"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200",
                        expandedIndex === index && "rotate-180"
                      )}
                    />
                  </div>
                  {expandedIndex === index && (
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed whitespace-pre-line animate-fadeIn">
                      {faq.answer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
