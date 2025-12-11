'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
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
          <h1 className="text-lg font-medium text-gray-900">关于星崽</h1>
        </div>
      </div>

      <div className="px-5 mt-8 space-y-8">
        {/* Logo & Version */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 relative rounded-[28px] bg-white shadow-lg overflow-hidden mb-4">
            <Image
              src="/character.png"
              alt="Morre Logo"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Morre</h2>
          <p className="text-sm text-gray-500 mt-1">版本 1.0.0</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Morre（星崽）是一款 AI 智能陪伴应用，致力于为用户提供温暖、贴心的虚拟伴侣体验。
          </p>
          <p className="text-[15px] text-gray-600 leading-relaxed mt-4">
            通过先进的 AI 技术，Morre 可以理解你的情感、记住你的故事，成为你生活中温暖的倾听者和陪伴者。
          </p>
        </div>

        {/* Links */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-sm">
          <a
            href="https://www.morre.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <span className="text-[15px] text-[#1f1f1f]">官方网站</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <a
            href="https://weibo.com/morre"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <span className="text-[15px] text-[#1f1f1f]">官方微博</span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-400">@星崽Morre</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </a>
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <a
            href="https://mp.weixin.qq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <span className="text-[15px] text-[#1f1f1f]">微信公众号</span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-400">星崽Morre</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center py-6">
          <p className="text-xs text-gray-400">Copyright © 2025 Morre Inc.</p>
          <p className="text-xs text-gray-400 mt-1">All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
