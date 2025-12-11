'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Battery, Bluetooth, Volume2, Power, HelpCircle } from 'lucide-react';
import Image from 'next/image';

const sections = [
  {
    title: '1. 开机与配对',
    icon: <Power className="w-5 h-5" />,
    content: [
      '长按电源键 3 秒开机，指示灯亮起表示开机成功',
      '首次使用时，设备会自动进入配对模式',
      '打开手机蓝牙，在 App 中搜索并连接设备'
    ]
  },
  {
    title: '2. 基本操作',
    icon: <Volume2 className="w-5 h-5" />,
    content: [
      '轻触设备：唤醒或暂停语音播放',
      '长按 2 秒：开始录音或对话',
      '双击：播放上一条消息',
      '三击：进入设置模式'
    ]
  },
  {
    title: '3. 充电说明',
    icon: <Battery className="w-5 h-5" />,
    content: [
      '使用附赠的 Type-C 充电线连接设备',
      '充电时指示灯呈红色闪烁',
      '充满电后指示灯常亮绿色',
      '充电时间约 2 小时，续航约 8 小时'
    ]
  },
  {
    title: '4. 蓝牙连接',
    icon: <Bluetooth className="w-5 h-5" />,
    content: [
      '确保手机蓝牙已开启',
      '设备与手机距离保持在 10 米以内',
      '如连接断开，设备会自动尝试重连',
      '若无法连接，请重启设备后重试'
    ]
  },
  {
    title: '5. 常见问题',
    icon: <HelpCircle className="w-5 h-5" />,
    content: [
      'Q: 设备无法开机？\nA: 请确保设备已充电，长按电源键 5 秒重启',
      'Q: 声音很小？\nA: 请在 App 中调整音量设置',
      'Q: 无法连接蓝牙？\nA: 请在手机设置中删除配对记录后重新配对'
    ]
  }
];

export default function ManualPage() {
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
          <h1 className="text-lg font-medium text-gray-900">电子说明书</h1>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-6">
        {/* Device Image */}
        <div className="bg-white rounded-[24px] p-6 flex flex-col items-center shadow-sm">
          <div className="w-32 h-32 relative rounded-full bg-gray-100 overflow-hidden mb-4">
            <Image
              src="/character.png"
              alt="Morre Device"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Morre 智能陪伴设备</h2>
          <p className="text-sm text-gray-500 mt-1">型号：MR-001 | 版本：v1.0</p>
        </div>

        {/* Manual Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-[20px] p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  {section.icon}
                </div>
                <h3 className="text-[15px] font-bold text-gray-900">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-gray-300 before:rounded-full">
                    {item.includes('\n') ? (
                      <div className="space-y-1">
                        {item.split('\n').map((line, lineIdx) => (
                          <p key={lineIdx} className={lineIdx === 0 ? 'font-medium text-gray-700' : ''}>{line}</p>
                        ))}
                      </div>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center py-6">
          <p className="text-xs text-gray-400">如有更多问题，请联系客服</p>
          <p className="text-xs text-gray-400 mt-1">service@morre.com</p>
        </div>
      </div>
    </div>
  );
}
