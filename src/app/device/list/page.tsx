'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

// ============ 数据类型 ============
interface Device {
  id: string;
  name: string;
  characterName: string;
  deviceId: string;
  bindTime: string;
  version: string;
  isCurrent: boolean;
  image: string;
}

// ============ 模拟数据 ============
const initialDevices: Device[] = [
  {
    id: '1',
    name: '摩尔01号',
    characterName: '薇薇安',
    deviceId: 'Morre2A2B',
    bindTime: '2026-02-01',
    version: 'v 1.0',
    isCurrent: true,
    image: '/character.png'
  },
  {
    id: '2',
    name: '摩尔02号',
    characterName: '佩丽卡',
    deviceId: 'Morre2A2B9s',
    bindTime: '2026-02-01',
    version: 'v 1.0',
    isCurrent: false,
    image: '/character.png'
  }
];

export default function MyDevicesPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const { showToast } = useToast();

  const handleDeviceClick = (clickedDevice: Device) => {
    if (clickedDevice.isCurrent) return;

    // 乐观更新 UI
    const updatedDevices = devices.map(d => ({
        ...d,
        isCurrent: d.id === clickedDevice.id
    }));
    setDevices(updatedDevices);

    // Show Toast
    showToast(`已切换到 ${clickedDevice.name}`, 'success');
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
          <h1 className="text-lg font-bold text-gray-900">我的设备</h1>
          <button className="absolute right-4 p-2 -mr-2 text-gray-800 hover:bg-black/5 rounded-full transition-colors">
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="px-4 mt-2 space-y-4">
        {devices.map((device) => (
          <div 
            key={device.id}
            className="bg-gradient-to-b from-[#FFEBC8] to-[#FFFBF2] rounded-[24px] p-2 relative overflow-hidden shadow-sm transition-transform active:scale-[0.99] cursor-pointer"
            onClick={() => handleDeviceClick(device)}
          >
            {/* Hanger Tab Decoration */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/50 rounded-full" />

            {/* Top Section */}
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Sparkles size={16} className="text-gray-900 fill-current" />
                    <h2 className="text-lg font-bold text-gray-900">{device.name}</h2>
                </div>
                
                {device.isCurrent ? (
                    <div className="bg-[#FFFBF2] text-[#8C8C8C] text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                        陪伴中
                    </div>
                ) : (
                    <button className="bg-[#1f1f1f] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                        切换陪伴
                    </button>
                )}
            </div>

            {/* Bottom Content Card */}
            <div className="bg-white rounded-[20px] p-5 flex items-center gap-5">
                {/* Device Image */}
                <div className="w-24 h-24 flex-shrink-0 relative rounded-full border-[6px] border-[#E8DCCF] shadow-inner overflow-hidden bg-gray-100">
                    <Image 
                        src={device.image}
                        alt="Device"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Device Details */}
                <div className="flex-1 space-y-2">
                    <div className="text-[13px] text-gray-400 font-medium">
                        智能体：<span className="text-gray-600 ml-1">{device.characterName}</span>
                    </div>
                    <div className="text-[13px] text-gray-400 font-medium">
                        设备编号：<span className="text-gray-600 ml-1">{device.deviceId}</span>
                    </div>
                    <div className="text-[13px] text-gray-400 font-medium">
                        绑定时间：<span className="text-gray-600 ml-1">{device.bindTime}</span>
                    </div>
                    <div className="text-[13px] text-gray-400 font-medium">
                        版本号：<span className="text-gray-600 ml-1">{device.version}</span>
                    </div>
                </div>
            </div>

            {/* Background Decoration (Watermark) */}
            <div className="absolute right-0 top-10 pointer-events-none opacity-[0.03]">
                <span className="text-8xl font-serif italic">Morre</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
