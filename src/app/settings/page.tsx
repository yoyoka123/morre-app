'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bell, ChevronRight, PenLine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

interface MenuItemProps {
  label: string;
  value?: string;
  href?: string;
  isCopyable?: boolean;
  className?: string;
}

function MenuItem({ label, value, href, isCopyable, className }: MenuItemProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value) {
      navigator.clipboard.writeText(value);
      showToast('已复制到剪贴板', 'success');
    }
  };

  const content = (
    <div className={cn("flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer", className)}>
      <span className="text-[15px] text-[#1f1f1f]">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-[13px] text-gray-400">{value}</span>}
        <ChevronRight className="w-4 h-4 text-gray-300" />
      </div>
    </div>
  );

  if (isCopyable) {
    return <div onClick={handleCopy}>{content}</div>;
  }

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

const USER_NAME_KEY = 'eggemail_user_name';

export default function SettingsPage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [userName, setUserName] = useState("My name");
  const { showToast } = useToast();

  // 从 localStorage 加载昵称
  useEffect(() => {
    const savedName = localStorage.getItem(USER_NAME_KEY);
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("Logging out...");
    setShowLogoutModal(false);
    showToast("已退出登录", "success");
    // setTimeout(() => router.push('/login'), 1000); // Redirect to login in real app
  };

  const handleSaveName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get('name') as string;
    if (newName.trim()) {
        setUserName(newName);
        localStorage.setItem(USER_NAME_KEY, newName);
        setShowNameModal(false);
        showToast("昵称修改成功", "success");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1f1f1f] font-sans max-w-md mx-auto relative pb-10">
      
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-14 pb-4">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#1f1f1f]" />
        </button>
        <div className="relative">
          <Bell className="w-6 h-6 text-[#1f1f1f]" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F6F1]"></span>
        </div>
      </header>

      <div className="px-5 space-y-4">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
            <Image 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#1f1f1f]">{userName}</h2>
            <button 
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowNameModal(true)}
            >
              <PenLine className="w-4 h-4 text-[#1f1f1f]" />
            </button>
          </div>
        </div>

        {/* Subscription Banner */}
        <div 
            className="w-full bg-[#FFD666] rounded-[20px] p-4 flex items-center justify-between shadow-sm relative overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
            onClick={() => router.push('/subscription')}
        >
          <div className="flex flex-col relative z-10">
            <span className="text-[#1f1f1f] font-bold text-[15px]">订阅Morre会员，无限畅聊</span>
            <span className="text-[#1f1f1f]/70 text-xs mt-1">无限畅聊，加强记忆</span>
          </div>
          <button className="relative z-10 bg-[#F8F6F1] text-[#1f1f1f] text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-white transition-colors">
            订阅会员
          </button>
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        </div>

        {/* My Devices */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
            <Link href="/device" className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
                <span className="text-[15px] font-bold text-[#1f1f1f]">我的设备</span>
                <div className="flex items-center gap-2">
                    <span className="text-[13px] text-gray-400">2</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
            </Link>
        </div>

        {/* Menu Group 1 */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
          <MenuItem label="反馈与帮助" href="/help" />
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <MenuItem label="反馈邮箱" value="service@morre.com" isCopyable={true} />
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <MenuItem label="关于星崽" href="/about" />
        </div>

        {/* Menu Group 2 */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)]">
          <MenuItem label="隐私政策" href="/legal/privacy" />
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <MenuItem label="用户协议" href="/legal/terms" />
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <MenuItem label="个人信息收集清单" href="/legal/data-collection" />
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <MenuItem label="第三方信息共享清单" href="/legal/third-party" />
          <div className="h-[1px] bg-gray-50 mx-4"></div>
          <MenuItem label="注销账号" href="/account/delete" className="text-red-500" />
        </div>

        {/* Logout Button */}
        <div className="pt-4 pb-8">
          <button 
            className="w-full bg-white text-[#1f1f1f] font-bold text-[15px] py-4 rounded-[20px] shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-transform"
            onClick={() => setShowLogoutModal(true)}
          >
            退出登录
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="确定要退出登录吗？"
        footer={
          <div className="flex gap-3">
             <button 
               className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium active:bg-gray-200 transition-colors"
               onClick={() => setShowLogoutModal(false)}
             >
               取消
             </button>
             <button 
               className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl font-bold active:bg-red-100 transition-colors"
               onClick={handleLogout}
             >
               确认退出
             </button>
          </div>
        }
      >
        <p className="text-sm text-gray-500 text-center py-2">退出后将无法收到消息通知</p>
      </Modal>

      {/* Edit Name Modal */}
      <Modal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        title="修改昵称"
      >
        <form onSubmit={handleSaveName} className="mt-2">
            <input 
                name="name"
                defaultValue={userName}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-900 mb-6 focus:outline-none focus:ring-2 focus:ring-[#FFD666]/50 transition-all"
                placeholder="请输入昵称"
                maxLength={10}
                autoFocus
            />
            <div className="flex gap-3">
                <button 
                    type="button"
                    className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium text-[15px]"
                    onClick={() => setShowNameModal(false)}
                >
                    取消
                </button>
                <button 
                    type="submit"
                    className="flex-1 py-3 bg-[#1f1f1f] text-white rounded-xl font-bold text-[15px]"
                >
                    保存
                </button>
            </div>
        </form>
      </Modal>
    </div>
  );
}
