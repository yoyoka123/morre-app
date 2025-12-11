import Link from "next/link";
import { letters } from "@/lib/data";
import { ChevronLeft, Play } from "lucide-react";
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
    <div className="min-h-screen max-w-md mx-auto bg-[#F2EFE9] relative shadow-2xl overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}>
      </div>

      {/* Top Navigation / Header */}
      <header className="flex items-center justify-between px-4 py-5 relative z-10">
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
      <main className="px-6 relative z-10 pb-32">
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

        <div className="prose prose-p:text-gray-700 prose-p:leading-7 prose-p:mb-6 prose-headings:font-normal max-w-none">
          {letter.content.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "font-semibold text-gray-900 mb-6" : "text-[15px] text-gray-800 leading-relaxed tracking-wide"}>
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Signature (Visual) */}
        <div className="mt-12 text-right">
             <div className="inline-block relative">
                 <span className="font-handwriting text-xl text-gray-400 opacity-50 transform -rotate-12 block">
                    Accompanying
                 </span>
                  <span className="font-handwriting text-sm text-gray-400 opacity-40 transform -rotate-12 block mr-4">
                    every day
                 </span>
             </div>
        </div>
      </main>

      {/* Bottom Summary Card (Fixed or Sticky at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-[#F2EFE9] via-[#F2EFE9] to-transparent z-20">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
                今日完成两项核心计划制定，内容已按规范归档，后续将依既定步骤推进。同期，其顺方式之...
            </p>
        </div>
      </div>
    </div>
  );
}

