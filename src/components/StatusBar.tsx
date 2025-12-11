import { Wifi, Battery } from "lucide-react";

const SignalIcon = () => (
  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1f1f1f]">
    <rect x="1" y="7.5" width="2.5" height="3.5" rx="1" fill="currentColor" />
    <rect x="5" y="5.25" width="2.5" height="5.75" rx="1" fill="currentColor" />
    <rect x="9" y="3" width="2.5" height="8" rx="1" fill="currentColor" />
    <rect x="13" y="0.75" width="2.5" height="10.25" rx="1" fill="currentColor" />
  </svg>
);

export default function StatusBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-md mx-auto h-[44px] px-6 flex items-center justify-between text-[#1f1f1f] pointer-events-none mix-blend-multiply">
      {/* Time - Centered in its safe area */}
      <span className="text-[15px] font-semibold tracking-wide pl-2">9:41</span>
      
      {/* Icons */}
      <div className="flex items-center gap-1.5 pr-1">
        <SignalIcon />
        <Wifi size={18} strokeWidth={2.5} className="ml-0.5" />
        <div className="relative ml-1">
           {/* Battery Outline */}
           <Battery size={24} className="text-[#1f1f1f] opacity-30" />
           {/* Battery Fill */}
           <div className="absolute top-1/2 left-[2.5px] -translate-y-1/2 w-[17px] h-[9px] bg-[#1f1f1f] rounded-[1px]"></div>
        </div>
      </div>
    </div>
  );
}


