import Link from "next/link";
import Image from "next/image";
import { letters } from "@/lib/data";
import { ChevronLeft, Play, Sparkles, Image as ImageIcon, MessageSquare, Footprints } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LetterPage({ params }: Props) {
  const { id } = await params;
  const letter = letters.find((l) => l.id === id);

  if (!letter) {
    notFound();
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#F2EFE9] relative shadow-2xl overflow-hidden pb-10">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}>
      </div>

      {/* Top Navigation / Header */}
      <header className="flex items-center justify-between px-4 py-5 relative z-10 sticky top-0 bg-[#F2EFE9]/95 backdrop-blur-sm">
        <Link 
          href="/letters" 
          className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">
          Intelligence with Everyone
        </div>
        <button className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
          <Play className="w-3 h-3 text-gray-800 fill-current ml-0.5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 relative z-10">
        {/* Stamp Decoration */}
        <div className="absolute top-0 right-4 w-24 h-24 opacity-10 pointer-events-none rotate-12">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
                <path id="curve" d="M 20 50 A 30 30 0 1 1 80 50" fill="none" />
                <text fontSize="8">
                    <textPath href="#curve" startOffset="20%">AIRMAIL</textPath>
                </text>
                <text x="50" y="55" textAnchor="middle" fontSize="6" fill="currentColor">POST</text>
            </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-8 leading-tight">
          {letter.title}
        </h1>

        <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl mb-8">
            <div className="prose prose-p:text-gray-700 prose-p:leading-7 prose-p:mb-6 prose-headings:font-normal max-w-none">
            {letter.content.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "font-bold text-gray-900 mb-6 bg-gray-100/50 p-2 rounded-lg inline-block" : "text-[15px] text-gray-800 leading-relaxed tracking-wide"}>
                {paragraph}
                </p>
            ))}
            </div>
        </div>
        
        {/* Photo Gallery Simulation */}
        <div className="flex gap-2 mb-12 relative h-28 justify-center">
            {[1, 2, 3].map((item, index) => (
                <div 
                    key={index} 
                    className="w-24 h-24 bg-gray-200 border-4 border-white shadow-md absolute top-0 transition-transform hover:z-10 hover:scale-105 duration-300"
                    style={{ 
                        transform: `rotate(${(index - 1) * 6}deg) translateX(${(index - 1) * 50}px)`,
                        zIndex: index
                    }}
                >
                    <Image 
                        src={`https://images.unsplash.com/photo-${1522075469751 + index}?auto=format&fit=crop&w=300&q=80`}
                        alt="Memory"
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
        </div>

        {/* Today's Report */}
        <div className="mt-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-black pl-3 flex items-center gap-2">
                今日记录报告
            </h3>
            
            <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm aspect-[3/4]">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-2">
                        <Sparkles size={16} fill="currentColor" className="text-gray-400" />
                    </div>
                    <span className="text-[10px] text-gray-400 mb-1">任务</span>
                    <span className="text-xl font-bold text-gray-900">2</span>
                </div>

                <div className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm aspect-[3/4]">
                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-2">
                        <ImageIcon size={16} className="text-gray-400" />
                    </div>
                    <span className="text-[10px] text-gray-400 mb-1">照片</span>
                    <span className="text-xl font-bold text-gray-900">12</span>
                </div>

                <div className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm aspect-[3/4]">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-2">
                        <MessageSquare size={16} className="text-gray-400" />
                    </div>
                    <span className="text-[10px] text-gray-400 mb-1">Chat</span>
                    <div className="flex flex-col items-center leading-none">
                        <span className="text-xl font-bold text-gray-900">120</span>
                        <span className="text-[9px] text-gray-400 scale-90">mins</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm aspect-[3/4]">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-2">
                        <Footprints size={16} className="text-gray-400" />
                    </div>
                    <span className="text-[10px] text-gray-400 mb-1">行走公里</span>
                    <div className="flex flex-col items-center leading-none">
                        <span className="text-xl font-bold text-gray-900">2</span>
                        <span className="text-[9px] text-gray-400 scale-90">公里</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Signature Watermark */}
        <div className="text-right pb-8 relative h-20">
             <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                {/* Smiley Face Watermark */}
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-900">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round"/>
                </svg>
             </div>
             <div className="relative z-10 pr-4">
                 <span className="font-handwriting text-2xl text-gray-300 transform -rotate-12 block font-serif italic">
                    Accompanying
                 </span>
                  <span className="font-handwriting text-sm text-gray-300 transform -rotate-12 block mr-8 font-serif italic">
                    every day
                 </span>
             </div>
        </div>

      </main>
    </div>
  );
}
